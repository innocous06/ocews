import React from 'react';
import { Orbit, ExternalLink, Code2 } from 'lucide-react';

interface EditorialHeaderProps {
  onScrollTo: (id: string) => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({ onScrollTo }) => {
  return (
    <header className="border-b border-neutral-800 bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Project & Team Brand */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center text-amber-400">
            <Orbit className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm tracking-widest text-neutral-100">
                OCEWS
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/80">
                Team Axilla
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-serif italic hidden sm:block">
              Orbital Collision Early-Warning System • HackConquest 2026
            </p>
          </div>
        </div>

        {/* Center/Right: Editorial Chapter Navigation */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-mono text-neutral-400">
          <button
            onClick={() => onScrollTo('problem')}
            className="hover:text-amber-400 transition-colors"
          >
            01. Problem
          </button>
          <button
            onClick={() => onScrollTo('blindspot')}
            className="hover:text-amber-400 transition-colors"
          >
            02. Blindspot
          </button>
          <button
            onClick={() => onScrollTo('physics')}
            className="hover:text-amber-400 transition-colors"
          >
            03. Physics & Math
          </button>
          <button
            onClick={() => onScrollTo('demo')}
            className="hover:text-amber-400 transition-colors"
          >
            04. Live Triage
          </button>
          <button
            onClick={() => onScrollTo('maneuver')}
            className="hover:text-amber-400 transition-colors"
          >
            05. Maneuver
          </button>
          <button
            onClick={() => onScrollTo('sandbox')}
            className="hover:text-amber-400 transition-colors"
          >
            06. What-If
          </button>
        </nav>

        {/* Right: GitHub Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/innocous06/ocews"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-300 text-xs font-mono transition-colors"
          >
            <Code2 className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="h-3 w-3 text-neutral-500" />
          </a>
        </div>
      </div>
    </header>
  );
};
