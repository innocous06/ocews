import React from 'react';

export const ChapterArchitecture: React.FC = () => {
  const steps = [
    {
      num: '01',
      name: 'INGEST',
      sub: 'Ephemeris Ingestion',
      detail: 'Daily automated ingestion of Space-Track and CelesTrak two-line element sets (TLEs) and Conjunction Data Messages (CDMs).',
      volume: '40,000+ Objects'
    },
    {
      num: '02',
      name: 'FILTER',
      sub: 'Geometric Sifting',
      detail: 'Apogee and perigee geometric overlap filtering eliminates non-intersecting orbits without full numerical integration.',
      volume: '800M → ~5,000 Pairs'
    },
    {
      num: '03',
      name: 'PROPAGATE',
      sub: 'SGP4 Astrodynamics',
      detail: 'Analytic Simplified General Perturbations (SGP4) propagation evaluates relative velocity, miss distance, and Time of Closest Approach (TCA).',
      volume: '~150 Encounters'
    },
    {
      num: '04',
      name: 'SCORE & RANK',
      sub: 'OCEWS Consequence',
      detail: 'Physics-based triage calculates kinetic energy, NASA break-up specific energy, debris lifetime, and shell congestion multipliers.',
      volume: 'Actionable Priority Queue'
    }
  ];

  return (
    <section id="architecture" className="py-12 border-t border-neutral-200 dark:border-neutral-900 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 mb-2">
        <span className="font-bold">07</span>
        <span>/</span>
        <span className="uppercase tracking-widest">PROCESSING FUNNEL</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-900 dark:text-neutral-100 max-w-3xl leading-snug">
        From 800 million object pairs to an actionable triage queue.
      </h2>

      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed max-w-3xl">
        Evaluating conjunctions between all 40,000 cataloged objects yields over 800 million theoretical pairings ($N(N-1)/2$). Our pipeline reduces this candidate set through progressive sifting stages before applying the consequence score.
      </p>

      {/* 4-Column Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 font-mono text-xs">
        {steps.map(step => (
          <div
            key={step.num}
            className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-obsidian-950 p-4 rounded-xl flex flex-col justify-between shadow-sm transition-colors duration-200"
          >
            <div>
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-2 mb-3">
                <span className="text-amber-700 dark:text-amber-400 font-bold">STAGE {step.num}</span>
                <span className="text-[10px] text-neutral-500 uppercase">{step.volume}</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-0.5">{step.name}</div>
              <div className="text-[11px] text-neutral-500 italic mb-2 font-serif">{step.sub}</div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed">
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
