import React from 'react';
import { Orbit, Calculator } from 'lucide-react';

interface HeaderProps {
  onOpenCalculator: () => void;
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCalculator,
  activeFilter,
  onSelectFilter
}) => {
  const filters = ['All Events', 'ISRO', 'Starlink', 'Commercial', 'Derelict'];

  return (
    <header className="border-b border-slate-800 bg-[#0c1322]/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Pitch Title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Orbit className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-wider font-mono">OCEWS</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-mono">
                  v1.0 • Prototype
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/80 font-mono hidden sm:inline-block">
                  Team Axilla • HackConquest 2026
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Orbital Collision Early-Warning System — <span className="text-cyan-300">Ranking debris risk by consequence, not just probability</span>
              </p>
            </div>
          </div>

          {/* Controls: Watchlist Filters & Custom Scenario Button */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Watchlist Tags */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => onSelectFilter(filter)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeFilter === filter
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Custom Calculator Trigger */}
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-cyan-500/30 transition-all hover:border-cyan-400 shadow-sm"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>What-If Sandbox</span>
            </button>

            {/* Engine Status indicator */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="hidden sm:inline">Engine: Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
