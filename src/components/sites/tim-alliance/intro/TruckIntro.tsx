"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASSET } from "../data";
import "./intro.css";

type Phase = "drive" | "flash" | "lockup" | "reveal" | "done";

const LOCKUP_MS = 1300;
const REVEAL_MS = 1000;

/** Marks the intro as finished: un-pauses the hero entrance and unlocks scrolling. */
function finish() {
  document.documentElement.dataset.intro = "done";
  try {
    sessionStorage.setItem("ta-intro-seen", "1");
  } catch {
    /* storage unavailable: the intro will just play again next visit */
  }
}

export function TruckIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("drive");
  const [active, setActive] = useState(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const runOutro = useCallback(() => {
    setPhase("lockup");
    later(() => setPhase("reveal"), LOCKUP_MS);
    later(() => {
      setPhase("done");
      finish();
    }, LOCKUP_MS + REVEAL_MS);
  }, []);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("reveal");
    later(() => {
      setPhase("done");
      finish();
    }, REVEAL_MS);
  }, []);

  useEffect(() => {
    // The inline head script decides whether the intro plays (first visit, motion allowed).
    if (document.documentElement.dataset.intro !== "playing") {
      setPhase("done");
      return;
    }
    setActive(true);
    const pending = timers.current;
    let raf = 0;
    let disposed = false;
    let cleanupScene: (() => void) | undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKey);

    (async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        const probe = document.createElement("canvas");
        if (!probe.getContext("webgl2") && !probe.getContext("webgl")) throw new Error("no-webgl");
        const { createTruckScene } = await import("./truckScene");
        const scene = await createTruckScene(canvas, ASSET);
        if (disposed) {
          scene.dispose();
          return;
        }
        const size = () => scene.resize(window.innerWidth, window.innerHeight);
        size();
        window.addEventListener("resize", size);
        // Dev only: ?introDebug=<seconds> freezes the drive at that moment for visual checks.
        const debugT =
          process.env.NODE_ENV !== "production" ? Number(new URLSearchParams(location.search).get("introDebug") ?? NaN) : NaN;
        if (!Number.isNaN(debugT)) {
          scene.render(debugT);
          document.documentElement.dataset.introFrame = "ready";
          return;
        }
        const start = performance.now();
        let flashed = false;
        const loop = (now: number) => {
          const t = (now - start) / 1000;
          scene.render(t);
          if (!flashed && t >= scene.impactAt - 0.03) {
            flashed = true;
            setPhase("flash");
            later(runOutro, 380);
          }
          if (t < scene.impactAt + 0.5) raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        cleanupScene = () => {
          window.removeEventListener("resize", size);
          scene.dispose();
        };
      } catch {
        // No WebGL: keep the brand moment, skip the 3D drive.
        runOutro();
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      pending.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      cleanupScene?.();
    };
  }, [runOutro, skip]);

  // Free the GPU as soon as the drive is over.
  useEffect(() => {
    if (phase === "reveal" || phase === "done") {
      const c = canvasRef.current;
      if (c) c.style.display = "none";
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div className={`ta-intro ta-intro--${phase}`} data-active={active}>
      <div className="ta-intro__curtain ta-intro__curtain--top" aria-hidden />
      <div className="ta-intro__curtain ta-intro__curtain--bottom" aria-hidden />
      <canvas ref={canvasRef} className="ta-intro__canvas" aria-hidden />
      <div className="ta-intro__vignette" aria-hidden />
      <div className="ta-intro__flash" aria-hidden />
      <div className="ta-intro__lockup" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${ASSET}/images/logo-header.webp`} alt="" className="ta-intro__logo" />
        <span className="ta-intro__rule" />
        <p className="ta-intro__claim">20 ans d&apos;expertise transport</p>
      </div>
      <button type="button" className="ta-intro__skip" onClick={skip}>
        Passer l&apos;intro
      </button>
    </div>
  );
}
