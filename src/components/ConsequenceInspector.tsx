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

  // Maneuver simulation state
  const [deltaV, setDeltaV] = useState<number>(0.5); // Default 0.5 m/s

  const maneuverResult = simulateAvoidanceManeuver(event, deltaV);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#0c1322] border-l border-slate-800 h-full overflow-y-auto p-4 sm:p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {event.eventCode}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  TCA in {event.timeToClosestApproachHours} hrs
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                {event.primaryObject.name} <span className="text-rose-400">×</span> {event.secondaryObject.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                NORAD #{event.primaryObject.noradId} vs #{event.secondaryObject.noradId} • {event.shellBandName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Encounter Geometry Visualization */}
          <OrbitalVisualizer event={event} />

          {/* Plain English Judge Takeaway */}
          <div className="my-4 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold mb-1">
              <Shield className="h-4 w-4" />
              <span>PHYSICS EVALUATION SUMMARY (FOR JUDGES & OPERATORS)</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {event.metrics.judgeTakeaway}
            </p>
          </div>

          {/* 4 Explainable Physics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Card 1: Mass & Impact Kinetic Energy */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Zap className="h-3.5 w-3.5" />
                  Impact Energy & Breakup
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-white">
                {event.metrics.impactKineticEnergyGJ} <span className="text-xs text-slate-400 font-normal">GJ</span>
              </div>
              <div className="text-[11px] text-slate-300 font-mono mt-1 space-y-0.5">
                <div>Total Mass: <strong>{event.metrics.totalMassKg.toLocaleString()} kg</strong></div>
                <div>Relative Velocity: <strong>{event.relativeVelocityKms} km/s</strong></div>
                <div className={`mt-1 font-bold ${event.metrics.isCatastrophicBreakup ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {event.metrics.isCatastrophicBreakup
                    ? `⚠️ Specific Energy: ${event.metrics.specificEnergyJoulePerGram.toLocaleString()} J/g (≥40 J/g NASA threshold exceeded)`
                    : `✓ Specific Energy: ${event.metrics.specificEnergyJoulePerGram.toLocaleString()} J/g (Sub-catastrophic)`}
                </div>
              </div>
            </div>

            {/* Card 2: Fragmentation Potential */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  NASA Breakup Model Frags
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-rose-400">
                ~{event.metrics.predictedFragmentsCount.toLocaleString()} <span className="text-xs text-slate-400 font-normal">&gt;10cm fragments</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Calculated via NASA standard fragmentation power-law: <code className="text-cyan-300 font-mono">0.1 × M^0.75</code>. Each fragment is large enough to destroy an unshielded satellite upon impact.
              </p>
            </div>

            {/* Card 3: Orbital Debris Lifetime */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <Clock className="h-3.5 w-3.5" />
                  Debris Orbital Residence
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-amber-400">
                {event.metrics.debrisLifetimeYears < 1
                  ? `${Math.round(event.metrics.debrisLifetimeYears * 12)} Months`
                  : `~${Math.round(event.metrics.debrisLifetimeYears)} Years`}
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {event.altitudeKm < 350
                  ? 'High thermospheric drag causes rapid orbital decay and natural burn-up.'
                  : 'Extremely thin atmosphere above 700km traps shrapnel in orbit for generations.'}
              </p>
            </div>

            {/* Card 4: Shell Congestion & Kessler Multiplier */}
            <div className="bg-[#070b14] border border-slate-800 rounded-lg p-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <Layers className="h-3.5 w-3.5" />
                  Shell Congestion Index
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-purple-400">
                {event.metrics.shellDensityRating} <span className="text-xs text-slate-400 font-normal">({event.metrics.shellDensityMultiplier}x)</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                {event.shellBandName}. Spatial density multiplier accounts for Kessler cascade collision cascading likelihood.
              </p>
            </div>
          </div>

          {/* Avoidance Maneuver Feasibility Simulator */}
          <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <Rocket className="h-4 w-4" />
                <span>OPERATOR AVOIDANCE MANEUVER SIMULATOR</span>
              </div>
              {event.primaryObject.isManeuverable ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Thrusters Available
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Unmaneuverable Derelict
                </span>
              )}
            </div>

            {event.primaryObject.isManeuverable ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Test a small along-track propellant burn (<span className="text-cyan-300 font-mono">Δv</span>) to phase the satellite orbit ahead of the encounter.
                </p>

                {/* Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Along-Track Burn (Δv):</span>
                    <span className="text-cyan-300 font-bold">{deltaV.toFixed(2)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.5"
                    step="0.05"
                    value={deltaV}
                    onChange={(e) => setDeltaV(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.0 m/s (No burn)</span>
                    <span>0.75 m/s</span>
                    <span>1.50 m/s (Max burn)</span>
                  </div>
                </div>

                {/* Dynamic Outcome Card */}
                <div className={`p-3 rounded-lg border text-xs font-mono ${
                  maneuverResult.isSafe
                    ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold mb-1.5">
                    {maneuverResult.isSafe ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Maneuver Cleared: Collision Hazard Mitigated</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span>Insufficient Delta-V: Hazard Persists</span>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200">
                    <div>Miss: <strong className="text-cyan-300">{event.missDistanceM}m → {maneuverResult.newMissDistanceM}m</strong></div>
                    <div>Est. Fuel: <strong>{maneuverResult.fuelCostKgEstimate} kg</strong></div>
                    <div>New Pc: <strong>{maneuverResult.newCollisionProbability.toExponential(1)}</strong></div>
                    <div>Status: <strong className="uppercase">{maneuverResult.newPriority}</strong></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/50 text-xs text-rose-300 leading-relaxed font-sans">
                Neither object in this conjunction has active propulsion or attitude control. Avoidance cannot be executed autonomously. This represents a classic unmitigated dead-on-dead orbital conjunction where ground-based monitoring and active debris removal (ADR) planning are the only countermeasures.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Formula: NASA-NSS-1740.14 + USSF SGP4</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
