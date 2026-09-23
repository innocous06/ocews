import React, { useState } from 'react';

export const ManeuverIllustration: React.FC = () => {
  const [burnDeltaV, setBurnDeltaV] = useState<number>(0.6); // m/s
  const [leadTimeHours, setLeadTimeHours] = useState<number>(36); // 12 to 48 hours

  // Keplerian orbital phasing: miss distance increases with deltaV and lead time
  // Delta_s ~ 3 * delta_v * dt (in seconds)
  const missDistanceM = Math.round(112 + burnDeltaV * (leadTimeHours / 36) * 2400);
  const isSafe = missDistanceM >= 1000;
  const fuelCostKg = (0.12 + burnDeltaV * 0.38).toFixed(2);

  return (
    <div className="border border-neutral-200 bg-white rounded-xl p-5 sm:p-6 my-6 font-mono text-xs select-none shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 mb-4">
        <span className="text-amber-700 font-bold tracking-wide uppercase text-[11px]">
          MECHANISM 03 • ALONG-TRACK PHASING & TIMING DYNAMICS
        </span>
        <span className="text-neutral-500 text-[10px]">KEPLERIAN ORBIT DEFLECTION</span>
      </div>

      {/* Two Parameter Sliders: Delta-V and Lead Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 mb-4 border-b border-neutral-100 text-[11px]">
        {/* Delta-V Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">THRUST IMPULSE (Δv):</span>
            <span className="text-amber-700 font-bold">{burnDeltaV.toFixed(2)} m/s</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.5"
            step="0.05"
            value={burnDeltaV}
            onChange={(e) => setBurnDeltaV(parseFloat(e.target.value))}
            className="w-full accent-amber-600 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>0.0 m/s (Passive)</span>
            <span>0.75 m/s</span>
            <span>1.50 m/s (Standard PDAM)</span>
          </div>
        </div>

        {/* Lead Time Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">BURN LEAD TIME BEFORE TCA:</span>
            <span className="text-neutral-900 font-bold">{leadTimeHours} hours</span>
          </div>
          <input
            type="range"
            min="12"
            max="48"
            step="6"
            value={leadTimeHours}
            onChange={(e) => setLeadTimeHours(parseInt(e.target.value))}
            className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>12h (Late burn - needs more Δv)</span>
            <span>30h</span>
            <span>48h (Optimal phasing)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Dynamic Diagram */}
        <div className="h-64 border border-neutral-100 rounded-lg bg-neutral-50 p-4 flex flex-col justify-between relative overflow-hidden">
          <svg viewBox="0 0 340 180" className="w-full h-auto">
            {/* Original Nominal Orbit Arc */}
            <path d="M 20 140 Q 170 50 320 40" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <text x="25" y="155" fill="#71717a" fontSize="7">NOMINAL ORBIT</text>

            {/* Perturbed Orbit Arc (Amber) */}
            <path
              d={`M 20 140 Q 170 ${50 - burnDeltaV * 25 * (leadTimeHours / 36)} 320 ${40 - burnDeltaV * 30 * (leadTimeHours / 36)}`}
              stroke="#d97706"
              strokeWidth="1.6"
              fill="none"
            />
            <text x="180" y={Math.max(15, 30 - burnDeltaV * 20 * (leadTimeHours / 36))} fill="#d97706" fontSize="7">
              DEFLECTED TRAJECTORY (Δv = {burnDeltaV.toFixed(2)} m/s @ T-{leadTimeHours}h)
            </text>

            {/* Burn Ignition Point */}
            <g transform="translate(60, 118)">
              <circle cx="0" cy="0" r="3.5" fill="#18181b" />
              <line x1="0" y1="0" x2="24" y2="-12" stroke="#d97706" strokeWidth="1.5" />
              <text x="-35" y="-10" fill="#18181b" fontSize="7.5">THRUST IMPULSE Δv</text>
            </g>

            {/* Intersecting Debris Track (Rose) */}
            <line x1="220" y1="10" x2="220" y2="170" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 2" />
            <text x="228" y="20" fill="#ef4444" fontSize="7">DEBRIS TRACK</text>

            {/* Conjunction Point & Clearance Caliper */}
            <g transform="translate(220, 60)">
              <ellipse cx="0" cy="0" rx="14" ry="24" stroke="#ef4444" strokeWidth="0.8" fill="#ef4444" fillOpacity="0.1" strokeDasharray="2 2" />
              
              <circle cx="0" cy={-burnDeltaV * 28 * (leadTimeHours / 36)} r="3.5" fill={isSafe ? '#10b981' : '#d97706'} />
              
              <line x1="18" y1="0" x2="18" y2={-burnDeltaV * 28 * (leadTimeHours / 36)} stroke={isSafe ? '#10b981' : '#d97706'} strokeWidth="1" />
              <text x="24" y={-burnDeltaV * 14 * (leadTimeHours / 36)} fill={isSafe ? '#10b981' : '#d97706'} fontSize="8" fontWeight="bold">
                {missDistanceM} M
              </text>
            </g>
          </svg>

          <div className="flex justify-between items-center text-[10px] text-neutral-500">
            <span>BURN LEAD: {leadTimeHours}H BEFORE TCA</span>
            <span className={isSafe ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
              {isSafe ? '✓ SAFETY MARGIN CLEARED (>1,000 M)' : '⚠️ HAZARD THRESHOLD NOT CLEARED'}
            </span>
          </div>
        </div>

        {/* Controls & Metrics */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="border border-neutral-100 bg-neutral-50 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px] uppercase">NOMINAL MISS</span>
              <span className="text-neutral-900 font-bold">112 meters</span>
            </div>
            <div className="border border-neutral-100 bg-neutral-50 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px] uppercase">POST-BURN MISS</span>
              <span className={`font-bold ${isSafe ? 'text-emerald-700' : 'text-amber-700'}`}>
                {missDistanceM.toLocaleString()} meters
              </span>
            </div>
            <div className="border border-neutral-100 bg-neutral-50 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px] uppercase">HYDRAZINE PROPELLANT</span>
              <span className="text-neutral-900 font-bold">~{fuelCostKg} kg</span>
            </div>
            <div className="border border-neutral-100 bg-neutral-50 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px] uppercase">RISK MITIGATION</span>
              <span className={`font-bold ${isSafe ? 'text-emerald-700' : 'text-amber-700'}`}>
                {isSafe ? '99.8% Reduced' : 'Partial'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-600 font-serif leading-relaxed">
            Astrodynamic insight: Performing a maneuver 48 hours early leverages Keplerian phasing so that a tiny 0.3 m/s burn produces a massive {Math.round(112 + 0.3 * (48 / 36) * 2400)} m displacement with minimal onboard fuel.
          </p>
        </div>
      </div>
    </div>
  );
};
