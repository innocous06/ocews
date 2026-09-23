import React from 'react';

export const BreakupPhysicsIllustration: React.FC = () => {
  return (
    <div className="border border-neutral-800 bg-obsidian-950 rounded-xl p-5 my-6 font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4">
        <span className="text-amber-400 font-semibold tracking-wide">
          FORMULATION 02 • NASA STANDARD BREAKUP PHYSICS
        </span>
        <span className="text-neutral-500">NASA-NSS-1740.14 CRITERIA</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Math & Criteria */}
        <div className="space-y-4">
          <div className="border border-neutral-900 bg-[#020202] p-3.5 rounded-lg">
            <div className="text-[10px] text-neutral-500 mb-1">01. RELATIVE KINETIC ENERGY</div>
            <div className="text-sm font-serif text-neutral-200">
              E_kin = ½ · [ (m₁ · m₂) / (m₁ + m₂) ] · v_rel²
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Evaluates reduced mass energy at relative hypervelocity closing speeds (typically 10–14 km/s in cross-orbit encounters).
            </p>
          </div>

          <div className="border border-amber-900/40 bg-amber-950/20 p-3.5 rounded-lg">
            <div className="text-[10px] text-amber-500 mb-1 font-bold">02. NASA CATASTROPHIC BREAKUP CRITERION</div>
            <div className="text-sm font-serif text-amber-300">
              Specific Energy S = E_kin / M_total ≥ 40 J/g (40,000 J/kg)
            </div>
            <p className="text-[11px] text-neutral-300 font-sans mt-1">
              When specific energy exceeds 40 J/g, target structure shatters entirely into shrapnel rather than suffering localized perforation.
            </p>
          </div>

          <div className="border border-neutral-900 bg-[#020202] p-3.5 rounded-lg">
            <div className="text-[10px] text-neutral-500 mb-1">03. FRAGMENT GENERATION POWER-LAW</div>
            <div className="text-sm font-serif text-neutral-200">
              N(d &gt; 10 cm) = 0.1 · (M_total)^0.75
            </div>
            <p className="text-[11px] text-neutral-400 font-sans mt-1">
              Standard empirical model predicting the number of lethal fragments capable of catastrophic secondary satellite destruction.
            </p>
          </div>
        </div>

        {/* Minimal Vector Diagram */}
        <div className="h-64 border border-neutral-900 rounded-lg bg-[#020202] p-4 flex flex-col justify-between">
          <div className="text-[10px] text-neutral-500">ENERGY PARTITION & DISPERSION ENVELOPE</div>
          
          <svg viewBox="0 0 320 180" className="w-full h-auto">
            {/* Impact Center */}
            <circle cx="60" cy="90" r="12" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="0.8" />
            <circle cx="60" cy="90" r="3" fill="#fafafa" />
            <text x="35" y="120" fill="#f59e0b" fontSize="8">S ≥ 40 J/g</text>

            {/* Dispersion Angles */}
            <line x1="60" y1="90" x2="280" y2="30" stroke="#52525b" strokeWidth="0.8" strokeDasharray="3 3" />
            <line x1="60" y1="90" x2="280" y2="150" stroke="#52525b" strokeWidth="0.8" strokeDasharray="3 3" />
            
            {/* Cone Spread Fill */}
            <polygon points="60,90 280,30 280,150" fill="#f59e0b" fillOpacity="0.04" />

            {/* Velocity Vectors */}
            <line x1="60" y1="90" x2="160" y2="65" stroke="#fafafa" strokeWidth="1.2" />
            <line x1="60" y1="90" x2="180" y2="90" stroke="#f59e0b" strokeWidth="1.2" />
            <line x1="60" y1="90" x2="150" y2="120" stroke="#fafafa" strokeWidth="1.2" />

            {/* Fragments */}
            <circle cx="210" cy="60" r="1.5" fill="#fafafa" />
            <circle cx="230" cy="85" r="2" fill="#fbbf24" />
            <circle cx="205" cy="115" r="1.2" fill="#fafafa" />
            <circle cx="250" cy="50" r="1.8" fill="#f59e0b" />
            <circle cx="265" cy="100" r="2.2" fill="#fafafa" />
            <circle cx="240" cy="130" r="1.5" fill="#fbbf24" />

            <text x="180" y="170" fill="#71717a" fontSize="7">EJECTION CONE (100–300 M/S ΔV)</text>
          </svg>

          <div className="text-[10px] text-neutral-400 text-right">
            USSF ASTRODYNAMICS SPECIFICATION
          </div>
        </div>
      </div>
    </div>
  );
};
