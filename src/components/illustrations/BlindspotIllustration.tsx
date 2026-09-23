import React, { useState } from 'react';

export const BlindspotIllustration: React.FC = () => {
  const [altitudeKm, setAltitudeKm] = useState<number>(310);
  const [missDistanceM, setMissDistanceM] = useState<number>(45);

  // Compute collision probability based on miss distance
  const pcA = Math.max(1e-6, 0.008 * Math.exp(-missDistanceM / 65));
  const pcB = Math.max(1e-6, 0.0012 * Math.exp(-missDistanceM / 100));

  // Compute lifetime based on altitude
  const lifetimeMonthsA = altitudeKm < 350 ? Math.round(1.5 + (altitudeKm - 280) * 0.1) : Math.round(6 + (altitudeKm - 350) * 0.4);
  const lifetimeYearsB = altitudeKm < 450 ? 3 : altitudeKm < 600 ? 22 : Math.round(50 + (altitudeKm - 600) * 0.5);

  return (
    <div className="space-y-4 my-6 font-mono text-xs select-none">
      {/* Interactive Parameter Controls */}
      <div className="border border-neutral-200 bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
          <span className="text-amber-700 font-bold uppercase text-[11px]">
            INTERACTIVE SENSITIVITY CONTROLS
          </span>
          <span className="text-neutral-500 text-[10px]">
            TEST HOW MISS DISTANCE & ALTITUDE IMPACT PRIORITIZATION
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Miss Distance Slider */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">ENCOUNTER MISS DISTANCE:</span>
              <span className="text-neutral-900 font-bold">{missDistanceM} meters</span>
            </div>
            <input
              type="range"
              min="20"
              max="350"
              step="5"
              value={missDistanceM}
              onChange={(e) => setMissDistanceM(parseInt(e.target.value))}
              className="w-full accent-amber-600 h-1 bg-neutral-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>20 m (Direct graze)</span>
              <span>180 m</span>
              <span>350 m (Wide pass)</span>
            </div>
          </div>

          {/* Altitude Slider */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">ORBITAL SHELL ALTITUDE:</span>
              <span className="text-amber-700 font-bold">{altitudeKm} km</span>
            </div>
            <input
              type="range"
              min="280"
              max="850"
              step="10"
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(parseInt(e.target.value))}
              className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400">
              <span>280 km (VLEO)</span>
              <span>550 km (Constellation)</span>
              <span>850 km (Polar SSO)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Spread */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case A: The False Alarm */}
        <div className="border border-neutral-200 bg-white rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 mb-3">
              <span className="text-neutral-600 font-bold uppercase tracking-wider text-[11px]">
                CASE A • THE FALSE ALARM
              </span>
              <span className="text-[10px] text-neutral-600 flex items-center gap-1 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                LEGACY RANK #{missDistanceM < 100 ? '1' : '3'}
              </span>
            </div>

            <div className="text-base font-serif italic text-neutral-900 mb-2">
              Two 3U CubeSats (8 kg Total Mass)
            </div>

            {/* Visual Vector */}
            <div className="h-32 my-3 border border-neutral-100 rounded-lg bg-neutral-50 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                <path d="M 20 20 Q 150 90 280 110" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <text x="190" y="95" fill="#71717a" fontSize="7">ATMOSPHERIC RE-ENTRY</text>

                {/* CubeSat 1 */}
                <g transform="translate(110, 52)">
                  <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
                  <line x1="-12" y1="0" x2="-8" y2="0" stroke="#71717a" />
                  <line x1="8" y1="12" x2="12" y2="12" stroke="#71717a" />
                  <text x="-12" y="-12" fill="#71717a" fontSize="7">3U (4 KG)</text>
                </g>

                {/* CubeSat 2 */}
                <g transform={`translate(${110 + Math.min(80, missDistanceM * 0.4)}, 68)`}>
                  <rect x="-8" y="-8" width="16" height="16" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
                  <text x="12" y="14" fill="#71717a" fontSize="7">3U (4 KG)</text>
                </g>

                <line x1="118" y1="52" x2={110 + Math.min(80, missDistanceM * 0.4) - 8} y2="68" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="105" y="78" fill="#ef4444" fontSize="7">MISS: {missDistanceM} M</text>
              </svg>
            </div>

            {/* Dynamic Ledger */}
            <div className="divide-y divide-neutral-100 text-[11px] text-neutral-700">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Calculated P_c:</span>
                <span className="text-amber-700 font-bold">{pcA.toExponential(2)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Combined Mass:</span>
                <span className="text-neutral-900 font-medium">8 kg</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Predicted Shrapnel:</span>
                <span className="text-neutral-900 font-medium">~4 fragments (&gt;10cm)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Atmospheric Residence:</span>
                <span className="text-neutral-900 font-medium">
                  {lifetimeMonthsA < 12 ? `${lifetimeMonthsA} Months` : `~${Math.round(lifetimeMonthsA / 12)} Years`}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] text-neutral-600 font-serif leading-relaxed">
            <strong className="text-neutral-900 font-mono">LEGACY PARADOX:</strong> High probability alarms sound on CubeSats while total debris generation is close to zero.
          </div>
        </div>

        {/* Case B: The Buried Catastrophe */}
        <div className="border border-amber-300 bg-amber-50/40 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-amber-200 pb-2.5 mb-3">
              <span className="text-amber-800 font-bold uppercase tracking-wider text-[11px]">
                CASE B • THE BURIED CATASTROPHE
              </span>
              <span className="text-[10px] text-amber-800 flex items-center gap-1 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
                OCEWS RANK #1 CRITICAL
              </span>
            </div>

            <div className="text-base font-serif italic text-neutral-900 mb-2">
              9-Ton Zenit Rocket Body vs Satellite
            </div>

            {/* Visual Vector */}
            <div className="h-32 my-3 border border-amber-100 rounded-lg bg-white flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 300 120" className="w-full h-full">
                <line x1="20" y1="60" x2="280" y2="60" stroke="#a1a1aa" strokeWidth="0.8" />
                <text x="20" y="30" fill="#71717a" fontSize="7">{altitudeKm} KM CONGESTED SHELL</text>

                {/* Satellite */}
                <g transform="translate(100, 60)">
                  <rect x="-8" y="-5" width="16" height="10" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
                  <line x1="-16" y1="0" x2="-8" y2="0" stroke="#18181b" strokeWidth="0.8" />
                  <line x1="8" y1="0" x2="16" y2="0" stroke="#18181b" strokeWidth="0.8" />
                </g>

                {/* SL-16 Rocket Body */}
                <g transform={`translate(${100 + Math.min(100, missDistanceM * 0.5)}, 60) rotate(-15)`}>
                  <rect x="-24" y="-8" width="48" height="16" rx="2" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
                  <line x1="-8" y1="-8" x2="-8" y2="8" stroke="#a1a1aa" />
                  <line x1="8" y1="-8" x2="8" y2="8" stroke="#a1a1aa" />
                  <polygon points="24,-8 30,-12 30,12 24,8" fill="none" stroke="#d97706" strokeWidth="0.8" />
                  <text x="-24" y="-12" fill="#d97706" fontSize="7.5" fontWeight="bold">SL-16 (9,000 KG)</text>
                </g>

                <line x1="108" y1="48" x2={100 + Math.min(100, missDistanceM * 0.5) - 24} y2="48" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" />
                <text x="115" y="42" fill="#d97706" fontSize="7">MISS: {missDistanceM} M</text>
              </svg>
            </div>

            {/* Dynamic Ledger */}
            <div className="divide-y divide-amber-100 text-[11px] text-neutral-700">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Calculated P_c:</span>
                <span className="text-neutral-700 font-semibold">{pcB.toExponential(2)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Combined Mass:</span>
                <span className="text-amber-800 font-bold">9,150 kg</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Predicted Shrapnel:</span>
                <span className="text-rose-600 font-bold">14,200+ lethal fragments</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">Orbital Residence:</span>
                <span className="text-rose-600 font-bold">~{lifetimeYearsB} Years (Long-Lived)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] text-amber-900 font-serif leading-relaxed">
            <strong className="text-amber-700 font-mono">OCEWS TRIAGE:</strong> Regardless of miss distance, 9 tons of hypervelocity mass generates a multi-generational cascade hazard.
          </div>
        </div>
      </div>
    </div>
  );
};
