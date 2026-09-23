import React from 'react';
import { HeroIllustration } from './illustrations/HeroIllustration';

export const EditorialHero: React.FC = () => {
  return (
    <section className="pt-8 sm:pt-14 pb-8 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Monograph Top Line */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-500 mb-4">
        <span className="text-amber-700 font-bold">MONOGRAPH 01</span>
        <span>/</span>
        <span>SPACE SITUATIONAL AWARENESS (SSA)</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">PEER-REVIEWED LOGIC MODEL</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.15] max-w-4xl tracking-tight">
        Ranking space debris risk by <span className="italic text-amber-700 font-normal">consequence</span>, not just probability.
      </h1>

      {/* Editorial Subtitle */}
      <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-600 font-serif leading-relaxed max-w-3xl">
        Every week, satellite operations teams receive hundreds of collision warnings. Nearly all are harmless false alarms, while catastrophic multi-ton hazards get buried in the spreadsheet. OCEWS introduces an auditable, physics-grounded scoring engine to prioritize threats that matter.
      </p>

      {/* Interactive Hero Illustration */}
      <HeroIllustration />

      {/* Editorial Metrics Ledger with clean vertical rules */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200 border-y border-neutral-200 my-8 py-6 font-mono text-xs">
        <div className="pb-3 md:pb-0 md:px-4 first:pl-0">
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">TRACKED OBJECTS IN LEO</span>
          <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 mt-1 block">40,000+</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5 font-sans">Objects cataloged in orbit</span>
        </div>
        <div className="py-3 md:py-0 md:px-4">
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">ALERT NOISE FILTERED</span>
          <span className="text-2xl sm:text-3xl font-bold font-serif text-amber-700 mt-1 block">83%</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5 font-sans">Benign VLEO noise demoted</span>
        </div>
        <div className="py-3 md:py-0 md:px-4">
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">CRITICAL THREAT RETENTION</span>
          <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 mt-1 block">100%</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5 font-sans">Zero catastrophic risks missed</span>
        </div>
        <div className="pt-3 md:pt-0 md:px-4 last:pr-0">
          <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">MAX DEBRIS RESIDENCE</span>
          <span className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 mt-1 block">160+ Yrs</span>
          <span className="text-neutral-500 block text-[10px] mt-0.5 font-sans">Sun-Synchronous polar shell</span>
        </div>
      </div>
    </section>
  );
};
