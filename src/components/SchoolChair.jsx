import React from 'react';

export default function SchoolChair({ rotation = 0, scale = 1, opacity = 1 }) {
  return (
    <div 
      className="relative select-none pointer-events-none drop-shadow-[4px_6px_0px_rgba(0,0,0,0.22)]"
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity
      }}
    >
      <svg 
        width="110" 
        height="140" 
        viewBox="0 0 110 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Back Leg Left (Dark Steel Tube) */}
        <line x1="26" y1="58" x2="16" y2="132" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />
        {/* Back Leg Right */}
        <line x1="68" y1="58" x2="62" y2="132" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />

        {/* Front Leg Left */}
        <line x1="38" y1="76" x2="34" y2="136" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />
        {/* Front Leg Right */}
        <line x1="84" y1="74" x2="84" y2="136" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />

        {/* Leg Cross Braces */}
        <line x1="22" y1="104" x2="35" y2="108" stroke="#0D0F12" strokeWidth="2.5" />
        <line x1="64" y1="104" x2="84" y2="108" stroke="#0D0F12" strokeWidth="2.5" />
        <line x1="35" y1="108" x2="84" y2="108" stroke="#0D0F12" strokeWidth="2.5" />

        {/* Rubber Feet Stoppers */}
        <ellipse cx="16" cy="133" rx="3.5" ry="2" fill="#0D0F12" />
        <ellipse cx="62" cy="133" rx="3.5" ry="2" fill="#0D0F12" />
        <ellipse cx="34" cy="137" rx="3.5" ry="2" fill="#0D0F12" />
        <ellipse cx="84" cy="137" rx="3.5" ry="2" fill="#0D0F12" />

        {/* Chair Backrest Vertical Steel Uprights */}
        <line x1="26" y1="18" x2="26" y2="58" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="68" y1="18" x2="68" y2="58" stroke="#0D0F12" strokeWidth="3.5" strokeLinecap="round" />

        {/* Wooden Curved Backrest Board */}
        <path
          d="M18 16 C38 12, 60 12, 76 16 C80 17, 82 23, 80 32 C78 39, 74 42, 70 42 C54 38, 34 38, 22 42 C16 41, 14 36, 15 28 C15 20, 16 17, 18 16 Z"
          fill="#D97706"
          stroke="#0D0F12"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Backrest Plywood Grain Line & Highlight */}
        <path d="M22 22 Q48 18 72 22" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 30 Q48 27 68 31" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" />
        {/* Backrest Screw Rivets */}
        <circle cx="26" cy="28" r="1.8" fill="#1E293B" stroke="#0D0F12" strokeWidth="1" />
        <circle cx="68" cy="28" r="1.8" fill="#1E293B" stroke="#0D0F12" strokeWidth="1" />

        {/* Seat Under-Frame Metal Bracket */}
        <path d="M26 62 L80 62 L84 74 L26 72 Z" fill="#1E242B" stroke="#0D0F12" strokeWidth="2" />

        {/* Wooden Contoured Seat Plank */}
        <path
          d="M22 62 C20 59, 22 56, 28 55 C44 52, 66 52, 78 55 C84 57, 86 60, 88 64 C90 70, 86 75, 82 76 C64 80, 40 80, 26 76 C20 74, 18 69, 22 62 Z"
          fill="#F59E0B"
          stroke="#0D0F12"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        {/* Seat Highlight and Wood Lines */}
        <path d="M28 60 Q52 57 76 60" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 68 Q54 66 74 69" stroke="#B45309" strokeWidth="1.6" strokeLinecap="round" />
        {/* Seat Fastener Rivets */}
        <circle cx="34" cy="65" r="1.6" fill="#0D0F12" />
        <circle cx="70" cy="65" r="1.6" fill="#0D0F12" />
      </svg>
    </div>
  );
}
