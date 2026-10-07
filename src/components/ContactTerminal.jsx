import React, { useState } from 'react';
import { driftAudio } from '../utils/audioSynth';

export default function ContactTerminal({ onSignalSent }) {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [transmitting, setTransmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!userName.trim() && !message.trim()) return;

    setTransmitting(true);
    driftAudio.playTransmission();

    setTimeout(() => {
      setTransmitting(false);
      setSentSuccess(true);
      if (onSignalSent) onSignalSent({ userName, message });

      // Automatically fallback to user's real email client if desired
      setTimeout(() => {
        const mailto = `mailto:rehanbcon0974@jecrcu.edu.in?subject=Drift Signal from ${encodeURIComponent(userName || 'Anonymous')}&body=${encodeURIComponent(message)}`;
        window.location.href = mailto;
      }, 900);

      setTimeout(() => {
        setSentSuccess(false);
        setUserName('');
        setMessage('');
      }, 5000);
    }, 1200);
  };

  return (
    <div className="w-[260px] sm:w-[280px] bg-[#FFFDF7] border-[3.2px] border-black rounded-[8px] shadow-[6px_7px_0px_#000000] p-3.5 select-none relative">
      {/* Top Tape Accent */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#FEF08A]/80 border-[1.5px] border-black/40 rotate-1 rounded-sm shadow-sm pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-2 pb-1 border-b-[2px] border-black/20">
        <h3 className="font-title text-base sm:text-lg tracking-tight text-[#0D0F12]">
          Contact
        </h3>
        <span className="font-sketch font-bold text-[11px] px-2 py-0.5 bg-[#E2E8F0] border-[1.8px] border-black rounded-sm">
          SIGNAL_CH: 01
        </span>
      </div>

      <form onSubmit={handleTransmit} className="space-y-2.5">
        {/* User ID / Name field */}
        <div>
          <label className="block font-sketch font-bold text-xs text-[#1E293B] mb-0.5">
            User ID / Name
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Nagara / Visitor"
            className="w-full px-2.5 py-1 text-xs font-mono bg-white border-[2.2px] border-black rounded-[4px] shadow-[2px_2.5px_0px_#000000] focus:outline-none focus:bg-[#FEF9C3]"
          />
        </div>

        {/* Signal Transmitter / Message */}
        <div>
          <label className="block font-sketch font-bold text-xs text-[#1E293B] mb-0.5">
            Signal Transmitter
          </label>
          <textarea
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Transmitting signal through the void..."
            className="w-full px-2.5 py-1.5 text-xs font-mono bg-white border-[2.2px] border-black rounded-[4px] shadow-[2px_2.5px_0px_#000000] focus:outline-none focus:bg-[#FEF9C3] resize-none"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={transmitting}
          className={`w-full py-1.5 px-3 sketch-btn font-sketch font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-all ${
            sentSuccess 
              ? 'bg-[#00CC99] text-black' 
              : transmitting 
                ? 'bg-[#FEF08A] text-black animate-pulse' 
                : 'bg-[#FF3B30] text-white hover:bg-[#E11D48]'
          }`}
        >
          {sentSuccess ? (
            <span>Signal Broadcasted! ✓</span>
          ) : transmitting ? (
            <span>Transmitting Packets...</span>
          ) : (
            <span>Transmit Signal 📡</span>
          )}
        </button>
      </form>

      {/* Floating Social Pins */}
      <div className="mt-3 pt-2 border-t-[1.8px] border-black/15 flex items-center justify-between text-xs font-sketch font-bold">
        <a
          href="https://github.com/Rehan-UNI01"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-0.5 bg-white border-[1.8px] border-black rounded shadow-[2px_2px_0px_#000] hover:bg-[#FEF08A] hover:translate-y-[-1px] transition-all"
        >
          GitHub 🎋
        </a>
        <a
          href="https://www.linkedin.com/in/mohammad-rehan-83aa21302/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-0.5 bg-white border-[1.8px] border-black rounded shadow-[2px_2px_0px_#000] hover:bg-[#93C5FD] hover:translate-y-[-1px] transition-all"
        >
          LinkedIn 💼
        </a>
        <a
          href="mailto:rehanbcon0974@jecrcu.edu.in"
          className="px-2 py-0.5 bg-white border-[1.8px] border-black rounded shadow-[2px_2px_0px_#000] hover:bg-[#86EFAC] hover:translate-y-[-1px] transition-all"
        >
          Email ✉️
        </a>
      </div>
    </div>
  );
}
