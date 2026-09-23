import React from 'react';

export const BlindspotIllustration: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 font-mono text-xs select-none">
      {/* Case A: The False Alarm */}
      <div className="border border-neutral-800 bg-obsidian-950 rounded-xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
            <span className="text-neutral-400 font-bold">CASE A • THE FALSE ALARM</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
              TRADITIONAL RANK #1
            </span>
          </div>

          <div className="text-sm font-serif italic text-neutral-200 mb-2">
            Two 3U Research CubeSats in Decaying VLEO
          </div>

          {/* Minimal Vector Drawing: CubeSats */}
          <div className="h-32 my-3 border border-neutral-900 rounded bg-[#030303] flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              {/* Atmospheric decay arc */}
              <path d="M 20 20 Q 150 90 280 110" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <text x="210" y="95" fill="#71717a" fontSize="7">ATMOSPHERIC DRAG DECAY</text>

              {/* CubeSat 1 */}
              <g transform="translate(110, 52)">
                <rect x="-8" y="-8" width="16" height="16" fill="#18181b" stroke="#a1a1aa" strokeWidth="0.8" />
                <line x1="-12" y1="0" x2="-8" y2="0" stroke="#71717a" />
                <line x1="8" y1="12" x2="12" y2="12" stroke="#71717a" />
                <text x="-12" y="-12" fill="#a1a1aa" fontSize="7">3U (4 KG)</text>
              </g>

              {/* CubeSat 2 */}
              <g transform="translate(160, 68)">
                <rect x="-8" y="-8" width="16" height="16" fill="#18181b" stroke="#a1a1aa" strokeWidth="0.8" />
                <text x="12" y="14" fill="#a1a1aa" fontSize="7">3U (4 KG)</text>
              </g>

              {/* Proximity Caliper */}
              <line x1="118" y1="52" x2="152" y2="68" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
              <text x="105" y="78" fill="#ef4444" fontSize="7">MISS: 45 M</text>
            </svg>
          </div>

          <div className="space-y-1.5 text-[11px] text-neutral-300">
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Collision Probability:</span>
              <span className="text-amber-400 font-bold">4.2 × 10⁻³ (Extremely High)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Combined Mass:</span>
              <span>8 kg (Negligible)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Generated Shrapnel:</span>
              <span>~4 fragments</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Orbital Lifetime:</span>
              <span>&lt; 90 days (Naturally re-enters)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-sans leading-relaxed">
          <strong className="text-neutral-200">The Problem:</strong> Industry tools sound full alarms and force operator overtime on a benign event that poses zero threat to long-term orbital safety.
        </div>
      </div>

      {/* Case B: The Buried Catastrophe */}
      <div className="border border-amber-900/60 bg-obsidian-950 rounded-xl p-5 flex flex-col justify-between relative">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-2 mb-3">
            <span className="text-amber-400 font-bold">CASE B • THE BURIED CATASTROPHE</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/80">
              OCEWS RANK #1 CRITICAL
            </span>
          </div>

          <div className="text-sm font-serif italic text-neutral-200 mb-2">
            9-Ton Zenit Rocket Body vs Commercial Constellation
          </div>

          {/* Minimal Vector Drawing: Zenit Rocket Body */}
          <div className="h-32 my-3 border border-neutral-900 rounded bg-[#030303] flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              {/* Polar SSO Orbit Track */}
              <line x1="20" y1="60" x2="280" y2="60" stroke="#3f3f46" strokeWidth="0.8" />
              <text x="20" y="30" fill="#71717a" fontSize="7">842 KM SUN-SYNCHRONOUS CHOKE POINT</text>

              {/* Commercial Satellite */}
              <g transform="translate(100, 60)">
                <rect x="-8" y="-5" width="16" height="10" fill="#18181b" stroke="#fafafa" strokeWidth="0.8" />
                <line x1="-16" y1="0" x2="-8" y2="0" stroke="#fafafa" strokeWidth="0.8" />
                <line x1="8" y1="0" x2="16" y2="0" stroke="#fafafa" strokeWidth="0.8" />
              </g>

              {/* Giant SL-16 Rocket Body */}
              <g transform="translate(180, 60) rotate(-15)">
                <rect x="-24" y="-8" width="48" height="16" rx="2" fill="#18181b" stroke="#f59e0b" strokeWidth="1" />
                <line x1="-8" y1="-8" x2="-8" y2="8" stroke="#71717a" />
                <line x1="8" y1="-8" x2="8" y2="8" stroke="#71717a" />
                <polygon points="24,-8 30,-12 30,12 24,8" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
                <text x="-24" y="-12" fill="#fbbf24" fontSize="7.5" fontWeight="bold">SL-16 (9,000 KG)</text>
              </g>

              {/* Close Pass Caliper */}
              <line x1="108" y1="48" x2="156" y2="48" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
              <text x="115" y="42" fill="#fbbf24" fontSize="7">MISS: 112 M</text>
            </svg>
          </div>

          <div className="space-y-1.5 text-[11px] text-neutral-300">
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Collision Probability:</span>
              <span className="text-neutral-300">3.8 × 10⁻⁴ (Buried at Rank #4)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Combined Mass:</span>
              <span className="text-amber-400 font-bold">9,150 kg (Catastrophic)</span>
            </div>
            <div className="flex justify-between border-b border-neutral-900 pb-1">
              <span className="text-neutral-500">Generated Shrapnel:</span>
              <span className="text-rose-400 font-bold">14,200+ lethal fragments</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Orbital Lifetime:</span>
              <span className="text-rose-400 font-bold">160+ Years (Kessler Cascade)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-900/40 text-[11px] text-amber-200/90 font-sans leading-relaxed">
          <strong className="text-amber-400">The OCEWS Breakthrough:</strong> We evaluate outcome severity. A single collision here closes access to polar Earth Observation for a century. We elevate this to Priority 1.
        </div>
      </div>
    </div>
  );
};
