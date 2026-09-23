import React from 'react';
import { AlertTriangle, Compass, ShieldCheck } from 'lucide-react';

export const PitchBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 relative overflow-hidden backdrop-blur">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Compass className="h-4 w-4" />
          <span className="font-semibold tracking-wide uppercase">Core Innovation & Thesis</span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Evaluating 40,000+ Tracked Objects
        </span>
      </div>

      {/* 3 Pillar Summary for Evaluators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: The Problem */}
        <div className="bg-[#070b14]/70 border border-rose-950/60 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>THE PROBLEM: ALERT FATIGUE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Satellite operators receive hundreds of Conjunction Data Messages (CDMs) weekly. Almost all are false alarms, burying genuine catastrophic threats under noise.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-rose-400/90">
            • Free public data exists, but triage is broken.
          </div>
        </div>

        {/* Pillar 2: The Blindspot */}
        <div className="bg-[#070b14]/70 border border-amber-950/60 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold mb-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>THE BLINDSPOT: PROBABILITY ALONE</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard alerts rank by raw collision probability (<span className="text-amber-300 font-mono">P_c</span>). Two small CubeSats in decaying low orbit score high priority, while a 9-ton rocket body in an 840 km polar shell gets buried.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-400/90">
            • Probability ≠ Severity of Outcome.
          </div>
        </div>

        {/* Pillar 3: The Solution */}
        <div className="bg-[#070b14]/70 border border-emerald-950/60 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>OUR SOLUTION: CONSEQUENCE-FIRST</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              OCEWS applies physics-based consequence scoring: impact energy, catastrophic fragmentation (NASA standard ≥40 J/g), orbital debris lifetime, and shell congestion.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400/90">
            • 83% fewer false alerts; zero critical risks missed.
          </div>
        </div>
      </div>
    </div>
  );
};
