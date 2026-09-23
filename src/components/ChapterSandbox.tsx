import React, { useState } from 'react';
import { ConjunctionEvent } from '../types/conjunction';
import { evaluateConsequence } from '../logic/consequenceEngine';

export const ChapterSandbox: React.FC = () => {
  const [mass1, setMass1] = useState<number>(1500);
  const [mass2, setMass2] = useState<number>(3500);
  const [velocityKms, setVelocityKms] = useState<number>(12.5);
  const [altitudeKm, setAltitudeKm] = useState<number>(820);
  const [collisionProb, setCollisionProb] = useState<number>(0.0004);

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
    shellBandName: `Custom Altitude Shell (${altitudeKm} km)`,
    description: 'User-configured test encounter'
  };

  const metrics = evaluateConsequence(syntheticEvent);

  return (
    <section id="sandbox" className="py-12 border-t border-neutral-900 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
        <span className="font-bold">06</span>
        <span>/</span>
        <span className="uppercase tracking-widest">EVALUATOR WORKBENCH</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-100 max-w-3xl leading-snug">
        Interactive Consequence Physics Sandbox.
      </h2>

      <p className="mt-3 text-sm text-neutral-400 font-serif leading-relaxed max-w-3xl">
        Adjust orbital parameters below to test how our physics formulation reacts in real time. Observe how specific kinetic energy transitions into catastrophic break-up regimes and how altitude shapes long-term debris residence.
      </p>

      <div className="border border-neutral-800 bg-obsidian-950 rounded-xl p-5 sm:p-6 my-6 font-mono text-xs">
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {/* Mass 1 */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">OBJECT 1 MASS:</span>
              <span className="text-neutral-200 font-bold">{mass1.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="2"
              max="10000"
              step="10"
              value={mass1}
              onChange={(e) => setMass1(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
          </div>

          {/* Mass 2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">OBJECT 2 MASS:</span>
              <span className="text-amber-400 font-bold">{mass2.toLocaleString()} kg</span>
            </div>
            <input
              type="range"
              min="2"
              max="10000"
              step="10"
              value={mass2}
              onChange={(e) => setMass2(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
          </div>

          {/* Relative Velocity */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">CLOSING SPEED (v_rel):</span>
              <span className="text-neutral-200 font-bold">{velocityKms.toFixed(1)} km/s</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="16.0"
              step="0.5"
              value={velocityKms}
              onChange={(e) => setVelocityKms(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
          </div>

          {/* Altitude */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">ORBITAL ALTITUDE:</span>
              <span className="text-neutral-200 font-bold">{altitudeKm} km</span>
            </div>
            <input
              type="range"
              min="250"
              max="1200"
              step="10"
              value={altitudeKm}
              onChange={(e) => setAltitudeKm(parseInt(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
          </div>

          {/* Collision Probability */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">COLLISION PROBABILITY (P_c):</span>
              <span className="text-neutral-200 font-bold">{collisionProb.toExponential(2)}</span>
            </div>
            <input
              type="range"
              min="0.00001"
              max="0.005"
              step="0.00005"
              value={collisionProb}
              onChange={(e) => setCollisionProb(parseFloat(e.target.value))}
              className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Real-time Evaluated Results Panel */}
        <div className="border border-neutral-800 bg-[#020202] rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-900 gap-2 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-neutral-500 text-[10px] uppercase">CALCULATED SCORE:</span>
              <span className="text-2xl font-bold font-serif text-neutral-100">
                {metrics.consequenceScore} <span className="text-xs font-mono text-neutral-500">/ 100</span>
              </span>
            </div>
            <div>
              <span className={`px-2.5 py-1 rounded text-xs font-bold font-mono ${
                metrics.priorityLevel === 'CRITICAL'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : metrics.priorityLevel === 'HIGH'
                  ? 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                  : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
              }`}>
                PRIORITY: {metrics.priorityLevel}
              </span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
            <div className="border border-neutral-900 bg-obsidian-950 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px]">IMPACT KINETIC ENERGY</span>
              <span className="text-sm font-bold text-neutral-200">{metrics.impactKineticEnergyGJ} GJ</span>
              <span className="text-[10px] text-amber-400 block mt-0.5 font-sans">
                {metrics.specificEnergyJoulePerGram >= 40 ? '≥40 J/g Catastrophic' : '<40 J/g Sub-breakup'}
              </span>
            </div>
            <div className="border border-neutral-900 bg-obsidian-950 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px]">PREDICTED FRAGMENTS</span>
              <span className="text-sm font-bold text-amber-400">~{metrics.predictedFragmentsCount.toLocaleString()}</span>
              <span className="text-[10px] text-neutral-500 block mt-0.5">&gt;10 cm trackable</span>
            </div>
            <div className="border border-neutral-900 bg-obsidian-950 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px]">ORBITAL DECAY LIFETIME</span>
              <span className="text-sm font-bold text-neutral-200">
                {metrics.debrisLifetimeYears < 1 ? '<1 Year' : `~${Math.round(metrics.debrisLifetimeYears)} Years`}
              </span>
              <span className="text-[10px] text-neutral-500 block mt-0.5">Atmospheric drag</span>
            </div>
            <div className="border border-neutral-900 bg-obsidian-950 p-2.5 rounded">
              <span className="text-neutral-500 block text-[10px]">SHELL CONGESTION</span>
              <span className="text-sm font-bold text-neutral-200">{metrics.shellDensityMultiplier}x</span>
              <span className="text-[10px] text-neutral-500 block mt-0.5">{metrics.shellDensityRating}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-900 text-[11px] text-neutral-400 font-serif leading-relaxed">
            <strong className="text-neutral-300 font-mono">ASSESSMENT:</strong> {metrics.judgeTakeaway}
          </div>
        </div>
      </div>
    </section>
  );
};
