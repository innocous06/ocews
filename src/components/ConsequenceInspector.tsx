import React, { useState } from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { simulateAvoidanceManeuver } from '../logic/consequenceEngine';
import { OrbitalVisualizer } from './OrbitalVisualizer';
import { X, Zap, Shield, Sparkles, Clock, Layers, Rocket, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ConsequenceInspectorProps {
  event: EvaluatedConjunction | null;
  onClose: () => void;
}

export const ConsequenceInspector: React.FC<ConsequenceInspectorProps> = ({ event, onClose }) => {
  if (!event) return null;

  const [deltaV, setDeltaV] = useState<number>(0.5); // Default 0.5 m/s
  const maneuverResult = simulateAvoidanceManeuver(event, deltaV);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-obsidian-950 border-l border-neutral-800 h-full overflow-y-auto p-5 sm:p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200 font-mono">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-neutral-900 text-neutral-200 border border-neutral-700">
                  {event.eventCode}
                </span>
                <span className="text-xs text-neutral-500">
                  TCA in {event.timeToClosestApproachHours} hrs
                </span>
              </div>
              <h2 className="text-lg font-serif text-neutral-100 mt-1">
                {event.primaryObject.name} <span className="text-amber-400 font-mono text-sm">×</span> {event.secondaryObject.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                NORAD #{event.primaryObject.noradId} vs #{event.secondaryObject.noradId} • {event.shellBandName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Encounter Geometry Visualization */}
          <OrbitalVisualizer event={event} />

          {/* Plain English Assessment */}
          <div className="my-4 p-3.5 rounded-lg bg-[#020202] border border-amber-900/40">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
              <Shield className="h-3.5 w-3.5" />
              <span>EVALUATION SUMMARY & DECISION RATIONALE</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-serif">
              {event.metrics.judgeTakeaway}
            </p>
          </div>

          {/* 4 Explainable Physics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Card 1: Mass & Impact Kinetic Energy */}
            <div className="bg-[#020202] border border-neutral-900 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                  <Zap className="h-3.5 w-3.5 text-amber-400" />
                  Impact Energy & Breakup
                </span>
              </div>
              <div className="text-lg font-bold text-neutral-100 font-serif">
                {event.metrics.impactKineticEnergyGJ} <span className="text-xs font-mono text-neutral-500 font-normal">GJ</span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 space-y-0.5">
                <div>Total Mass: <strong className="text-neutral-200">{event.metrics.totalMassKg.toLocaleString()} kg</strong></div>
                <div>Relative Velocity: <strong className="text-neutral-200">{event.relativeVelocityKms} km/s</strong></div>
                <div className={`mt-1 font-bold ${event.metrics.isCatastrophicBreakup ? 'text-amber-400' : 'text-neutral-400'}`}>
                  {event.metrics.isCatastrophicBreakup
                    ? `⚠️ S = ${event.metrics.specificEnergyJoulePerGram.toLocaleString()} J/g (≥40 J/g NASA threshold exceeded)`
                    : `✓ S = ${event.metrics.specificEnergyJoulePerGram.toLocaleString()} J/g (Sub-catastrophic)`}
                </div>
              </div>
            </div>

            {/* Card 2: Fragmentation Potential */}
            <div className="bg-[#020202] border border-neutral-900 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  NASA Breakup Model Frags
                </span>
              </div>
              <div className="text-lg font-bold text-amber-400 font-serif">
                ~{event.metrics.predictedFragmentsCount.toLocaleString()} <span className="text-xs font-mono text-neutral-500 font-normal">&gt;10cm fragments</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans leading-relaxed">
                Calculated via NASA standard fragmentation power-law: <code className="text-amber-300">0.1 × M^0.75</code>. Each fragment is large enough to destroy an unshielded spacecraft.
              </p>
            </div>

            {/* Card 3: Orbital Debris Lifetime */}
            <div className="bg-[#020202] border border-neutral-900 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  Debris Orbital Residence
                </span>
              </div>
              <div className="text-lg font-bold text-neutral-100 font-serif">
                {event.metrics.debrisLifetimeYears < 1
                  ? `${Math.round(event.metrics.debrisLifetimeYears * 12)} Months`
                  : `~${Math.round(event.metrics.debrisLifetimeYears)} Years`}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans leading-relaxed">
                {event.altitudeKm < 350
                  ? 'High thermospheric drag causes rapid orbital decay and natural burn-up.'
                  : 'Extremely thin atmosphere above 700km traps shrapnel in orbit for generations.'}
              </p>
            </div>

            {/* Card 4: Shell Congestion & Kessler Multiplier */}
            <div className="bg-[#020202] border border-neutral-900 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                <span className="flex items-center gap-1.5 text-neutral-200 font-semibold">
                  <Layers className="h-3.5 w-3.5 text-amber-400" />
                  Shell Congestion Index
                </span>
              </div>
              <div className="text-lg font-bold text-neutral-100 font-serif">
                {event.metrics.shellDensityRating} <span className="text-xs font-mono text-neutral-500 font-normal">({event.metrics.shellDensityMultiplier}x)</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 font-sans leading-relaxed">
                {event.shellBandName}. Spatial density multiplier accounts for Kessler cascade collision cascading likelihood.
              </p>
            </div>
          </div>

          {/* Avoidance Maneuver Feasibility Simulator */}
          <div className="border border-neutral-800 bg-[#020202] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Rocket className="h-4 w-4" />
                <span>OPERATOR AVOIDANCE MANEUVER SIMULATOR</span>
              </div>
              {event.primaryObject.isManeuverable ? (
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-700">
                  Thrusters Active
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-500 border border-neutral-800">
                  Unmaneuverable Derelict
                </span>
              )}
            </div>

            {event.primaryObject.isManeuverable ? (
              <div className="space-y-3">
                <p className="text-xs text-neutral-400 font-serif leading-relaxed">
                  Test a small along-track propellant burn (<span className="text-amber-300 font-mono">Δv</span>) to phase the satellite orbit ahead of the encounter.
                </p>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-500">Along-Track Burn (Δv):</span>
                    <span className="text-amber-400 font-bold">{deltaV.toFixed(2)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.5"
                    step="0.05"
                    value={deltaV}
                    onChange={(e) => setDeltaV(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 h-1 bg-neutral-800 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-600">
                    <span>0.0 m/s</span>
                    <span>0.75 m/s</span>
                    <span>1.50 m/s</span>
                  </div>
                </div>

                {/* Outcome Card */}
                <div className={`p-3 rounded-lg border text-xs ${
                  maneuverResult.isSafe
                    ? 'bg-neutral-950 border-neutral-700 text-neutral-200'
                    : 'bg-neutral-950 border-amber-900/60 text-amber-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1.5">
                    {maneuverResult.isSafe ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-400">Maneuver Cleared: Collision Hazard Mitigated</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span>Insufficient Delta-V: Hazard Persists</span>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
                    <div>Miss: <strong className="text-neutral-100">{event.missDistanceM}m → {maneuverResult.newMissDistanceM}m</strong></div>
                    <div>Est. Fuel: <strong>{maneuverResult.fuelCostKgEstimate} kg</strong></div>
                    <div>New Pc: <strong>{maneuverResult.newCollisionProbability.toExponential(1)}</strong></div>
                    <div>Status: <strong className="uppercase">{maneuverResult.newPriority}</strong></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 leading-relaxed font-serif">
                Neither object in this conjunction has active propulsion or attitude control. Avoidance cannot be executed autonomously. This represents a classic unmitigated dead-on-dead orbital conjunction where ground-based monitoring and active debris removal (ADR) planning are the only countermeasures.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800 pt-4 flex items-center justify-between text-xs text-neutral-500">
          <span>NASA-NSS-1740.14 + USSF SGP4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded border border-neutral-800 hover:border-neutral-600 bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
