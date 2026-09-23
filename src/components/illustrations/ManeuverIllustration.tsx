import React, { useState } from 'react';

export const ManeuverIllustration: React.FC = () => {
  const [burnDeltaV, setBurnDeltaV] = useState<number>(0.6); // m/s

  // Compute along-track displacement: roughly 3 * deltaV * dt
  const missDistanceM = Math.round(112 + burnDeltaV * 2400);
  const isSafe = missDistanceM >= 1000;

  return (
    <div className="border border-neutral-800 bg-obsidian-950 rounded-xl p-5 my-6 font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
        <span className="text-amber-400 font-semibold tracking-wide">
          MECHANISM 03 • ALONG-TRACK PHASING MANEUVER
        </span>
        <span className="text-neutral-500">KEPLERIAN ORBIT DEFLECTION</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Dynamic Diagram */}
        <div className="h-64 border border-neutral-900 rounded-lg bg-[#020202] p-4 flex flex-col justify-between relative overflow-hidden">
          <svg viewBox="0 0 340 180" className="w-full h-auto">
            {/* Original Nominal Orbit Arc */}
            <path d="M 20 140 Q 170 50 320 40" stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <text x="25" y="155" fill="#71717a" fontSize="7">NOMINAL ORBIT</text>

            {/* Perturbed Orbit Arc (Amber) */}
            <path
              d={`M 20 140 Q 170 ${50 - burnDeltaV * 25} 320 ${40 - burnDeltaV * 30}`}
              stroke="#f59e0b"
              strokeWidth="1.5"
              fill="none"
            />
            <text x="210" y={30 - burnDeltaV * 20} fill="#f59e0b" fontSize="7">
              DEFLECTED TRAJECTORY (Δv = {burnDeltaV.toFixed(2)} m/s)
            </text>

            {/* Burn Ignition Point */}
            <g transform="translate(60, 118)">
              <circle cx="0" cy="0" r="4" fill="#fafafa" />
              <line x1="0" y1="0" x2="24" y2="-12" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
              <text x="-35" y="-10" fill="#fafafa" fontSize="7.5">THRUST IMPULSE Δv</text>
            </g>

            {/* Intersecting Debris Track (Rose) */}
            <line x1="220" y1="10" x2="220" y2="170" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 2" />
            <text x="228" y="20" fill="#ef4444" fontSize="7">DEBRIS TRACK</text>

            {/* Conjunction Point & Clearance Caliper */}
            <g transform="translate(220, 60)">
              {/* Covariance Ellipse */}
              <ellipse cx="0" cy="0" rx="14" ry="24" stroke="#ef4444" strokeWidth="0.8" fill="#ef4444" fillOpacity="0.1" strokeDasharray="2 2" />
              
              {/* Deflected Satellite Position */}
              <circle cx="0" cy={-burnDeltaV * 28} r="4" fill={isSafe ? '#10b981' : '#f59e0b'} />
              
              {/* Caliper between debris center and satellite */}
              <line x1="18" y1="0" x2="18" y2={-burnDeltaV * 28} stroke={isSafe ? '#10b981' : '#f59e0b'} strokeWidth="1" />
              <text x="24" y={-burnDeltaV * 14} fill={isSafe ? '#10b981' : '#f59e0b'} fontSize="8" fontWeight="bold">
                {missDistanceM} M
              </text>
            </g>
          </svg>

          <div className="flex justify-between items-center text-[10px] text-neutral-400">
            <span>BURN TIMING: 36H PRIOR TO TCA</span>
            <span className={isSafe ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {isSafe ? '✓ SAFETY MARGIN CLEARED (>1,000 M)' : '⚠️ HAZARD THRESHOLD NOT CLEARED'}
            </span>
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-neutral-400">Along-Track Thrust Impulse (Δv):</span>
              <span className="text-amber-400 font-bold">{burnDeltaV.toFixed(2)} m/s</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.5"
              step="0.05"
              value={burnDeltaV}
              onChange={(e) => setBurnDeltaV(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-600 mt-1">
              <span>0.0 m/s (Passive)</span>
              <span>0.75 m/s</span>
              <span>1.50 m/s (Standard PDAM)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="border border-neutral-900 bg-[#020202] p-2.5 rounded">
              <span className="text-neutral-500 block">NOMINAL MISS</span>
              <span className="text-neutral-200 font-bold">112 meters</span>
            </div>
            <div className="border border-neutral-900 bg-[#020202] p-2.5 rounded">
              <span className="text-neutral-500 block">POST-BURN MISS</span>
              <span className={`font-bold ${isSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
                {missDistanceM} meters
              </span>
            </div>
            <div className="border border-neutral-900 bg-[#020202] p-2.5 rounded">
              <span className="text-neutral-500 block">HYDRAZINE FUEL MASS</span>
              <span className="text-neutral-200 font-bold">~{(0.15 + burnDeltaV * 0.42).toFixed(2)} kg</span>
            </div>
            <div className="border border-neutral-900 bg-[#020202] p-2.5 rounded">
              <span className="text-neutral-500 block">RISK MITIGATION</span>
              <span className={`font-bold ${isSafe ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isSafe ? '99.8% Reduced' : 'Partial'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
            By shifting orbital semi-major axis by just tens of meters, Keplerian orbital period changes compound over 24 orbits into a kilometer-scale miss distance at the encounter node.
          </p>
        </div>
      </div>
    </div>
  );
};
