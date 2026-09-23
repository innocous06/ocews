import React from 'react';

interface BlindspotIllustrationProps {
  theme?: 'light' | 'dark';
}

export const BlindspotIllustration: React.FC<BlindspotIllustrationProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#18181b' : '#fafafa';
  const strokeColor = isLight ? '#71717a' : '#52525b';
  const mutedText = isLight ? '#52525b' : '#a1a1aa';
  const amberColor = isLight ? '#d97706' : '#f59e0b';
  const cardFill = isLight ? '#ffffff' : '#18181b';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 font-mono text-xs select-none">
      {/* Case A: The Benign False Alarm */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-obsidian-950 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm transition-colors duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5 mb-3">
            <span className="text-neutral-600 dark:text-neutral-400 font-bold uppercase tracking-wider text-[11px]">
              CASE A • THE FALSE ALARM
            </span>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              LEGACY RANK #1
            </span>
          </div>

          <div className="text-base font-serif italic text-neutral-900 dark:text-neutral-200 mb-2">
            Two 3U CubeSats in Decaying VLEO
          </div>

          {/* Clean Line Drawing */}
          <div className="h-32 my-3 border border-neutral-100 dark:border-neutral-900 rounded-lg bg-neutral-50 dark:bg-[#030303] flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              {/* Atmospheric decay arc */}
              <path d="M 20 20 Q 150 90 280 110" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <text x="190" y="95" fill={mutedText} fontSize="7">ATMOSPHERIC RE-ENTRY</text>

              {/* CubeSat 1 */}
              <g transform="translate(110, 52)">
                <rect x="-8" y="-8" width="16" height="16" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
                <line x1="-12" y1="0" x2="-8" y2="0" stroke={strokeColor} />
                <line x1="8" y1="12" x2="12" y2="12" stroke={strokeColor} />
                <text x="-12" y="-12" fill={mutedText} fontSize="7">3U (4 KG)</text>
              </g>

              {/* CubeSat 2 */}
              <g transform="translate(160, 68)">
                <rect x="-8" y="-8" width="16" height="16" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
                <text x="12" y="14" fill={mutedText} fontSize="7">3U (4 KG)</text>
              </g>

              {/* Proximity Caliper */}
              <line x1="118" y1="52" x2="152" y2="68" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
              <text x="105" y="78" fill="#ef4444" fontSize="7">MISS: 45 M</text>
            </svg>
          </div>

          {/* Clean Editorial Comparison Ledger */}
          <div className="divide-y divide-neutral-100 dark:divide-neutral-900 text-[11px] text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Collision Probability:</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">4.2 × 10⁻³ (High)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Combined Mass:</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">8 kg</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Predicted Shrapnel:</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">~4 fragments</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Orbital Residence:</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-medium">&lt; 90 days (Self-clears)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed">
          <strong className="text-neutral-900 dark:text-neutral-200 font-mono">OPERATIONAL IMPACT:</strong> Industry software sounds full alarm and wastes operator hours on an encounter that poses zero threat to long-term orbital sustainability.
        </div>
      </div>

      {/* Case B: The Buried Catastrophe */}
      <div className="border border-amber-300 dark:border-amber-900/60 bg-amber-50/30 dark:bg-obsidian-950 rounded-xl p-5 sm:p-6 flex flex-col justify-between shadow-sm transition-colors duration-200">
        <div>
          <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-2.5 mb-3">
            <span className="text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              CASE B • THE BURIED CATASTROPHE
            </span>
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 flex items-center gap-1 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              OCEWS RANK #1 CRITICAL
            </span>
          </div>

          <div className="text-base font-serif italic text-neutral-900 dark:text-neutral-200 mb-2">
            9-Ton Zenit Rocket Body vs Satellite
          </div>

          {/* Clean Line Drawing */}
          <div className="h-32 my-3 border border-amber-100 dark:border-neutral-900 rounded-lg bg-neutral-50 dark:bg-[#030303] flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              <line x1="20" y1="60" x2="280" y2="60" stroke={strokeColor} strokeWidth="0.8" />
              <text x="20" y="30" fill={mutedText} fontSize="7">842 KM SUN-SYNCHRONOUS CHOKE POINT</text>

              {/* Commercial Satellite */}
              <g transform="translate(100, 60)">
                <rect x="-8" y="-5" width="16" height="10" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
                <line x1="-16" y1="0" x2="-8" y2="0" stroke={textColor} strokeWidth="0.8" />
                <line x1="8" y1="0" x2="16" y2="0" stroke={textColor} strokeWidth="0.8" />
              </g>

              {/* Giant SL-16 Rocket Body */}
              <g transform="translate(180, 60) rotate(-15)">
                <rect x="-24" y="-8" width="48" height="16" rx="2" fill={cardFill} stroke={amberColor} strokeWidth="1.2" />
                <line x1="-8" y1="-8" x2="-8" y2="8" stroke={strokeColor} />
                <line x1="8" y1="-8" x2="8" y2="8" stroke={strokeColor} />
                <polygon points="24,-8 30,-12 30,12 24,8" fill="none" stroke={amberColor} strokeWidth="0.8" />
                <text x="-24" y="-12" fill={amberColor} fontSize="7.5" fontWeight="bold">SL-16 (9,000 KG)</text>
              </g>

              {/* Proximity Caliper */}
              <line x1="108" y1="48" x2="156" y2="48" stroke={amberColor} strokeWidth="1" strokeDasharray="2 2" />
              <text x="115" y="42" fill={amberColor} fontSize="7">MISS: 112 M</text>
            </svg>
          </div>

          {/* Clean Editorial Comparison Ledger */}
          <div className="divide-y divide-amber-100 dark:divide-neutral-900 text-[11px] text-neutral-700 dark:text-neutral-300">
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Collision Probability:</span>
              <span className="text-neutral-600 dark:text-neutral-400">3.8 × 10⁻⁴ (Buried at Rank #4)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Combined Mass:</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">9,150 kg</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Predicted Shrapnel:</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">14,200+ lethal fragments</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-neutral-500">Orbital Residence:</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">160+ Years (Kessler Threat)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200/90 font-serif leading-relaxed">
          <strong className="text-amber-700 dark:text-amber-400 font-mono">OCEWS RESOLUTION:</strong> A collision here risks making Sun-Synchronous polar orbits unusable for a century. OCEWS elevates this to Priority 1.
        </div>
      </div>
    </div>
  );
};
