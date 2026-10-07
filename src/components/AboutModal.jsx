import React from 'react';
import { portfolioData } from '../data/portfolioData';

export default function AboutModal({ onClose }) {
  const { personal, education } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-xl bg-[#FFFDF7] border-[3.5px] border-black rounded-[8px] shadow-[8px_10px_0px_#000000] overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Washi Tape Header */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#FDE047]/90 border-[1.5px] border-black/40 rotate-[-1deg] shadow-sm z-10" />

        {/* Modal Header */}
        <div className="bg-[#E2E8F0] border-b-[3px] border-black px-4 pt-4 pb-2.5 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <span className="font-title text-base sm:text-lg text-[#0D0F12]">
              ABOUT // NAGARA & MOHAMMAD REHAN
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white hover:bg-[#FF3B30] hover:text-white border-[2px] border-black rounded font-bold text-xs flex items-center justify-center transition-colors shadow-[1.5px_2px_0px_#000]"
          >
            ✕
          </button>
        </div>

        {/* Ruled Notebook Page Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Identity Capsule */}
          <div className="bg-[#FEF9C3] border-[2.5px] border-black rounded-[6px] p-3.5 shadow-[3px_4px_0px_#000]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-title text-xl text-[#0D0F12]">
                  {personal.name}
                </h3>
                <p className="font-sketch font-bold text-sm text-[#475569]">
                  {personal.role} • {personal.college}
                </p>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#00CC99] text-black border border-black rounded">
                1st Year CSE
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm font-sketch leading-relaxed text-[#1E293B]">
              {personal.about}
            </p>
          </div>

          {/* Academic Journey */}
          <div className="bg-white border-[2.2px] border-black rounded-[6px] p-3.5 shadow-[3px_4px_0px_#000]">
            <h4 className="font-sketch font-bold text-base text-[#0D0F12] mb-1.5 flex items-center space-x-1.5">
              <span>🏫 Academic Path</span>
            </h4>
            <div className="text-xs sm:text-sm font-sketch space-y-1 text-[#334155]">
              <p><strong className="text-[#0D0F12]">Degree:</strong> {education[0].degree}</p>
              <p><strong className="text-[#0D0F12]">Institution:</strong> {education[0].institution}, Jaipur</p>
              <p><strong className="text-[#0D0F12]">Timeline:</strong> {education[0].period} ({education[0].status})</p>
              <p className="pt-1 text-[#475569]">{education[0].description}</p>
            </div>
          </div>

          {/* Core Aptitudes Grid */}
          <div>
            <h4 className="font-sketch font-bold text-base text-[#0D0F12] mb-2">
              🛠️ Foundational Focus
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'C Programming', level: 'Core Language', bg: 'bg-[#FEF08A]' },
                { name: 'Algorithmic Logic', level: 'Foundations', bg: 'bg-[#BAE6FD]' },
                { name: 'Computer Systems', level: 'Architecture', bg: 'bg-[#BBF7D0]' },
                { name: 'AI & Data Ethics', level: 'Exploration', bg: 'bg-[#DDD6FE]' },
                { name: 'Cybersecurity', level: 'Basics & Sec', bg: 'bg-[#FECDD3]' },
                { name: 'Japanese (日本語)', level: 'Language & Culture', bg: 'bg-[#FED7AA]' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-2 border-[2px] border-black rounded-[4px] shadow-[2px_2.5px_0px_#000] ${item.bg}`}
                >
                  <p className="font-sketch font-bold text-xs text-[#0D0F12] leading-tight">{item.name}</p>
                  <p className="font-mono text-[10px] text-[#475569] mt-0.5">{item.level}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="mailto:rehanbcon0974@jecrcu.edu.in"
              className="sketch-btn py-1.5 px-3 bg-[#00A3FF] text-white hover:bg-[#0082D9] text-xs font-sketch font-bold"
            >
              Direct Email (JECRC) ✉️
            </a>
            <a
              href="https://github.com/Rehan-UNI01"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn py-1.5 px-3 bg-white hover:bg-[#FEF08A] text-xs font-sketch font-bold"
            >
              GitHub Profile 🎋
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-rehan-83aa21302/"
              target="_blank"
              rel="noopener noreferrer"
              className="sketch-btn py-1.5 px-3 bg-white hover:bg-[#93C5FD] text-xs font-sketch font-bold"
            >
              LinkedIn 💼
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F8FAFC] border-t-[2.5px] border-black px-4 py-2.5 flex items-center justify-between select-none">
          <span className="font-sketch font-medium text-xs text-[#64748B]">
            Lost in the dimensional drift, building reality.
          </span>
          <button
            onClick={onClose}
            className="sketch-btn py-1 px-4 bg-[#FFD026] text-xs font-sketch font-bold"
          >
            Back to Drift
          </button>
        </div>
      </div>
    </div>
  );
}
