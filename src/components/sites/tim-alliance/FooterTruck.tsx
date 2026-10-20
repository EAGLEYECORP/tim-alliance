import { ASSET } from "./data";

function Wheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 61)`}>
      <g className="ta-truck__wheel">
        <circle r="7.6" fill="#0d0d0d" />
        <circle r="6.2" fill="#1d1d1d" />
        <circle r="3.8" fill="#a7a7a7" />
        <path d="M0-3.8V3.8M-3.8 0H3.8M-2.7-2.7 2.7 2.7M-2.7 2.7 2.7-2.7" stroke="#5c5c5c" strokeWidth="0.8" />
        <circle r="1.1" fill="#2a2a2a" />
      </g>
    </g>
  );
}

/** Side-view TIM ALLIANCE truck that drives across the footer pill (replaces the source GIF). */
export function FooterTruck() {
  return (
    <div className="ta-road" aria-hidden>
      <div className="ta-road__lane" />
      <div className="ta-truck">
        <svg className="ta-truck__svg" viewBox="0 0 390 72" overflow="visible">
          <defs>
            <linearGradient id="ta-trailer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#dedbd9" />
            </linearGradient>
            <linearGradient id="ta-cab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d7d4d2" />
            </linearGradient>
            <linearGradient id="ta-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff3d6" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
            </linearGradient>
            <pattern id="ta-ribs" width="7" height="44" patternUnits="userSpaceOnUse">
              <rect x="0" width="0.7" height="44" fill="rgba(0,0,0,0.06)" />
            </pattern>
          </defs>

          {/* Speed lines */}
          <g className="ta-truck__speed" stroke="rgba(255,255,255,0.35)" strokeLinecap="round">
            <line x1="-40" y1="20" x2="-8" y2="20" />
            <line x1="-60" y1="34" x2="-14" y2="34" />
            <line x1="-34" y1="48" x2="-6" y2="48" />
          </g>

          {/* Headlight beam */}
          <polygon className="ta-truck__beam" points="304,46 390,34 390,66" fill="url(#ta-beam)" />

          <g className="ta-truck__body">
            {/* Trailer */}
            <rect x="6" y="8" width="208" height="44" rx="3" fill="url(#ta-trailer)" />
            <rect x="6" y="8" width="208" height="44" rx="3" fill="url(#ta-ribs)" />
            <rect x="6" y="45" width="208" height="3" fill="#f94006" />
            <image href={`${ASSET}/images/logo-ink.webp`} x="76" y="11" width="52" height="34" preserveAspectRatio="xMidYMid meet" />
            <text x="136" y="31" fontFamily="var(--font-urbanist), sans-serif" fontSize="6.2" fontWeight="700" fill="#1c1817" letterSpacing="0.4">
              www.timalliance.ma
            </text>
            <rect x="10" y="52" width="198" height="4" fill="#232020" />
            <rect x="184" y="52" width="3" height="7" fill="#232020" />
            <rect x="8" y="52" width="4" height="5" fill="#f94006" />

            {/* Tractor chassis + fifth wheel */}
            <rect x="200" y="50" width="104" height="6" rx="1" fill="#1f1d1c" />
            <rect x="242" y="48" width="18" height="7" rx="2" fill="#b8b8b8" />

            {/* Exhaust stack + puffs */}
            <rect x="234" y="6" width="3" height="10" rx="1" fill="#2b2b2b" />
            <g className="ta-truck__smoke" fill="rgba(255,255,255,0.35)">
              <circle cx="235.5" cy="4" r="2" />
              <circle cx="235.5" cy="4" r="2.6" />
              <circle cx="235.5" cy="4" r="3.2" />
            </g>

            {/* Roof fairing */}
            <polygon points="224,9 270,8 288,14 238,14" fill="url(#ta-cab)" />
            {/* Cab */}
            <path d="M238 14H288Q296 14 298 22L301 46V55H236V14Z" fill="url(#ta-cab)" />
            <rect x="284" y="14.5" width="13" height="3.2" rx="1" fill="#121212" />
            <polygon points="285,18.5 295.5,18.8 299,36 287,36" fill="#141a20" />
            <polygon points="287,20 293,20.2 295.5,30 289,30" fill="rgba(255,255,255,0.08)" />
            <rect x="262" y="18" width="20" height="14" rx="2" fill="#141a20" />
            <path d="M260 17V47" stroke="#c9c6c4" strokeWidth="0.8" />
            <polygon points="265,37 277,35 271,43" fill="#f94006" />
            <rect x="236" y="46" width="65" height="2" fill="#f94006" />
            <rect x="296" y="40" width="6" height="15" rx="1" fill="#1d1d1d" />
            <rect x="298" y="43.5" width="4" height="3.2" rx="0.8" fill="#fff6dc" className="ta-truck__lamp" />
            <rect x="300" y="17" width="2.2" height="11" rx="1" fill="#1d1d1d" />
            <rect x="268" y="9.5" width="3" height="1.6" rx="0.6" fill="#ffa040" />
            <rect x="274" y="9.5" width="3" height="1.6" rx="0.6" fill="#ffa040" />
            <rect x="280" y="10.5" width="3" height="1.6" rx="0.6" fill="#ffa040" />
          </g>

          <Wheel x={30} />
          <Wheel x={48} />
          <Wheel x={66} />
          <Wheel x={226} />
          <Wheel x={284} />
        </svg>
      </div>
    </div>
  );
}
