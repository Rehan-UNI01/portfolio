import React from 'react';

export default function ProjectCard({ project, onInspect, onRun }) {
  const { title, subtitle, type } = project;

  return (
    <div className="w-[215px] sm:w-[235px] bg-[#FFFDF7] border-[3px] border-black rounded-[6px] shadow-[5px_6px_0px_#000000] p-3 flex flex-col items-center select-none cursor-grab active:cursor-grabbing hover:shadow-[7px_8px_0px_#000000] transition-shadow duration-150">
      {/* Hand-Drawn Inner Illustration Box */}
      <div className="w-full h-[155px] sm:h-[168px] border-[2.8px] border-black rounded-[4px] overflow-hidden relative bg-[#F8FAFC] flex items-center justify-center">
        {type === 'engine' && (
          /* Dimensional Router: System Architecture / Database / Network Nodes */
          <div className="w-full h-full relative p-2 flex flex-col justify-between halftone-dots">
            {/* Hand-drawn network diagram */}
            <svg viewBox="0 0 180 130" className="w-full h-full overflow-visible">
              {/* Server / PC Monitor */}
              <g transform="translate(42, 10)">
                <rect x="0" y="0" width="36" height="26" rx="2" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="2.5" />
                <line x1="5" y1="6" x2="31" y2="6" stroke="#00A3FF" strokeWidth="2" />
                <line x1="5" y1="12" x2="25" y2="12" stroke="#0D0F12" strokeWidth="1.8" />
                <line x1="5" y1="18" x2="20" y2="18" stroke="#0D0F12" strokeWidth="1.8" />
                {/* Stand */}
                <rect x="15" y="26" width="6" height="8" fill="#1E293B" stroke="#0D0F12" strokeWidth="2" />
                <rect x="9" y="34" width="18" height="4" rx="1" fill="#1E293B" stroke="#0D0F12" strokeWidth="2" />
              </g>

              {/* Connecting Data Bus Lines */}
              <path d="M60 48 L60 62 L120 74" fill="none" stroke="#0D0F12" strokeWidth="2.4" />
              <path d="M60 62 L60 72" fill="none" stroke="#0D0F12" strokeWidth="2.4" />

              {/* Database Cylinder */}
              <g transform="translate(44, 74)">
                <ellipse cx="16" cy="6" rx="16" ry="6" fill="#F1F5F9" stroke="#0D0F12" strokeWidth="2.2" />
                <path d="M0 6 L0 18 C0 22 32 22 32 18 L32 6" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="2.2" />
                <ellipse cx="16" cy="18" rx="16" ry="6" fill="#F1F5F9" stroke="#0D0F12" strokeWidth="2.2" />
                <path d="M0 18 L0 30 C0 34 32 34 32 30 L32 18" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="2.2" />
                <ellipse cx="16" cy="30" rx="16" ry="6" fill="#E2E8F0" stroke="#0D0F12" strokeWidth="2.2" />
                {/* LED Blinks */}
                <circle cx="8" cy="14" r="1.5" fill="#00CC99" />
                <circle cx="8" cy="26" r="1.5" fill="#FF3B30" />
              </g>

              {/* Client Terminal Monitor on the Right */}
              <g transform="translate(112, 56)">
                <rect x="0" y="0" width="38" height="28" rx="2" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="2.5" />
                {/* Simulated Chart on Screen */}
                <polyline points="6,20 14,14 22,18 32,8" fill="none" stroke="#FF3B30" strokeWidth="2" />
                <circle cx="32" cy="8" r="2" fill="#FF3B30" />
                <rect x="16" y="28" width="6" height="7" fill="#1E293B" stroke="#0D0F12" strokeWidth="2" />
                <rect x="10" y="35" width="18" height="3" rx="1" fill="#1E293B" stroke="#0D0F12" strokeWidth="2" />
              </g>
            </svg>
          </div>
        )}

        {type === 'compass' && (
          /* Compass CLI: Hand-Drawn Anime Navigation Compass with Cyan Halftone */
          <div className="w-full h-full relative bg-[#00A3FF] flex items-center justify-center overflow-hidden">
            {/* Halftone Screentone Grid */}
            <div className="absolute inset-0 halftone-cyan opacity-40" />

            {/* Compass Vector Art */}
            <svg viewBox="0 0 140 140" className="w-28 h-28 relative z-10 overflow-visible">
              {/* Outer Dial Circle */}
              <circle cx="70" cy="70" r="54" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="3.2" />
              <circle cx="70" cy="70" r="46" fill="none" stroke="#0D0F12" strokeWidth="1.8" strokeDasharray="4 2.5" />

              {/* Cardinal Markers */}
              <text x="70" y="34" fontSize="13" fontWeight="900" textAnchor="middle" fill="#0D0F12" fontFamily="sans-serif">N</text>
              <text x="70" y="112" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0D0F12" fontFamily="sans-serif">S</text>
              <text x="32" y="73" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0D0F12" fontFamily="sans-serif">W</text>
              <text x="108" y="73" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0D0F12" fontFamily="sans-serif">E</text>

              {/* North Pointer Arrow (Stylized Sonny Boy Compass Needle) */}
              <polygon points="70,38 78,70 70,64" fill="#FF3B30" stroke="#0D0F12" strokeWidth="2" />
              <polygon points="70,38 62,70 70,64" fill="#FF5E54" stroke="#0D0F12" strokeWidth="2" />

              {/* South Pointer Arrow */}
              <polygon points="70,102 78,70 70,76" fill="#1E293B" stroke="#0D0F12" strokeWidth="2" />
              <polygon points="70,102 62,70 70,76" fill="#475569" stroke="#0D0F12" strokeWidth="2" />

              {/* Center Pivot Pin */}
              <circle cx="70" cy="70" r="5" fill="#FFD026" stroke="#0D0F12" strokeWidth="2.2" />
            </svg>
          </div>
        )}

        {type === 'consensus' && (
          /* Drift Consensus: Distributed Mesh & State Machine Orbit */
          <div className="w-full h-full relative bg-[#FEF3C7] flex items-center justify-center halftone-dense opacity-90 p-2">
            <svg viewBox="0 0 140 120" className="w-28 h-24 overflow-visible">
              {/* Triangular Node Connection */}
              <polygon points="70,22 28,92 112,92" fill="none" stroke="#0D0F12" strokeWidth="2.4" strokeDasharray="3 3" />
              {/* Center Orbit Ring */}
              <circle cx="70" cy="68" r="26" fill="none" stroke="#00A3FF" strokeWidth="2" />
              
              {/* Nodes */}
              <circle cx="70" cy="22" r="10" fill="#00CC99" stroke="#0D0F12" strokeWidth="2.5" />
              <circle cx="28" cy="92" r="10" fill="#FFD026" stroke="#0D0F12" strokeWidth="2.5" />
              <circle cx="112" cy="92" r="10" fill="#FF3B30" stroke="#0D0F12" strokeWidth="2.5" />

              <text x="70" y="26" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#0D0F12">N1</text>
              <text x="28" y="96" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#0D0F12">N2</text>
              <text x="112" y="96" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#0D0F12">N3</text>
            </svg>
          </div>
        )}

        {type === 'portfolio' && (
          /* Void Log / Portfolio Blueprint */
          <div className="w-full h-full relative bg-[#E0F2FE] flex items-center justify-center p-2">
            <svg viewBox="0 0 140 120" className="w-28 h-24 overflow-visible">
              <rect x="15" y="15" width="110" height="90" rx="3" fill="#FFFFFF" stroke="#0D0F12" strokeWidth="2.5" />
              <line x1="15" y1="35" x2="125" y2="35" stroke="#0D0F12" strokeWidth="2" />
              <circle cx="28" cy="25" r="3" fill="#FF3B30" />
              <circle cx="38" cy="25" r="3" fill="#FFD026" />
              <circle cx="48" cy="25" r="3" fill="#00CC99" />
              <text x="70" y="27" fontSize="7" fontWeight="bold" fill="#0D0F12">DEV LOG</text>
              <rect x="25" y="45" width="40" height="20" rx="2" fill="#FEF08A" stroke="#0D0F12" strokeWidth="1.5" />
              <rect x="75" y="45" width="40" height="20" rx="2" fill="#93C5FD" stroke="#0D0F12" strokeWidth="1.5" />
              <line x1="25" y1="78" x2="115" y2="78" stroke="#0D0F12" strokeWidth="2" />
              <line x1="25" y1="88" x2="90" y2="88" stroke="#64748B" strokeWidth="2" />
            </svg>
          </div>
        )}
      </div>

      {/* Card Text Information (Hand-drawn look matching Sonny Boy) */}
      <div className="w-full mt-2.5 mb-2 text-center">
        <h3 className="font-sketch font-bold text-base sm:text-[17px] text-[#0D0F12] leading-tight tracking-tight">
          {title}
        </h3>
        <p className="font-sketch font-medium text-xs sm:text-[13px] text-[#334155] leading-tight mt-0.5">
          {subtitle}
        </p>
      </div>

      {/* Interactive Action Buttons: [Inspect] & [Run] */}
      <div className="w-full grid grid-cols-2 gap-2 mt-auto pt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInspect(project);
          }}
          className="sketch-btn py-1 px-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] text-[#0D0F12] text-xs font-sketch font-bold flex items-center justify-center space-x-1"
        >
          <span>Inspect</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRun(project);
          }}
          className="sketch-btn py-1 px-2 bg-[#FFD026] hover:bg-[#FACC15] active:bg-[#EAB308] text-[#0D0F12] text-xs font-sketch font-bold flex items-center justify-center space-x-1"
        >
          <span>Run</span>
        </button>
      </div>
    </div>
  );
}
