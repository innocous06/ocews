import React, { useState } from 'react';

export const BreakupPhysicsIllustration: React.FC = () => {
  const [specificEnergy, setSpecificEnergy] = useState<number>(65); // 5 to 120 J/g

  const isCatastrophic = specificEnergy >= 40; // NASA Breakup threshold: 40 J/g

  // Estimated fragments based on energy regime
  const estimatedFrags = isCatastrophic
    ? Math.round(500 + Math.pow(specificEnergy / 40, 2) * 12500)
    : Math.round((specificEnergy / 40) * 120);

  return (
    <div className="border border-neutral-200 bg-white rounded-xl p-5 sm:p-6 my-6 font-mono text-xs select-none shadow-sm">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5 mb-4">
        <span className="text-amber-700 font-bold tracking-wide uppercase text-[11px]">
          FORMULATION 02 • NASA STANDARD BREAKUP THRESHOLD
        </span>
        <span className="text-neutral-500 text-[10px]">DRAG SLIDER ACROSS 40 J/G THRESHOLD</span>
      </div>

      {/* Interactive Specific Energy Slider */}
      <div className="p-3.5 mb-5 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1.5">
        <div className="flex justify-between items-baseline">
          <span className="text-neutral-600 font-medium">SPECIFIC IMPACT ENERGY (S = E_kin / M_total):</span>
          <span className={`text-sm font-bold font-mono ${isCatastrophic ? 'text-rose-600' : 'text-neutral-700'}`}>
            {specificEnergy} Joules / gram
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="120"
          step="1"
          value={specificEnergy}
          onChange={(e) => setSpecificEnergy(parseInt(e.target.value))}
          className="w-full accent-amber-600 h-1 bg-neutral-200 rounded cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-500 pt-0.5">
          <span>5 J/g (Minor cratering)</span>
          <span className="font-bold text-amber-700">▲ 40 J/g NASA CRITICAL THRESHOLD</span>
          <span>120 J/g (Total vaporization)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Math & Regime Card */}
        <div className="space-y-3">
          <div className={`p-3.5 rounded-lg border transition-colors ${
            isCatastrophic
              ? 'bg-rose-50/70 border-rose-200 text-rose-950'
              : 'bg-neutral-50 border-neutral-200 text-neutral-800'
          }`}>
            <div className="text-[10px] tracking-wider uppercase font-bold mb-1">
              REGIME: {isCatastrophic ? '⚠️ CATASTROPHIC STRUCTURAL BREAKUP' : '✓ SUB-CATASTROPHIC (LOCALIZED CRATERING)'}
            </div>
            <div className="text-base font-serif font-bold">
              {isCatastrophic ? 'Total Spacecraft Shatter' : 'Localized Perforation Only'}
            </div>
            <p className="text-[11px] font-serif mt-1 leading-relaxed text-neutral-600">
              {isCatastrophic
                ? `Specific energy (${specificEnergy} J/g) exceeds the 40 J/g NASA break-up limit. Shockwaves shatter internal bulkheads into ~${estimatedFrags.toLocaleString()} lethal trackable fragments.`
                : `Specific energy (${specificEnergy} J/g) is below 40 J/g. The impact generates a localized puncture crater with only ~${estimatedFrags} localized dust ejecta.`}
            </p>
          </div>

          <div className="border border-neutral-100 bg-neutral-50 p-3 rounded-lg text-[11px]">
            <span className="text-neutral-500 block text-[10px] uppercase">NASA POWER-LAW ESTIMATION</span>
            <div className="text-sm font-serif text-neutral-900 mt-0.5">
              N(d &gt; 10 cm) = 0.1 · (M_total)^0.75
            </div>
            <span className="text-neutral-500 block mt-1 font-serif text-[10px]">
              Predicted fragments: <strong>~{estimatedFrags.toLocaleString()} pieces &gt; 10 cm</strong>
            </span>
          </div>
        </div>

        {/* Dynamic Vector Drawing: Localized vs Shatter */}
        <div className="h-64 border border-neutral-100 rounded-lg bg-neutral-50 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase">
            <span>PHYSICAL DISPERSION GEOMETRY</span>
            <span className={isCatastrophic ? 'text-rose-600 font-bold' : 'text-neutral-600'}>
              {isCatastrophic ? 'FULL DEBRIS CONE' : 'LOCALIZED EJECTA'}
            </span>
          </div>
          
          <svg viewBox="0 0 320 180" className="w-full h-auto">
            {isCatastrophic ? (
              // Catastrophic Regime: Expanding cone + shattered fragments
              <g>
                {/* Impact center */}
                <circle cx="60" cy="90" r="14" fill="#d97706" fillOpacity="0.25" stroke="#d97706" strokeWidth="1" />
                <circle cx="60" cy="90" r="3" fill="#18181b" />
                <text x="35" y="120" fill="#d97706" fontSize="8" fontWeight="bold">S ≥ 40 J/g</text>

                {/* Cone Spread Fill */}
                <polygon points="60,90 290,20 290,160" fill="#d97706" fillOpacity="0.08" />
                <line x1="60" y1="90" x2="290" y2="20" stroke="#d97706" strokeWidth="0.8" strokeDasharray="3 3" />
                <line x1="60" y1="90" x2="290" y2="160" stroke="#d97706" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Velocity vectors */}
                <line x1="60" y1="90" x2="160" y2="60" stroke="#18181b" strokeWidth="1.2" />
                <line x1="60" y1="90" x2="180" y2="90" stroke="#d97706" strokeWidth="1.5" />
                <line x1="60" y1="90" x2="150" y2="120" stroke="#18181b" strokeWidth="1.2" />

                {/* Dense shrapnel cloud */}
                <circle cx="190" cy="55" r="2" fill="#18181b" />
                <circle cx="210" cy="80" r="2.5" fill="#d97706" />
                <circle cx="185" cy="110" r="1.5" fill="#18181b" />
                <circle cx="240" cy="45" r="2" fill="#d97706" />
                <circle cx="255" cy="95" r="2.5" fill="#18181b" />
                <circle cx="230" cy="125" r="1.8" fill="#d97706" />
                <circle cx="275" cy="70" r="2" fill="#18181b" />
                <circle cx="280" cy="135" r="2.2" fill="#d97706" />

                <text x="180" y="172" fill="#71717a" fontSize="7">EJECTION CONE (&gt;100 M/S ΔV)</text>
              </g>
            ) : (
              // Sub-catastrophic Regime: Intact satellite with small dent
              <g>
                {/* Intact satellite bus */}
                <rect x="110" y="60" width="70" height="60" rx="3" fill="#ffffff" stroke="#18181b" strokeWidth="1.5" />
                <line x1="80" y1="90" x2="110" y2="90" stroke="#d97706" strokeWidth="1.5" />
                <line x1="180" y1="90" x2="210" y2="90" stroke="#d97706" strokeWidth="1.5" />
                <rect x="60" y="75" width="20" height="30" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />
                <rect x="210" y="75" width="20" height="30" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" />

                {/* Localized puncture crater */}
                <circle cx="110" cy="90" r="6" fill="#ef4444" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1" />
                <circle cx="110" cy="90" r="2" fill="#18181b" />

                {/* Minimal ejecta */}
                <circle cx="95" cy="80" r="1" fill="#71717a" />
                <circle cx="90" cy="95" r="1.2" fill="#71717a" />
                <circle cx="98" cy="105" r="1" fill="#71717a" />

                <text x="115" y="145" fill="#71717a" fontSize="8">INTACT BUS • LOCALIZED PERFORATION</text>
              </g>
            )}
          </svg>

          <div className="text-[10px] text-neutral-500 text-right">
            NASA-NSS-1740.14 ASTRODYNAMICS MODEL
          </div>
        </div>
      </div>
    </div>
  );
};
