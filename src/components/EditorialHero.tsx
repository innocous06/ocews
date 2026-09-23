import React from 'react';
import { HeroIllustration } from './illustrations/HeroIllustration';

export const EditorialHero: React.FC = () => {
  return (
    <section className="pt-8 sm:pt-14 pb-8 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Paper Metadata Badge */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
        <span className="text-amber-400 font-semibold tracking-wider uppercase">
          PROJECT OCEWS
        </span>
        <span>•</span>
        <span>HACKCONQUEST 2026</span>
        <span>•</span>
        <span>TEAM AXILLA</span>
        <span>•</span>
        <span>SPACE SITUATIONAL AWARENESS (SSA)</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-neutral-100 leading-[1.15] max-w-4xl tracking-tight">
        Ranking space debris risk by <span className="italic text-amber-300 font-normal">consequence</span>, not just probability.
      </h1>

      {/* Editorial Subtitle */}
      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-400 font-serif leading-relaxed max-w-3xl">
        Every week, satellite operators receive hundreds of collision warnings. Nearly all are false alarms, while genuine Kessler cascade hazards get buried in the noise. OCEWS introduces a transparent, physics-grounded scoring engine to prioritize threats that matter.
      </p>

      {/* Hero Illustration */}
      <HeroIllustration />

      {/* Key Metric Ledger */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 border-t border-b border-neutral-800/80 py-4 font-mono text-xs">
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">TRACKED SATELLITES & DEBRIS</span>
          <span className="text-xl sm:text-2xl font-bold text-neutral-100">40,000+</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5">Objects in orbit catalog</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">ALERT FATIGUE FILTERED</span>
          <span className="text-xl sm:text-2xl font-bold text-amber-400">83%</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5">Low-mass noise removed</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">CATASTROPHIC THREAT RETENTION</span>
          <span className="text-xl sm:text-2xl font-bold text-neutral-100">100%</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5">Zero cascade risks missed</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">MAX DEBRIS PERSISTENCE</span>
          <span className="text-xl sm:text-2xl font-bold text-neutral-100">160+ Yrs</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5">Sun-Synchronous shell</span>
        </div>
      </div>
    </section>
  );
};
