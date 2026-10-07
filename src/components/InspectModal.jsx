import React, { useState, useEffect } from 'react';
import { driftAudio } from '../utils/audioSynth';

export default function InspectModal({ project, onClose, onRunFromModal }) {
  const [activeTab, setActiveTab] = useState('code');
  const [copied, setCopied] = useState(false);
  const [logLines, setLogLines] = useState(project.logs || []);

  useEffect(() => {
    // Stream extra logs periodically for immersion
    const interval = setInterval(() => {
      setLogLines((prev) => [
        ...prev.slice(-6),
        `[DRIFT_TICK] Curvature: ${(Math.random() * 0.4 + 0.8).toFixed(3)} | Quantum sync: OK`
      ]);
    }, 3500);
    return () => clearInterval(interval);
  }, [project]);

  const handleCopy = () => {
    if (project.code) {
      navigator.clipboard.writeText(project.code);
      setCopied(true);
      driftAudio.playBlip(720, 'triangle', 0.1);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-[#FFFDF7] border-[3.5px] border-black rounded-[8px] shadow-[8px_10px_0px_#000000] overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="bg-[#E2E8F0] border-b-[3px] border-black px-4 py-2 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#FF3B30] border-[1.5px] border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#FFD026] border-[1.5px] border-black inline-block" />
            <span className="w-3.5 h-3.5 rounded-full bg-[#00CC99] border-[1.5px] border-black inline-block" />
            <span className="font-mono font-bold text-xs md:text-sm text-[#0D0F12] ml-2">
              inspect://{project.id}.cpp
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 bg-white hover:bg-[#FF3B30] hover:text-white border-[2px] border-black rounded font-bold text-xs flex items-center justify-center transition-colors shadow-[1.5px_2px_0px_#000]"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b-[2.5px] border-black bg-[#F8FAFC] px-4 pt-2 space-x-2 select-none">
          <button
            onClick={() => { setActiveTab('code'); driftAudio.playBlip(); }}
            className={`px-3 py-1 font-sketch font-bold text-sm border-t-[2px] border-x-[2px] border-black rounded-t-sm transition-colors ${
              activeTab === 'code' ? 'bg-[#FFFDF7] -mb-[2.5px] pb-1.5' : 'bg-[#E2E8F0] text-[#64748B]'
            }`}
          >
            Source Code 📄
          </button>
          <button
            onClick={() => { setActiveTab('logs'); driftAudio.playBlip(); }}
            className={`px-3 py-1 font-sketch font-bold text-sm border-t-[2px] border-x-[2px] border-black rounded-t-sm transition-colors ${
              activeTab === 'logs' ? 'bg-[#FFFDF7] -mb-[2.5px] pb-1.5' : 'bg-[#E2E8F0] text-[#64748B]'
            }`}
          >
            Console Telemetry 📡
          </button>
          <button
            onClick={() => { setActiveTab('details'); driftAudio.playBlip(); }}
            className={`px-3 py-1 font-sketch font-bold text-sm border-t-[2px] border-x-[2px] border-black rounded-t-sm transition-colors ${
              activeTab === 'details' ? 'bg-[#FFFDF7] -mb-[2.5px] pb-1.5' : 'bg-[#E2E8F0] text-[#64748B]'
            }`}
          >
            Architecture 📐
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs sm:text-sm">
          {activeTab === 'code' && (
            <div className="relative">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-black/10">
                <span className="font-sketch font-bold text-sm text-[#475569]">
                  Tag: <span className="text-[#0D0F12] bg-[#FEF08A] px-1.5 py-0.5 rounded border border-black/40">{project.tag}</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="sketch-btn py-1 px-3 bg-white hover:bg-[#FEF08A] text-xs font-sketch font-bold"
                >
                  {copied ? 'Copied to Clipboard! ✓' : 'Copy Code 📋'}
                </button>
              </div>

              <pre className="bg-[#0D0F12] text-[#38BDF8] p-3.5 rounded-[5px] border-[2px] border-black overflow-x-auto leading-relaxed shadow-inner">
                <code>{project.code}</code>
              </pre>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="bg-[#0D0F12] text-[#00CC99] p-3.5 rounded-[5px] border-[2px] border-black min-h-[220px] flex flex-col justify-end space-y-1.5">
              <div className="text-[#94A3B8] text-xs border-b border-white/20 pb-1 mb-2">
                -- LIVE TELEMETRY LOG BUFFER [CONNECTED] --
              </div>
              {logLines.map((log, i) => (
                <div key={i} className="font-mono text-xs leading-normal">
                  <span className="text-[#FACC15] mr-1.5">{'>'}</span>
                  {log}
                </div>
              ))}
              <div className="animate-pulse text-[#38BDF8] font-bold text-xs mt-2">
                _ Awaiting next dimensional packet...
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-3 font-sans text-[#1E293B]">
              <div className="bg-[#FEF9C3] border-[2px] border-black p-3 rounded shadow-[2px_3px_0px_#000]">
                <h4 className="font-sketch font-bold text-base text-[#0D0F12] mb-1">
                  System Specifications
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed font-sketch text-[#334155]">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-2.5 bg-[#F1F5F9] border-[1.8px] border-black rounded">
                  <span className="font-sketch font-bold text-xs text-[#64748B] block">Paradigm</span>
                  <span className="font-sketch font-bold text-sm text-[#0D0F12]">Lock-free / Zero Overhead</span>
                </div>
                <div className="p-2.5 bg-[#F1F5F9] border-[1.8px] border-black rounded">
                  <span className="font-sketch font-bold text-xs text-[#64748B] block">Dimension Target</span>
                  <span className="font-sketch font-bold text-sm text-[#0D0F12]">DIM-404 / Sonny Boy Drift</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F8FAFC] border-t-[2.5px] border-black px-4 py-3 flex items-center justify-between select-none">
          <span className="font-sketch font-medium text-xs text-[#64748B]">
            Esc or click outside to dismiss
          </span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="sketch-btn py-1.5 px-3 bg-white hover:bg-[#F1F5F9] text-xs font-sketch font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onRunFromModal) onRunFromModal(project);
              }}
              className="sketch-btn py-1.5 px-4 bg-[#FFD026] hover:bg-[#FACC15] text-xs font-sketch font-bold"
            >
              Execute Run ⚡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
