import React from 'react';
import { Download, Filter, Orbit, Award } from 'lucide-react';

export const PipelineFlow: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Ingest',
      sub: 'Pull Daily TLEs',
      detail: 'Public ephemeris feeds from CelesTrak & Space-Track catalogs.',
      volume: '40,000+ Objects',
      icon: Download,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      num: '02',
      title: 'Filter',
      sub: 'Geometric Sifting',
      detail: 'Coarse apogee/perigee filters & orbital plane intersections.',
      volume: '800M → ~5,000 Pairs',
      icon: Filter,
      color: 'text-blue-400',
      border: 'border-blue-500/30'
    },
    {
      num: '03',
      title: 'Propagate',
      sub: 'SGP4 Orbital Engine',
      detail: 'Predict close approach geometry (TCA, miss distance, relative velocity).',
      volume: '~150 Encounters',
      icon: Orbit,
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    {
      num: '04',
      title: 'Score & Rank',
      sub: 'OCEWS Consequence',
      detail: 'Physics triage by impact energy, breakup shrapnel, and debris residence.',
      volume: 'Top Actionable Queue',
      icon: Award,
      color: 'text-rose-400',
      border: 'border-rose-500/30'
    }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wide">
            End-to-End Processing Architecture
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            How OCEWS filters 800 million potential object pairs into a focused consequence triage queue.
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
          Slide 4: Pipeline Reference
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {steps.map(step => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`bg-[#070b14]/80 border ${step.border} rounded-lg p-3.5 flex flex-col justify-between relative group hover:border-slate-600 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-slate-400 font-bold">
                    STEP {step.num}
                  </span>
                  <div className={`p-1.5 rounded bg-slate-800/80 ${step.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <div className="font-mono font-bold text-sm text-slate-100">{step.title}</div>
                <div className="text-xs text-cyan-300 font-mono mb-1.5">{step.sub}</div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{step.detail}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-300">
                <span>Funnel:</span>
                <span className="font-semibold text-slate-200">{step.volume}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
