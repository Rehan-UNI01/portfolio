import React from 'react';

export default function PaperAirplane({ rotation = 0, scale = 1 }) {
  return (
    <div 
      className="relative select-none pointer-events-none drop-shadow-[4px_6px_0px_rgba(0,0,0,0.22)]"
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
    >
      <svg 
        width="110" 
        height="75" 
        viewBox="0 0 110 75" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <pattern id="planeHalftone" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.1" fill="#0D0F12" opacity="0.38" />
          </pattern>
        </defs>

        {/* Underwing Shadow with Screentone */}
        <polygon points="10,48 95,12 48,58" fill="url(#planeHalftone)" />

        {/* Bottom Wing / Keel Fold */}
        <polygon 
          points="10,48 98,10 50,62" 
          fill="#E2E8F0" 
          stroke="#0D0F12" 
          strokeWidth="3.2" 
          strokeLinejoin="round" 
        />

        {/* Main Upper Wing */}
        <polygon 
          points="10,48 98,10 65,34" 
          fill="#FFFFFF" 
          stroke="#0D0F12" 
          strokeWidth="3.2" 
          strokeLinejoin="round" 
        />

        {/* Central Spine Fold Line */}
        <line x1="10" y1="48" x2="98" y2="10" stroke="#0D0F12" strokeWidth="2.8" strokeLinecap="round" />

        {/* Opposite Wing Fold */}
        <polygon 
          points="28,38 98,10 65,34" 
          fill="#F8FAFC" 
          stroke="#0D0F12" 
          strokeWidth="2.8" 
          strokeLinejoin="round" 
        />

        {/* Paper Texture Crease Line */}
        <line x1="38" y1="44" x2="72" y2="28" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}
