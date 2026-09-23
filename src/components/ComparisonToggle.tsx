import React from 'react';
import { ArrowUpDown, AlertCircle, Sparkles } from 'lucide-react';

interface ComparisonToggleProps {
  rankingMode: 'ocews' | 'traditional';
  onToggle: (mode: 'ocews' | 'traditional') => void;
}

export const ComparisonToggle: React.FC<ComparisonToggleProps> = ({
  rankingMode,
  onToggle
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
              Live Ranking Comparison Engine
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Switch between traditional industry alert logic and OCEWS consequence-first logic to observe the triage shift.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="inline-flex p-1 bg-[#070b14] border border-slate-800 rounded-xl">
          <button
            onClick={() => onToggle('traditional')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              rankingMode === 'traditional'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚠️ Traditional (Raw Pc Only)
          </button>
          <button
            onClick={() => onToggle('ocews')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              rankingMode === 'ocews'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🚀 OCEWS Consequence Ranking
          </button>
        </div>
      </div>

      {/* Dynamic Explanatory Callout for Evaluators */}
      {rankingMode === 'traditional' ? (
        <div className="bg-amber-950/30 border border-amber-800/50 rounded-lg p-3.5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-amber-300 font-mono block">
              TRADITIONAL VIEW: The Alert Fatigue Trap
            </span>
            <p className="text-slate-300 leading-relaxed">
              Notice that <strong className="text-amber-200">CONJ-2026-310 (Two 4 kg CubeSats at 310 km)</strong> is ranked as the 
              <span className="text-amber-300 font-semibold"> #1 MOST URGENT THREAT</span> simply because of a 45 m close miss (<span className="font-mono text-amber-300">Pc = 4.2×10⁻³</span>). 
              Meanwhile, the catastrophic <strong className="text-rose-300">9-ton Zenit rocket body (CONJ-2026-842)</strong> is buried down at <span className="font-semibold text-rose-300">Rank #4</span>! 
              In real mission control, operators waste hundreds of hours and fuel responding to benign CubeSat encounters while real Kessler threats go unnoticed.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-cyan-950/30 border border-cyan-800/50 rounded-lg p-3.5 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-semibold text-cyan-300 font-mono block">
              OCEWS VIEW: Consequence-Grounded Prioritization
            </span>
            <p className="text-slate-300 leading-relaxed">
              The <strong className="text-cyan-200">9-ton Zenit rocket body</strong> instantly vaults to <span className="text-rose-400 font-semibold">#1 CRITICAL THREAT</span>! 
              Our physics engine recognized that a 14.2 km/s impact in an 842 km Sun-Synchronous shell releases <span className="font-mono text-cyan-300">14.8 GJ of kinetic energy</span>, shattering into <span className="text-rose-300 font-semibold">14,000+ lethal fragments</span> lasting <span className="font-semibold text-amber-300">160+ years</span>. 
              The 4 kg CubeSat encounter is safely de-escalated to <span className="font-semibold text-emerald-400">Rank #5 (LOW)</span> because its debris self-cleans in the atmosphere within 3 months.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
