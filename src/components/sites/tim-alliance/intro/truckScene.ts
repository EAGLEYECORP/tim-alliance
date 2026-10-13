import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const ORANGE = 0xf94006;
const INK = 0x0d0a09;

export type TruckScene = {
  /** Advances the scene to `t` seconds of the drive-in timeline; returns metres left between truck and lens. */
  render: (t: number) => number;
  resize: (w: number, h: number) => void;
  dispose: () => void;
  /** Seconds until the truck front reaches the camera. */
  impactAt: number;
};

async function loadImage(src: string) {
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  await img.decode();
  return img;
}

/** Logo copy with the white lettering recoloured to ink, for use on white panels. */
function inkLogo(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const g = c.getContext("2d", { willReadFrequently: true })!;
  g.drawImage(img, 0, 0);
  const data = g.getImageData(0, 0, c.width, c.height);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], gr = d[i + 1], b = d[i + 2];
    const max = Math.max(r, gr, b), min = Math.min(r, gr, b);
    // Near-white, unsaturated pixels are the lettering; keep the red arrow and grey swoosh.
    if (d[i + 3] > 0 && max > 200 && max - min < 30) {
      d[i] = 28;
      d[i + 1] = 24;
      d[i + 2] = 23;
    }
  }
  g.putImageData(data, 0, 0);
  return c;
}

