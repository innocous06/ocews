import React from 'react';
import { Orbit, ExternalLink, Code2 } from 'lucide-react';

interface EditorialHeaderProps {
  onScrollTo: (id: string) => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({ onScrollTo }) => {
  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Refined Typographic Lockup (No AI pill boxes) */}
        <div className="flex items-center gap-3">
          <div className="text-amber-600">
            <Orbit className="h-5 w-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-base tracking-widest text-neutral-900">
              OCEWS
            </span>
            <span className="text-neutral-400 font-serif text-sm">/</span>
            <span className="font-serif italic text-sm text-neutral-700">
              Team Axilla
            </span>
            <span className="text-neutral-300 text-xs hidden sm:inline">•</span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 hidden sm:inline">
              HackConquest 2026
            </span>
          </div>
        </div>

        {/* Center: Editorial Chapter Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-600">
          <button
            onClick={() => onScrollTo('problem')}
            className="hover:text-amber-700 transition-colors"
          >
            01 Problem
          </button>
          <button
            onClick={() => onScrollTo('blindspot')}
            className="hover:text-amber-700 transition-colors"
          >
            02 Blindspot
          </button>
          <button
            onClick={() => onScrollTo('physics')}
            className="hover:text-amber-700 transition-colors"
          >
            03 Physics
          </button>
          <button
            onClick={() => onScrollTo('demo')}
            className="hover:text-amber-700 transition-colors"
          >
            04 Triage Queue
          </button>
          <button
            onClick={() => onScrollTo('maneuver')}
            className="hover:text-amber-700 transition-colors"
          >
            05 Maneuver
          </button>
          <button
            onClick={() => onScrollTo('sandbox')}
            className="hover:text-amber-700 transition-colors"
          >
            06 Sandbox
          </button>
        </nav>

        {/* Right: GitHub Repo Link */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/innocous06/ocews"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-mono transition-colors shadow-2xs"
          >
            <Code2 className="h-3.5 w-3.5 text-amber-600" />
            <span>GitHub Repository</span>
            <ExternalLink className="h-3 w-3 text-neutral-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
