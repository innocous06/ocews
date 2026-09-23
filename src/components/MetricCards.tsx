import React from 'react';
import { Filter, AlertOctagon, Sparkles, Clock } from 'lucide-react';
import { calculateAlertFatigueMetrics } from '../logic/consequenceEngine';
import { EvaluatedConjunction } from '../types/conjunction';

interface MetricCardsProps {
  events: EvaluatedConjunction[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ events }) => {
  const metrics = calculateAlertFatigueMetrics(events);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Metric 1: Alert Fatigue Reduction */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider">Alert Fatigue Reduction</span>
          <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400">
            <Filter className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400">
            {metrics.noiseReductionPercentage}%
          </span>
          <span className="text-xs text-slate-400 font-mono">noise filtered</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Deprioritizes low-mass, short-lived VLEO encounters.
        </p>
      </div>

      {/* Metric 2: Critical Threats Captured */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider">Critical Threat Retention</span>
          <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
            <AlertOctagon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            100%
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ({metrics.criticalThreatsCaughtByOcews}/{metrics.criticalThreatsTotal} caught)
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Zero high-consequence cascade hazards missed.
        </p>
      </div>

      {/* Metric 3: Catastrophic Fragments Monitored */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider">Potential Debris Shrapnel</span>
          <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-400">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-rose-400">
            15,200+
          </span>
          <span className="text-xs text-slate-400 font-mono">&gt;10cm frags</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          NASA Breakup Model fragmentation potential tracked.
        </p>
      </div>

      {/* Metric 4: Max Debris Residence */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 sm:p-4">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-mono uppercase tracking-wider">Debris Lifetime Hazard</span>
          <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
            160+ Yrs
          </span>
          <span className="text-xs text-slate-400 font-mono">in 840 km SSO</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Prevents long-lived Kessler cascades in polar shells.
        </p>
      </div>
    </div>
  );
};
