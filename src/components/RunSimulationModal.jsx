import React, { useState, useEffect } from 'react';
import { driftAudio } from '../utils/audioSynth';

export default function RunSimulationModal({ project, onClose }) {
  const [running, setRunning] = useState(true);
  const [compassAngle, setCompassAngle] = useState(45);
  const [packetsSent, setPacketsSent] = useState(0);

  useEffect(() => {
    driftAudio.playBlip(680, 'sine', 0.15);
    const interval = setInterval(() => {
      setCompassAngle((prev) => (prev + 28) % 360);
      setPacketsSent((prev) => prev + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg bg-[#FFFDF7] border-[3.5px] border-black rounded-[8px] shadow-[8px_10px_0px_#000000] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FEF08A] border-b-[3px] border-black px-4 py-2 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF3B30] border border-black inline-block animate-ping" />
            <span className="font-title text-sm md:text-base text-[#0D0F12]">
              RUNNING // {project.title.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white hover:bg-[#FF3B30] hover:text-white border-[2px] border-black rounded font-bold text-xs flex items-center justify-center transition-colors shadow-[1.5px_2px_0px_#000]"
          >
            ✕
          </button>
        </div>

        {/* Live Simulation Display */}
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          {project.type === 'compass' ? (
            <div className="flex flex-col items-center">
              <div 
                className="w-40 h-40 rounded-full border-[3.5px] border-black bg-[#00A3FF] shadow-[4px_5px_0px_#000] relative flex items-center justify-center transition-transform duration-300"
              >
                <div 
                  className="w-full h-full relative flex items-center justify-center transition-transform duration-300"
                  style={{ transform: `rotate(${compassAngle}deg)` }}
                >
                  <div className="w-2.5 h-20 bg-[#FF3B30] border border-black rounded-t -mt-10" />
                  <div className="w-2.5 h-20 bg-[#1E293B] border border-black rounded-b -mb-10" />
                  <div className="absolute w-5 h-5 rounded-full bg-[#FFD026] border-2 border-black" />
                </div>
              </div>
              <div className="mt-4 font-mono text-center">
                <p className="font-bold text-base text-[#0D0F12]">BEARING: {compassAngle}° NORTH-BY-DRIFT</p>
                <p className="text-xs text-[#0084FF]">LAT: 26.9124° N | LON: 75.7873° E (JAIPUR)</p>
              </div>
            </div>
          ) : (
            <div className="w-full bg-[#0D0F12] border-[2.5px] border-black rounded-[6px] p-4 text-[#00CC99] font-mono text-xs shadow-inner space-y-2">
              <div className="flex justify-between border-b border-white/20 pb-1">
                <span>SIMULATION ACTIVE</span>
                <span className="text-[#FFD026]">PACKETS DISPATCHED: {packetsSent}</span>
              </div>
              <p className="text-[#38BDF8]">[DISPATCH] Dimension_Packet #{1000 + packetsSent} -&gt; Routing through subnet</p>
              <p>[ACK] 0.12ms round-trip latency verified</p>
              <p className="text-[#FACC15]">[STATUS] Zero packets dropped. Zero-G channel intact.</p>
            </div>
          )}

          <p className="font-sketch font-bold text-sm text-[#475569] text-center">
            Interactive runtime executing inside Sonny Boy anti-gravity container.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-[#F8FAFC] border-t-[2.5px] border-black px-4 py-2.5 flex justify-end">
          <button
            onClick={onClose}
            className="sketch-btn py-1.5 px-4 bg-[#FFD026] text-xs font-sketch font-bold"
          >
            Halt Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
