import React from 'react';

export default function SceneryBackdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {/* Dynamic Sky Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1055EA 0%, #0084FF 32%, #00B4D8 70%, #BAE6FD 88%, #FEF3C7 98%)'
        }}
      />

      {/* SVG Halftone Pattern Definitions & Scenery Art */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          {/* Manga Halftone Screentone Pattern */}
          <pattern id="cloudHalftone" x="0" y="0" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.5" fill="#0D0F12" opacity="0.32" />
          </pattern>

          <pattern id="fenceMesh" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8 L8 0 L16 8 L8 16 Z" fill="none" stroke="#0D0F12" strokeWidth="1.2" />
          </pattern>

          {/* Warm Sun Radial Glow */}
          <radialGradient id="sunGlow" cx="62%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#7DD3FC" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sun Glow Behind Fence */}
        <circle cx="62%" cy="85%" r="420" fill="url(#sunGlow)" />
        <ellipse cx="62%" cy="88%" rx="280" ry="120" fill="#FEF08A" opacity="0.4" />
      </svg>

      {/* Hand-Drawn Anime Clouds with Screentone Shading */}
      {/* Cloud 1: Upper Right */}
      <div className="absolute top-[8%] -right-12 md:right-16 w-80 md:w-[460px] h-48 opacity-95 transition-transform duration-1000">
        <svg viewBox="0 0 320 180" className="w-full h-full drop-shadow-[4px_6px_0px_rgba(0,0,0,0.15)]">
          {/* Cloud Halftone Underbelly */}
          <path
            d="M50 130 C70 145, 110 155, 160 145 C210 155, 270 140, 290 120 C310 100, 305 75, 280 65 C265 60, 240 68, 230 75 C215 50, 175 40, 140 55 C120 40, 80 50, 70 75 C45 80, 30 105, 50 130 Z"
            fill="url(#cloudHalftone)"
          />
          {/* Cloud Solid Crisp White Body */}
          <path
            d="M50 120 C70 132, 110 140, 160 135 C205 142, 260 130, 285 110 C302 92, 295 70, 275 60 C260 52, 235 60, 225 65 C210 40, 175 32, 140 45 C120 32, 85 42, 72 65 C50 72, 35 95, 50 120 Z"
            fill="#FFFFFF"
            stroke="#0D0F12"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Hand-Drawn Inner Creases */}
          <path d="M110 65 Q135 55 160 70" fill="none" stroke="#0D0F12" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M195 60 Q225 55 240 75" fill="none" stroke="#0D0F12" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M75 90 Q95 85 115 100" fill="none" stroke="#0D0F12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Cloud 2: Middle Left */}
      <div className="absolute top-[28%] -left-10 md:left-4 w-72 md:w-96 h-40 opacity-90">
        <svg viewBox="0 0 280 150" className="w-full h-full drop-shadow-[3px_5px_0px_rgba(0,0,0,0.12)]">
          <path
            d="M40 105 C60 120, 100 130, 140 120 C180 130, 230 115, 250 95 C265 75, 255 55, 230 50 C210 30, 170 25, 140 40 C120 28, 85 35, 70 55 C45 60, 30 85, 40 105 Z"
            fill="url(#cloudHalftone)"
          />
          <path
            d="M40 98 C60 110, 100 118, 140 112 C180 120, 225 108, 245 88 C260 70, 250 50, 225 45 C208 26, 170 22, 140 35 C120 24, 88 30, 72 48 C48 54, 32 78, 40 98 Z"
            fill="#FFFFFF"
            stroke="#0D0F12"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M90 50 Q115 42 135 55" fill="none" stroke="#0D0F12" strokeWidth="2" strokeLinecap="round" />
          <path d="M165 45 Q195 40 210 58" fill="none" stroke="#0D0F12" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Cloud 3: Lower Center Floating Puff */}
      <div className="absolute top-[65%] left-[14%] md:left-[18%] w-48 md:w-64 h-28 opacity-85">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[3px_4px_0px_rgba(0,0,0,0.12)]">
          <path
            d="M30 75 C50 85, 90 90, 120 82 C145 88, 175 78, 185 62 C195 48, 185 35, 165 32 C150 18, 120 15, 100 25 C85 18, 60 22, 50 35 C30 40, 20 60, 30 75 Z"
            fill="url(#cloudHalftone)"
          />
          <path
            d="M30 70 C48 78, 88 82, 118 76 C142 80, 170 72, 180 58 C190 44, 180 32, 160 28 C145 16, 118 12, 98 22 C84 15, 60 18, 50 30 C32 36, 22 55, 30 70 Z"
            fill="#FFFFFF"
            stroke="#0D0F12"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Hand-Drawn Japanese Utility Pole (電信柱) & Catenary Power Wires */}
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-[480px] md:h-[620px] pointer-events-none">
        <svg viewBox="0 0 360 620" className="w-full h-full overflow-visible">
          {/* Main Pole Body */}
          <path
            d="M95 620 L115 140 L125 140 L115 620 Z"
            fill="#1E242B"
            stroke="#0D0F12"
            strokeWidth="3.2"
          />
          {/* Pole Highlights and Wood/Concrete Texture Lines */}
          <line x1="105" y1="200" x2="105" y2="580" stroke="#475569" strokeWidth="2.5" />
          <line x1="100" y1="310" x2="110" y2="310" stroke="#0D0F12" strokeWidth="2.5" />
          <line x1="102" y1="420" x2="112" y2="420" stroke="#0D0F12" strokeWidth="2.5" />
          <line x1="98" y1="520" x2="108" y2="520" stroke="#0D0F12" strokeWidth="2.5" />

          {/* Footpegs / Climbing Rungs */}
          <line x1="90" y1="360" x2="102" y2="360" stroke="#0D0F12" strokeWidth="3" strokeLinecap="round" />
          <line x1="110" y1="390" x2="122" y2="390" stroke="#0D0F12" strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="440" x2="100" y2="440" stroke="#0D0F12" strokeWidth="3" strokeLinecap="round" />
          <line x1="108" y1="480" x2="120" y2="480" stroke="#0D0F12" strokeWidth="3" strokeLinecap="round" />
          <line x1="86" y1="530" x2="98" y2="530" stroke="#0D0F12" strokeWidth="3" strokeLinecap="round" />

          {/* Lower Crossarm */}
          <rect x="55" y="240" width="115" height="13" rx="2" fill="#2A323D" stroke="#0D0F12" strokeWidth="3" />
          {/* Upper Crossarm */}
          <rect x="40" y="175" width="145" height="14" rx="2" fill="#2A323D" stroke="#0D0F12" strokeWidth="3" />

          {/* Support Diagonal Braces */}
          <line x1="68" y1="189" x2="110" y2="225" stroke="#0D0F12" strokeWidth="3" />
          <line x1="158" y1="189" x2="116" y2="225" stroke="#0D0F12" strokeWidth="3" />

          {/* Porcelain Insulators (Gaishi) */}
          {/* Upper insulators */}
          <g transform="translate(48, 160)">
            <rect x="0" y="0" width="10" height="16" rx="2" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
            <circle cx="5" cy="0" r="4" fill="#00CC99" stroke="#0D0F12" strokeWidth="1.8" />
          </g>
          <g transform="translate(108, 160)">
            <rect x="0" y="0" width="10" height="16" rx="2" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
            <circle cx="5" cy="0" r="4" fill="#00CC99" stroke="#0D0F12" strokeWidth="1.8" />
          </g>
          <g transform="translate(168, 160)">
            <rect x="0" y="0" width="10" height="16" rx="2" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
            <circle cx="5" cy="0" r="4" fill="#00CC99" stroke="#0D0F12" strokeWidth="1.8" />
          </g>

          {/* Lower insulators */}
          <g transform="translate(68, 226)">
            <rect x="0" y="0" width="9" height="14" rx="2" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
            <circle cx="4.5" cy="0" r="3.5" fill="#00CC99" stroke="#0D0F12" strokeWidth="1.8" />
          </g>
          <g transform="translate(148, 226)">
            <rect x="0" y="0" width="9" height="14" rx="2" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
            <circle cx="4.5" cy="0" r="3.5" fill="#00CC99" stroke="#0D0F12" strokeWidth="1.8" />
          </g>

          {/* Cylindrical Distribution Transformer Canister */}
          <g transform="translate(118, 280)">
            {/* Mounting bracket */}
            <rect x="-8" y="10" width="10" height="42" fill="#1E242B" stroke="#0D0F12" strokeWidth="2.5" />
            {/* Canister Body */}
            <rect x="0" y="0" width="38" height="62" rx="4" fill="#64748B" stroke="#0D0F12" strokeWidth="3" />
            {/* Top Cap */}
            <ellipse cx="19" cy="0" rx="19" ry="5" fill="#94A3B8" stroke="#0D0F12" strokeWidth="2.5" />
            {/* Cooling Ribs */}
            <line x1="7" y1="12" x2="7" y2="52" stroke="#334155" strokeWidth="2" />
            <line x1="14" y1="12" x2="14" y2="52" stroke="#334155" strokeWidth="2" />
            <line x1="24" y1="12" x2="24" y2="52" stroke="#334155" strokeWidth="2" />
            <line x1="31" y1="12" x2="31" y2="52" stroke="#334155" strokeWidth="2" />
            {/* Caution Stencil */}
            <rect x="8" y="24" width="22" height="12" rx="1" fill="#FFD026" stroke="#0D0F12" strokeWidth="1.5" />
            <text x="11" y="33" fontSize="6.5" fontWeight="bold" fill="#0D0F12" fontFamily="sans-serif">200V</text>
          </g>

          {/* Tension Guy-Wire Anchor */}
          <line x1="110" y1="210" x2="0" y2="600" stroke="#0D0F12" strokeWidth="2.2" strokeDasharray="6 3" />

          {/* Electric Telephone / Power Catenary Lines */}
          <path d="M53 160 Q260 190 700 130" fill="none" stroke="#0D0F12" strokeWidth="2.8" />
          <path d="M113 160 Q340 215 850 160" fill="none" stroke="#0D0F12" strokeWidth="3" />
          <path d="M173 160 Q420 230 1100 190" fill="none" stroke="#0D0F12" strokeWidth="2.8" />
          <path d="M72 226 Q400 310 1200 270" fill="none" stroke="#0D0F12" strokeWidth="2.5" />
          <path d="M152 226 Q460 340 1300 310" fill="none" stroke="#0D0F12" strokeWidth="2.6" />
        </svg>
      </div>

      {/* School Rooftop Chain-Link Fence & Silhouette Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-44 md:h-56 pointer-events-none">
        <svg viewBox="0 0 1440 220" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Sun Horizon Halo */}
          <rect x="0" y="70" width="1440" height="150" fill="url(#sunGlow)" opacity="0.6" />

          {/* School Fence Posts & Chain Link Grid */}
          {/* Top Rail */}
          <line x1="0" y1="65" x2="1440" y2="65" stroke="#0D0F12" strokeWidth="4.5" />
          {/* Middle Rail */}
          <line x1="0" y1="115" x2="1440" y2="115" stroke="#0D0F12" strokeWidth="3.2" />

          {/* Fence Diamond Mesh Area */}
          <rect x="0" y="65" width="1440" height="90" fill="url(#fenceMesh)" opacity="0.75" />

          {/* Heavy Steel Vertical Fence Posts */}
          {[120, 260, 420, 580, 740, 900, 1060, 1220, 1380].map((x) => (
            <g key={x}>
              <line x1={x} y1="58" x2={x} y2="155" stroke="#0D0F12" strokeWidth="5.5" />
              {/* Post Cap */}
              <circle cx={x} cy="58" r="4.5" fill="#0D0F12" />
            </g>
          ))}

          {/* Solid Black Japanese School Rooftop Concrete Parapet / Ledge Silhouette */}
          <path
            d="M0 155 
               L180 155 L180 150 L280 150 L280 155 
               L620 155 L630 148 L720 148 L730 155 
               L1080 155 L1090 152 L1170 152 L1180 155 
               L1440 155 L1440 220 L0 220 Z"
            fill="#0D0F12"
          />
        </svg>
      </div>

      {/* Floating Ambient Dust & Stipple Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: '18%', y: '16%', s: '4px', o: 0.6 },
          { x: '24%', y: '22%', s: '3px', o: 0.5 },
          { x: '35%', y: '12%', s: '5px', o: 0.7 },
          { x: '48%', y: '32%', s: '3px', o: 0.5 },
          { x: '68%', y: '18%', s: '4px', o: 0.6 },
          { x: '72%', y: '28%', s: '6px', o: 0.65 },
          { x: '82%', y: '38%', s: '3.5px', o: 0.55 },
          { x: '15%', y: '52%', s: '4px', o: 0.45 },
          { x: '88%', y: '62%', s: '5px', o: 0.6 },
        ].map((pt, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-black animate-float-slow"
            style={{
              left: pt.x,
              top: pt.y,
              width: pt.s,
              height: pt.s,
              opacity: pt.o,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Texture Overlays */}
      <div className="film-grain-overlay" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-40" />
    </div>
  );
}
