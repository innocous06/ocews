import React from 'react';

interface BreakupPhysicsIllustrationProps {
  theme?: 'light' | 'dark';
}

export const BreakupPhysicsIllustration: React.FC<BreakupPhysicsIllustrationProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const textColor = isLight ? '#18181b' : '#fafafa';
  const strokeColor = isLight ? '#71717a' : '#52525b';
  const mutedText = isLight ? '#52525b' : '#71717a';
  const amberColor = isLight ? '#d97706' : '#f59e0b';
  const amberBright = isLight ? '#b45309' : '#fbbf24';

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-obsidian-950 rounded-xl p-5 sm:p-6 my-6 font-mono text-xs select-none shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5 mb-5">
        <span className="text-amber-600 dark:text-amber-400 font-bold tracking-wide uppercase text-[11px]">
          FORMULATION 02 • NASA STANDARD BREAKUP PHYSICS
        </span>
        <span className="text-neutral-500 text-[11px]">NASA-NSS-1740.14 CRITERIA</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Math & Criteria */}
        <div className="space-y-3">
          <div className="border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-[#020202] p-3.5 rounded-lg">
            <div className="text-[10px] text-neutral-500 mb-1 tracking-wider uppercase">01. RELATIVE KINETIC ENERGY</div>
            <div className="text-sm font-serif text-neutral-900 dark:text-neutral-100">
              E_kin = ½ · [ (m₁ · m₂) / (m₁ + m₂) ] · v_rel²
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-serif mt-1 leading-relaxed">
              Reduced-mass kinetic energy at relative orbital hypervelocities (10–14 km/s in typical LEO cross-orbit encounters).
            </p>
          </div>

          <div className="border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 rounded-lg">
            <div className="text-[10px] text-amber-700 dark:text-amber-400 mb-1 font-bold tracking-wider uppercase">
              02. NASA CATASTROPHIC BREAKUP CRITERION
            </div>
            <div className="text-sm font-serif text-amber-700 dark:text-amber-300 font-medium">
              Specific Energy S = E_kin / M_total ≥ 40 J/g (40,000 J/kg)
            </div>
            <p className="text-[11px] text-neutral-700 dark:text-neutral-300 font-serif mt-1 leading-relaxed">
              When specific energy exceeds 40 J/g, target structure completely fragments into lethal shrapnel rather than localized cratering.
            </p>
          </div>

          <div className="border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-[#020202] p-3.5 rounded-lg">
            <div className="text-[10px] text-neutral-500 mb-1 tracking-wider uppercase">03. FRAGMENT GENERATION POWER-LAW</div>
            <div className="text-sm font-serif text-neutral-900 dark:text-neutral-100">
              N(d &gt; 10 cm) = 0.1 · (M_total)^0.75
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-serif mt-1 leading-relaxed">
              Empirical power-law predicting the count of trackable shrapnel fragments capable of secondary catastrophic satellite destruction.
            </p>
          </div>
        </div>

        {/* Minimal Vector Diagram */}
        <div className="h-64 border border-neutral-100 dark:border-neutral-900 rounded-lg bg-neutral-50 dark:bg-[#020202] p-4 flex flex-col justify-between">
          <div className="text-[10px] text-neutral-500 uppercase tracking-wider">
            ENERGY PARTITION & DISPERSION ENVELOPE
          </div>
          
          <svg viewBox="0 0 320 180" className="w-full h-auto">
            {/* Impact Center */}
            <circle cx="60" cy="90" r="12" fill={amberColor} fillOpacity="0.2" stroke={amberColor} strokeWidth="0.8" />
            <circle cx="60" cy="90" r="3" fill={textColor} />
            <text x="35" y="120" fill={amberColor} fontSize="8">S ≥ 40 J/g</text>

            {/* Dispersion Angles */}
            <line x1="60" y1="90" x2="280" y2="30" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="90" x2="280" y2="150" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Cone Spread Fill */}
            <polygon points="60,90 280,30 280,150" fill={amberColor} fillOpacity="0.04" />

            {/* Velocity Vectors */}
            <line x1="60" y1="90" x2="160" y2="65" stroke={textColor} strokeWidth="1.2" />
            <line x1="60" y1="90" x2="180" y2="90" stroke={amberColor} strokeWidth="1.2" />
            <line x1="60" y1="90" x2="150" y2="120" stroke={textColor} strokeWidth="1.2" />

            {/* Fragments */}
            <circle cx="210" cy="60" r="1.5" fill={textColor} />
            <circle cx="230" cy="85" r="2" fill={amberBright} />
            <circle cx="205" cy="115" r="1.2" fill={textColor} />
            <circle cx="250" cy="50" r="1.8" fill={amberColor} />
            <circle cx="265" cy="100" r="2.2" fill={textColor} />
            <circle cx="240" cy="130" r="1.5" fill={amberBright} />

            <text x="180" y="170" fill={mutedText} fontSize="7">EJECTION CONE (100–300 M/S ΔV)</text>
          </svg>

          <div className="text-[10px] text-neutral-500 text-right">
            USSF ASTRODYNAMICS SPECIFICATION
          </div>
        </div>
      </div>
    </div>
  );
};
