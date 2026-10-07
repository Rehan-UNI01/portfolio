import React, { useState } from 'react';
import { driftAudio } from '../utils/audioSynth';

export default function HeaderNav({ 
  onOpenAbout, 
  onOpenProjects, 
  onFocusContact,
  zeroGEnabled, 
  onToggleZeroG, 
  onScatter, 
  onResetPositions 
}) {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleSound = () => {
    const isNowPlaying = driftAudio.toggleAmbient();
    setAudioPlaying(isNowPlaying);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 flex items-center justify-between select-none pointer-events-auto">
      {/* Title (matching user's reference image exactly: NAGARA'S DEV LOG) */}
      <div className="flex items-center space-x-3">
        <div className="relative group cursor-pointer" onClick={onOpenAbout}>
          <h1 className="font-title text-2xl sm:text-3xl md:text-4xl text-[#0D0F12] tracking-tight drop-shadow-[2px_2.5px_0px_#FFFFFF] uppercase">
            NAGARA’S DEV LOG
          </h1>
          {/* Handwritten Subtitle / Badge */}
          <div className="flex items-center space-x-2 -mt-1">
            <span className="font-sketch font-bold text-xs sm:text-sm text-[#0D0F12] bg-[#FEF08A] px-2 py-0.2 border-[2px] border-black rounded shadow-[2px_2px_0px_#000]">
              漂流 DRIFT // MOHAMMAD REHAN
            </span>
            <span className="hidden sm:inline font-mono text-[11px] font-bold text-white bg-black px-1.5 py-0.5 rounded">
              CSE '26
            </span>
          </div>
        </div>
      </div>

      {/* Right Navigation & Interactive Controls */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Navigation items from the image: Home, About, Code, Terms, Contact */}
        <nav className="hidden md:flex items-center space-x-4 font-sketch text-lg font-bold text-[#0D0F12]">
          <button 
            onClick={() => onResetPositions()} 
            className="hover:text-white transition-colors underline decoration-black decoration-2 underline-offset-4"
          >
            Home
          </button>
          <button 
            onClick={onOpenAbout} 
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <button 
            onClick={onOpenProjects} 
            className="hover:text-white transition-colors"
          >
            Code
          </button>
          <button 
            onClick={() => onScatter()} 
            className="hover:text-white transition-colors"
          >
            Terms
          </button>
          <button 
            onClick={onFocusContact} 
            className="hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Physics & Audio Action Pill Bar */}
        <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md border-[2.6px] border-black rounded-[6px] shadow-[3.5px_4px_0px_#000000] p-1">
          {/* Zero-G Toggle */}
          <button
            onClick={onToggleZeroG}
            title="Toggle Anti-Gravity Drift"
            className={`px-2 py-1 text-xs font-sketch font-bold border-[1.8px] border-black rounded transition-all flex items-center space-x-1 ${
              zeroGEnabled ? 'bg-[#00CC99] text-black' : 'bg-[#E2E8F0] text-[#475569]'
            }`}
          >
            <span>{zeroGEnabled ? '🌌 Zero-G: ON' : '⚓ Anchored'}</span>
          </button>

          {/* Scatter / Fling */}
          <button
            onClick={onScatter}
            title="Fling / Scatter Debris"
            className="px-2 py-1 text-xs font-sketch font-bold bg-[#FEF08A] hover:bg-[#FDE047] active:bg-[#EAB308] border-[1.8px] border-black rounded transition-all hidden sm:flex items-center"
          >
            <span>🌀 Scatter</span>
          </button>

          {/* Recall / Reset */}
          <button
            onClick={onResetPositions}
            title="Reset Elements to Grid Formation"
            className="px-2 py-1 text-xs font-sketch font-bold bg-[#93C5FD] hover:bg-[#60A5FA] border-[1.8px] border-black rounded transition-all hidden sm:flex items-center"
          >
            <span>🎯 Recall</span>
          </button>

          {/* Ambient Synth Sound */}
          <button
            onClick={toggleSound}
            title="Ambient Tape Synth Audio"
            className={`px-2 py-1 text-xs font-sketch font-bold border-[1.8px] border-black rounded transition-all flex items-center space-x-1 ${
              audioPlaying ? 'bg-[#FF3B30] text-white animate-pulse' : 'bg-[#F1F5F9] text-black'
            }`}
          >
            <span>{audioPlaying ? '🔊 OST: ON' : '🔈 Sound'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
