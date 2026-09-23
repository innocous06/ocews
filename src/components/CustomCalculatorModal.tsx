import React, { useState } from 'react';
import { X, Calculator } from 'lucide-react';
import { ConjunctionEvent } from '../types/conjunction';
import { evaluateConsequence } from '../logic/consequenceEngine';

interface CustomCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomCalculatorModal: React.FC<CustomCalculatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Custom scenario input state
  const [mass1, setMass1] = useState<number>(1500);
  const [mass2, setMass2] = useState<number>(3500);
  const [velocityKms, setVelocityKms] = useState<number>(12.5);
  const [altitudeKm, setAltitudeKm] = useState<number>(820);
  const [collisionProb, setCollisionProb] = useState<number>(0.0005);

  // Construct synthetic event
  const syntheticEvent: ConjunctionEvent = {
    id: 'synthetic-001',
    eventCode: 'CUSTOM-SANDBOX',
    primaryObject: {
      id: 'synth-1',
      name: 'Custom Target 1',
      noradId: 99901,
      type: 'payload',
      status: 'active',
      operator: 'Custom Operator',
      massKg: mass1,
      country: 'Demo',
      isManeuverable: true
    },
    secondaryObject: {
      id: 'synth-2',
      name: 'Custom Target 2',
      noradId: 99902,
      type: 'rocket_body',
      status: 'derelict',
      operator: 'Custom Target',
      massKg: mass2,
      country: 'Demo',
      isManeuverable: false
    },
    altitudeKm: altitudeKm,
    missDistanceM: 120,
    relativeVelocityKms: velocityKms,
    collisionProbability: collisionProb,
    timeToClosestApproachHours: 24,
    tleAgeDays: 0.5,
    inclinationDeg: 78,
    shellBandName: `Custom Band (${altitudeKm} km)`,
    description: 'User-configured test encounter'
  };

  const metrics = evaluateConsequence(syntheticEvent);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0c1322] border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-mono">
                Consequence Physics Sandbox
              </h2>
              <p className="text-xs text-slate-400">
                Test custom orbital mass, closing velocity, and altitude to evaluate our consequence engine.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Sliders & Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Mass 1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Object 1 Mass:</span>
              <span className="text-cyan-300 font-bold">{mass1.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="2"
              max="10000"
              step="10"
              value={mass1}
              onChange={(e) => setMass1(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Mass 2 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Object 2 Mass:</span>
              <span className="text-rose-300 font-bold">{mass2.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="2"
              max="10000"
              step="10"
              value={mass2}
              onChange={(e) => setMass2(parseFloat(e.target.value))}
              className="w-full accent-rose-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Relative Velocity */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Relative Velocity (v_rel):</span>
              <span className="text-amber-300 font-bold">{velocityKms.toFixed(1)} km/s</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="16.0"
              step="0.5"
              value={velocityKms}
              onChange={(e) => setVelocityKms(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Altitude */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Orbital Altitude:</span>
              <span className="text-purple-300 font-bold">{altitudeKm} km</span>
            </div>
            <input
              type="range"
              min="250"
              max="1200"
              step="10"
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(parseInt(e.target.value))}
              className="w-full accent-purple-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>

          {/* Collision Probability Pc */}
          <div className="space-y-1 sm:col-span-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Raw Collision Probability (Pc):</span>
              <span className="text-emerald-300 font-bold">{collisionProb.toExponential(2)}</span>
            </div>
            <input
              type="range"
              min="0.00001"
              max="0.005"
              step="0.00005"
              value={collisionProb}
              onChange={(e) => setCollisionProb(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Calculated Result Display */}
        <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Consequence Output:</span>
              <span className="text-2xl font-bold font-mono text-white">
                {metrics.consequenceScore} <span className="text-sm text-slate-500">/ 100</span>
              </span>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                metrics.priorityLevel === 'CRITICAL'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : metrics.priorityLevel === 'HIGH'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : metrics.priorityLevel === 'ELEVATED'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {metrics.priorityLevel} PRIORITY
              </span>
            </div>
          </div>

          {/* 4 Result Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">IMPACT ENERGY</div>
              <div className="text-sm font-bold text-cyan-400 mt-0.5">{metrics.impactKineticEnergyGJ} GJ</div>
              <div className="text-[9px] text-slate-500">({metrics.specificEnergyJoulePerGram} J/g)</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">LETHAL FRAGS</div>
              <div className="text-sm font-bold text-rose-400 mt-0.5">~{metrics.predictedFragmentsCount.toLocaleString()}</div>
              <div className="text-[9px] text-slate-500">&gt;10 cm size</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">ORBIT LIFETIME</div>
              <div className="text-sm font-bold text-amber-400 mt-0.5">
                {metrics.debrisLifetimeYears < 1 ? '<1 Yr' : `~${Math.round(metrics.debrisLifetimeYears)} Yrs`}
              </div>
              <div className="text-[9px] text-slate-500">drag decay</div>
            </div>
            <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">SHELL CONGESTION</div>
              <div className="text-sm font-bold text-purple-400 mt-0.5">{metrics.shellDensityMultiplier}x</div>
              <div className="text-[9px] text-slate-500">{metrics.shellDensityRating}</div>
            </div>
          </div>

          {/* Explanatory Takeaway */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed">
            <strong>Engine Assessment:</strong> {metrics.judgeTakeaway}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-xs font-bold transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
