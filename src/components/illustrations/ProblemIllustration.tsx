import React, { useState } from 'react';

export const ProblemIllustration: React.FC = () => {
  const [velocityKms, setVelocityKms] = useState<number>(14.2); // 4 to 16 km/s
  const [impactorMassKg, setImpactorMassKg] = useState<number>(9000); // 500 to 9000 kg

  // Kinetic energy calculation: E_k = 0.5 * mu * v^2
  const targetMassKg = 150; // Satellite mass
  const reducedMassKg = (targetMassKg * impactorMassKg) / (targetMassKg + impactorMassKg);
  const kineticEnergyGJ = parseFloat((0.5 * reducedMassKg * Math.pow(velocityKms * 1000, 2) / 1e9).toFixed(2));
  
  // Predicted fragments: N = 0.1 * M^0.75
  const predictedFrags = Math.round(1.2 * Math.pow(impactorMassKg + targetMassKg, 0.75));

  // Dynamic cone height based on velocity (higher velocity = wider dispersion)
  const coneHalfSpread = Math.min(95, 30 + (velocityKms / 16) * 60);

  // Generate dynamic fragments based on mass
  const fragCount = Math.min(32, Math.max(8, Math.round(impactorMassKg / 300)));
  const dynamicShrapnel = Array.from({ length: fragCount }, (_, i) => {
    const spreadFraction = ((i + 1) / (fragCount + 1)) * 2 - 1; // -1 to 1
    const x = 300 + (i * 11) % 320;
    const y = 120 + spreadFraction * (coneHalfSpread * 0.85);
    const r = i % 4 === 0 ? 2 : 1.2;
    return { x, y, r, isSecondary: i % 5 === 0 };
  });

  return (
    <div className="w-full border border-neutral-200 bg-white rounded-xl p-5 my-6 overflow-hidden select-none font-mono shadow-sm">
      <div className="flex items-center justify-between text-xs text-neutral-600 border-b border-neutral-200 pb-2.5 mb-4">
        <span className="text-amber-700 font-bold tracking-wide uppercase text-[11px]">
          DIAGRAM 01 • THE KESSLER CASCADE MECHANISM
        </span>
        <span className="text-neutral-500 text-[10px]">PARAMETRIC BREAKUP SIMULATION</span>
      </div>

      {/* Interactive Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 mb-4 border-b border-neutral-100 text-[11px]">
        {/* Velocity Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">RELATIVE IMPACT SPEED (v_rel):</span>
            <span className="text-amber-700 font-bold">{velocityKms.toFixed(1)} km/s</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="16.0"
            step="0.2"
            value={velocityKms}
            onChange={(e) => setVelocityKms(parseFloat(e.target.value))}
            className="w-full accent-amber-600 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>4.0 km/s (Co-planar)</span>
            <span>10.0 km/s</span>
            <span>16.0 km/s (Retrograde)</span>
          </div>
        </div>

        {/* Impactor Mass Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">DERELICT IMPACTER MASS:</span>
            <span className="text-neutral-800 font-bold">{impactorMassKg.toLocaleString()} kg</span>
          </div>
          <input
            type="range"
            min="500"
            max="9000"
            step="250"
            value={impactorMassKg}
            onChange={(e) => setImpactorMassKg(parseInt(e.target.value))}
            className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>500 kg (Small upper stage)</span>
            <span>4,500 kg</span>
            <span>9,000 kg (Zenit SL-16)</span>
          </div>
        </div>
      </div>

      {/* Reactive Output Metrics Bar */}
      <div className="grid grid-cols-3 gap-2 py-2 px-3 mb-4 bg-neutral-50 border border-neutral-200 rounded-lg text-center text-xs">
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase">KINETIC ENERGY</span>
          <span className="font-bold text-neutral-900">{kineticEnergyGJ} GJ</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase">LETHAL SHRAPNEL COUNT</span>
          <span className="font-bold text-amber-700">~{predictedFrags.toLocaleString()} frags</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase">CASCADE REGIME</span>
          <span className="font-bold text-rose-600">
            {kineticEnergyGJ > 8 ? 'CATASTROPHIC' : 'HYPERVELOCITY'}
          </span>
        </div>
      </div>

      {/* Dynamic SVG Vector Drawing */}
      <svg viewBox="0 0 700 240" className="w-full h-auto text-xs" fill="none">
        {/* Orbital trajectory lines */}
        <line x1="40" y1="80" x2="260" y2="120" stroke="#a1a1aa" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="260" y1="40" x2="260" y2="200" stroke="#d97706" strokeWidth="1.2" />

        {/* Target Payload */}
        <g transform="translate(140, 98)">
          <rect x="-6" y="-3" width="12" height="6" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
          <line x1="-10" y1="0" x2="-6" y2="0" stroke="#71717a" />
          <line x1="6" y1="0" x2="10" y2="0" stroke="#71717a" />
          <text x="-24" y="-8" fill="#71717a" fontSize="8">ACTIVE ASSET</text>
        </g>

        {/* Incoming Derelict Rocket Body */}
        <g transform="translate(260, 65)">
          <rect
            x={-Math.min(6, 2 + impactorMassKg / 2000)}
            y="-10"
            width={Math.min(12, 4 + impactorMassKg / 1000)}
            height="20"
            rx="1"
            fill="#ffffff"
            stroke="#d97706"
            strokeWidth="1"
          />
          <text x="12" y="2" fill="#d97706" fontSize="8" fontWeight="bold">
            DERELICT ({impactorMassKg.toLocaleString()} KG)
          </text>
          <line x1="0" y1="12" x2="0" y2="28" stroke="#d97706" strokeWidth="1" />
        </g>

        {/* Collision Point */}
        <g transform="translate(260, 120)">
          <circle cx="0" cy="0" r="18" stroke="#d97706" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r={Math.min(12, 4 + velocityKms / 2)} fill="#d97706" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="2.5" fill="#18181b" />
          <text x="-85" y="28" fill="#d97706" fontSize="8" fontWeight="bold">IMPACT: {kineticEnergyGJ} GJ</text>
          <text x="-85" y="38" fill="#71717a" fontSize="7.5">v_rel = {velocityKms} km/s</text>
        </g>

        {/* Dynamic Expanding Breakup Cone Envelope */}
        <path
          d={`M 260 120 L 640 ${120 - coneHalfSpread} L 640 ${120 + coneHalfSpread} Z`}
          fill="#d97706"
          fillOpacity="0.05"
          stroke="#d97706"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Dynamic Shrapnel Particles */}
        <g>
          {dynamicShrapnel.map((s, idx) => (
            <circle
              key={idx}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill={s.isSecondary ? '#dc2626' : '#18181b'}
            />
          ))}
        </g>

        {/* Downstream Secondary Collision Strike */}
        <g transform="translate(540, 115)">
          <circle cx="0" cy="0" r="8" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="-4" y="-2" width="8" height="4" fill="#ffffff" stroke="#ef4444" strokeWidth="0.6" />
          <text x="12" y="2" fill="#ef4444" fontSize="7.5" fontWeight="bold">SECONDARY STRIKE (CASCADE)</text>
        </g>

        {/* Summary Caption */}
        <g transform="translate(420, 225)">
          <text x="0" y="0" fill="#71717a" fontSize="8">
            RESULT: ~{predictedFrags.toLocaleString()} SHRAPNEL PIECES • DISPERSION ANGLE: ±{Math.round(coneHalfSpread / 2)}°
          </text>
        </g>
      </svg>
    </div>
  );
};
