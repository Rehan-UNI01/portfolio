import React from 'react';

export default function SkillBadge({ name, icon, color = 'bg-[#FEF08A]', springLength = 32, onSpringClick }) {
  return (
    <div 
      className="relative flex flex-col items-center select-none cursor-grab active:cursor-grabbing group"
      onClick={onSpringClick}
    >
      {/* Hand-Drawn Badge Body */}
      <div 
        className={`px-3.5 py-1.5 ${color} border-[2.8px] border-black rounded-[4px] shadow-[3.5px_4.5px_0px_#000000] flex items-center space-x-1.5 transition-transform duration-100 group-hover:scale-105 group-active:scale-95`}
      >
        <span className="font-sketch font-bold text-sm md:text-base tracking-tight text-[#0D0F12] whitespace-nowrap">
          {name}
        </span>
        <span className="text-base select-none">{icon}</span>
      </div>

      {/* Hand-Drawn Curly Coil Spring Doodled Underneath (matching Sonny Boy reference image) */}
      <div className="w-6 -mt-0.5 pointer-events-none drop-shadow-[1px_2px_0px_rgba(0,0,0,0.15)]">
        <svg 
          viewBox="0 0 24 40" 
          width="24" 
          height={springLength} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Curly Spiral Spring Path */}
          <path
            d="M12 0 
               C18 3, 22 7, 14 10 
               C5 12, 2 16, 12 18 
               C22 20, 20 24, 12 26 
               C4 28, 6 32, 12 34 
               C18 36, 16 39, 12 40"
            stroke="#0D0F12"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