/** Branded panel: the logo (+ tagline) on a white or dark background. */
function brandTexture(
  logo: CanvasImageSource & { width: number; height: number },
  tagline: HTMLImageElement | null,
  w: number,
  h: number,
  opts: { tagline?: boolean; stripe?: boolean; dark?: boolean },
) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, opts.dark ? "#1d1a19" : "#ffffff");
  grad.addColorStop(1, opts.dark ? "#0c0a0a" : "#e9e7e6");
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);
  // Corrugation lines, as on a real box trailer.
  if (opts.stripe) {
    g.strokeStyle = "rgba(0,0,0,0.05)";
    g.lineWidth = 2;
    for (let x = 0; x < w; x += w / 48) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x, h);
      g.stroke();
    }
    g.fillStyle = "#f94006";
    g.fillRect(0, h - h * 0.07, w, h * 0.035);
  }
  const lh = h * (opts.tagline ? 0.62 : 0.86);
  const lw = (logo.width / logo.height) * lh;
  g.drawImage(logo, (w - lw) / 2, h * (opts.tagline ? 0.06 : 0.07), lw, lh);
  if (opts.tagline && tagline) {
    const tw = w * 0.62;
    const th = (tagline.height / tagline.width) * tw;
    g.drawImage(tagline, (w - tw) / 2, h * 0.74, tw, th);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, "rgba(255,255,255,1)");
  r.addColorStop(0.12, "rgba(255,244,225,0.9)");
  r.addColorStop(0.4, "rgba(255,190,120,0.25)");
  r.addColorStop(1, "rgba(255,150,80,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function skyTexture() {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 512;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 512);
  // v=1 is the top of the dome; the camera horizon sits near the middle of the canvas.
  grad.addColorStop(0, "#050407");
  grad.addColorStop(0.3, "#140d10");
  grad.addColorStop(0.42, "#4a1a0c");
  grad.addColorStop(0.47, "#c8370a");
  grad.addColorStop(0.495, "#ffb27a");
  grad.addColorStop(0.51, "#2a1410");
  grad.addColorStop(1, "#0a0807");
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildTruck(logo: HTMLImageElement, tagline: HTMLImageElement | null) {
  const truck = new THREE.Group();
  const white = new THREE.MeshPhysicalMaterial({ color: 0xd9d7d5, metalness: 0.1, roughness: 0.38, clearcoat: 0.4, clearcoatRoughness: 0.25, envMapIntensity: 0.45 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1b1918, metalness: 0.4, roughness: 0.55 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xbdbdbd, metalness: 1, roughness: 0.3, envMapIntensity: 0.5 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x030405, metalness: 0.6, roughness: 0.22, envMapIntensity: 0.06 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x0c0c0c, roughness: 0.9 });
  const orange = new THREE.MeshStandardMaterial({ color: ORANGE, emissive: ORANGE, emissiveIntensity: 0.35, roughness: 0.4 });

  // --- Cab (front face at z = 0, truck drives toward +z) ---
  const cab = new THREE.Mesh(new RoundedBoxGeometry(2.5, 2.75, 2.3, 6, 0.18), white);
  cab.position.set(0, 2.45, -1.15);
  truck.add(cab);

  // Windshield, slightly proud of the cab front.
  const ws = new THREE.Mesh(new THREE.PlaneGeometry(2.24, 1.05), glass);
  ws.position.set(0, 2.95, 0.02);
  ws.rotation.x = -0.06;
  truck.add(ws);

  // Visor sign with the logo.
  const visorTex = brandTexture(logo, null, 1024, 220, { dark: true });
  const visor = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.47), new THREE.MeshStandardMaterial({ map: visorTex, roughness: 0.35, metalness: 0.05 }));
  visor.position.set(0, 3.62, 0.06);
  truck.add(visor);

  // Grille with dark satin slats so the emblem reads on top.
  const slatMat = new THREE.MeshStandardMaterial({ color: 0x3a3836, metalness: 0.8, roughness: 0.35, envMapIntensity: 0.4 });
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.95, 0.06), dark);
  grille.position.set(0, 1.85, 0.03);
  truck.add(grille);
  for (let i = 0; i < 5; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.05, 0.05), slatMat);
    slat.position.set(0, 1.5 + i * 0.18, 0.08);
    truck.add(slat);
  }
  // Logo emblem on the grille: the last thing you see before impact.
  const emblemTex = new THREE.Texture(logo);
  emblemTex.colorSpace = THREE.SRGBColorSpace;
  emblemTex.anisotropy = 8;
  emblemTex.needsUpdate = true;
  const emblemH = 0.78;
  const emblem = new THREE.Mesh(
    new THREE.PlaneGeometry((logo.width / logo.height) * emblemH, emblemH),
    new THREE.MeshStandardMaterial({ map: emblemTex, transparent: true, roughness: 0.3, metalness: 0.2, emissive: 0xffffff, emissiveMap: emblemTex, emissiveIntensity: 0.45 }),
  );
  emblem.position.set(0, 1.86, 0.13);
  truck.add(emblem);

  // Brand line under the grille.
  const line = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.06, 0.04), orange);
  line.position.set(0, 1.28, 0.05);
  truck.add(line);

  // Bumper.
  const bumper = new THREE.Mesh(new RoundedBoxGeometry(2.56, 0.5, 0.4, 3, 0.08), dark);
  bumper.position.set(0, 0.92, -0.05);
  truck.add(bumper);

  // Headlights (emissive housings; glow sprites added by the scene).
  const lampMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff3dc, emissiveIntensity: 3.2 });
  const lampPositions: THREE.Vector3[] = [];
  for (const x of [-0.98, 0.98]) {
    const lamp = new THREE.Mesh(new RoundedBoxGeometry(0.46, 0.2, 0.06, 2, 0.04), lampMat);
    lamp.position.set(x, 1.0, 0.17);
    truck.add(lamp);
    lampPositions.push(lamp.position.clone().add(new THREE.Vector3(0, 0, 0.05)));
  }

  // Amber roof markers.
  const amber = new THREE.MeshStandardMaterial({ color: 0xffa040, emissive: 0xff8a1f, emissiveIntensity: 1.6 });
  for (let i = -2; i <= 2; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.07, 0.07), amber);
    m.position.set(i * 0.32, 3.88, -0.02);
    truck.add(m);
  }

  // Mirrors.
  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.04, 0.04), dark);
    arm.position.set(s * 1.42, 3.0, -0.15);
    truck.add(arm);
    const mirror = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.62, 0.22, 2, 0.05), dark);
    mirror.position.set(s * 1.62, 2.75, -0.15);
    truck.add(mirror);
  }

  // Roof fairing up to the trailer height.
  const fairing = new THREE.Mesh(new RoundedBoxGeometry(2.46, 0.5, 2.0, 4, 0.2), white);
  fairing.position.set(0, 4.0, -1.3);
  fairing.rotation.x = -0.12;
  truck.add(fairing);

  // Chassis + fuel tanks.
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 6.5), dark);
  chassis.position.set(0, 0.85, -3.6);
  truck.add(chassis);
  for (const s of [-1, 1]) {
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.2, 24), chrome);
    tank.rotation.x = Math.PI / 2;
    tank.position.set(s * 1.0, 0.85, -2.9);
    truck.add(tank);
  }

  // --- Trailer ---
  const inked = inkLogo(logo);
  const sideTex = brandTexture(inked, tagline, 2048, 420, { tagline: true, stripe: true });
  const frontTex = brandTexture(inked, null, 1024, 1100, {});
  const plain = new THREE.MeshPhysicalMaterial({ color: 0xf1f0ef, roughness: 0.4, clearcoat: 0.6 });
  const sideMat = new THREE.MeshPhysicalMaterial({ map: sideTex, roughness: 0.4, clearcoat: 0.6 });
  const sideMatFlip = sideMat.clone();
  sideMatFlip.map = sideTex.clone();
  sideMatFlip.map.wrapS = THREE.RepeatWrapping;
  sideMatFlip.map.repeat.x = -1;
  sideMatFlip.map.needsUpdate = true;
  const frontMat = new THREE.MeshPhysicalMaterial({ map: frontTex, roughness: 0.4, clearcoat: 0.6 });
  // BoxGeometry face order: +x, -x, +y, -y, +z, -z
  const trailer = new THREE.Mesh(new THREE.BoxGeometry(2.55, 2.9, 13.6), [sideMatFlip, sideMat, plain, plain, frontMat, plain]);
  trailer.position.set(0, 2.85, -2.9 - 6.8);
  truck.add(trailer);
  const skirt = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.3, 13.2), dark);
  skirt.position.set(0, 1.25, -9.7);
  truck.add(skirt);

  // Wheels.
  const wheels: THREE.Object3D[] = [];
  const tyreGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.42, 32);
  const hubGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.44, 24);
  const addAxle = (z: number) => {
    for (const s of [-1, 1]) {
      const w = new THREE.Group();
      const tyre = new THREE.Mesh(tyreGeo, rubber);
      const hub = new THREE.Mesh(hubGeo, chrome);
      w.add(tyre, hub);
      w.rotation.z = Math.PI / 2;
      w.position.set(s * 1.06, 0.52, z);
      truck.add(w);
      wheels.push(w);
    }
  };
  addAxle(-0.9);
  addAxle(-4.4);
  addAxle(-5.8);
  addAxle(-12.2);
  addAxle(-13.5);
  addAxle(-14.8);

  return { truck, wheels, lampPositions };
}

export async function createTruckScene(canvas: HTMLCanvasElement, assetBase: string): Promise<TruckScene> {
  const [logo, tagline] = await Promise.all([
    loadImage(`${assetBase}/images/logo-header.webp`),
    loadImage(`${assetBase}/images/tagline.webp`).catch(() => null),
  ]);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  // Phones get a lighter render target; the bloom pass is the expensive part.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 810 ? 1.25 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(INK);
  scene.fog = new THREE.FogExp2(0x1a0f0b, 0.009);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.32;

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 600);

  // Sky dome with the brand-orange horizon.
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(400, 32, 16),
    new THREE.MeshBasicMaterial({ map: skyTexture(), side: THREE.BackSide, fog: false, depthWrite: false }),
  );
  sky.position.y = -30;
  scene.add(sky);

  // Road.
  const road = new THREE.Mesh(new THREE.PlaneGeometry(14, 600), new THREE.MeshStandardMaterial({ color: 0x1c1a19, roughness: 0.9, metalness: 0, envMapIntensity: 0.02 }));
  road.rotation.x = -Math.PI / 2;
  road.position.z = -260;
  scene.add(road);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), new THREE.MeshStandardMaterial({ color: 0x0c0a09, roughness: 1, envMapIntensity: 0 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, -0.02, -300);
  scene.add(ground);

  const markMat = new THREE.MeshStandardMaterial({ color: 0xcfcfcf, roughness: 0.7, envMapIntensity: 0.05 });
  const dashes = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 3), markMat, 80);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < 80; i++) {
    m4.makeRotationX(-Math.PI / 2);
    m4.setPosition(-3.6, 0.01, 10 - i * 7.5);
    dashes.setMatrixAt(i, m4);
  }
  scene.add(dashes);
  for (const x of [-6.6, 6.6]) {
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 600), markMat);
    edge.rotation.x = -Math.PI / 2;
    edge.position.set(x, 0.01, -260);
    scene.add(edge);
  }
  // Orange reflector posts.
  const postMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
  const reflMat = new THREE.MeshStandardMaterial({ color: ORANGE, emissive: ORANGE, emissiveIntensity: 3 });
  const posts = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 1.1, 0.12), postMat, 60);
  const refls = new THREE.InstancedMesh(new THREE.BoxGeometry(0.13, 0.18, 0.13), reflMat, 60);
  for (let i = 0; i < 60; i++) {
    const x = i % 2 ? 7.6 : -7.6;
    const z = 8 - Math.floor(i / 2) * 18;
    m4.makeTranslation(x, 0.55, z);
    posts.setMatrixAt(i, m4);
    m4.makeTranslation(x, 0.95, z);
    refls.setMatrixAt(i, m4);
  }
  scene.add(posts, refls);

  // Lights.
  scene.add(new THREE.HemisphereLight(0x8090b8, 0x1a0e08, 0.18));
  const rim = new THREE.DirectionalLight(0xff7a3a, 2.6);
  rim.position.set(-20, 12, -80);
  scene.add(rim);
  const key = new THREE.DirectionalLight(0xdfe6ff, 0.55);
  key.position.set(12, 18, 20);
  scene.add(key, key.target);

  const { truck, wheels, lampPositions } = buildTruck(logo, tagline);
  // Drive in the right-hand lane toward the camera.
  truck.position.x = 0;
  scene.add(truck);

  // Headlight beams + glows.
  const glowMap = glowTexture();
  const glows: THREE.Sprite[] = [];
  for (const p of lampPositions) {
    const spot = new THREE.SpotLight(0xfff1dc, 120, 70, 0.42, 0.55, 1.4);
    spot.position.copy(p);
    spot.target.position.set(p.x * 1.4, 0, p.z + 30);
    truck.add(spot, spot.target);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowMap, color: 0xfff2e0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true, fog: false }));
    glow.position.copy(p).add(new THREE.Vector3(0, 0, 0.2));
    glow.scale.setScalar(2.4);
    truck.add(glow);
    glows.push(glow);
  }

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.7, 0.5, 0.92);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // Camera sits in the truck's lane at z = 16; the front reaches it at impactAt.
  const CAM_Z = 16;
  const START_Z = -62;
  const END_Z = CAM_Z - 0.35;
  const impactAt = 3.3;
  // Steady approach that accelerates hard in the last third.
  // Near-constant speed with a late surge: a constant-speed approach already grows hyperbolically.
  const easeIn = (x: number) => x * 0.8 + Math.pow(x, 2) * 0.2;

  const render = (t: number) => {
    const p = Math.min(1, Math.max(0, t / impactAt));
    const z = START_Z + (END_Z - START_Z) * easeIn(p);
    truck.position.z = z;
    truck.position.y = Math.sin(t * 13) * 0.012 * p;
    for (const w of wheels) w.rotation.x -= 0.25 + p * 0.6;

    // Dead centre of the lane at road level: the truck comes straight at you.
    // Ground rumble builds into a hard shake; the lens widens (dolly zoom) so the cab looms.
    const shake = Math.pow(p, 3) * 0.14;
    const rumble = Math.sin(t * 47) * Math.pow(p, 2) * 0.02;
    camera.position.set((Math.random() - 0.5) * shake * 0.7, 1.15 + rumble + (Math.random() - 0.5) * shake, CAM_Z);
    camera.lookAt(0, 1.75 + Math.pow(p, 4) * 0.25, -40);
    camera.rotateZ((Math.random() - 0.5) * shake * 0.12);
    // Telephoto start so it looms from the first second; widens in the final metres.
    camera.fov = 17 + Math.pow(p, 5) * 43;
    camera.updateProjectionMatrix();

    for (const g of glows) g.scale.setScalar(1.1);
    // Ease the bloom off up close so the grille and emblem stay readable.
    bloom.strength = 0.5 - Math.pow(p, 6) * 0.3;
    composer.render();
    return CAM_Z - z;
  };

  const resize = (w: number, h: number) => {
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloom.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };

  const dispose = () => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
      for (const m of mats) {
        for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
        m.dispose();
      }
    });
    envTex.dispose();
    pmrem.dispose();
    composer.dispose();
    renderer.dispose();
  };

  return { render, resize, dispose, impactAt };
}
