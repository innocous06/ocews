import React from 'react';
import { Orbit, ExternalLink, Code2, Sun, Moon } from 'lucide-react';

interface EditorialHeaderProps {
  onScrollTo: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({
  onScrollTo,
  theme,
  onToggleTheme
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800/80 bg-paper-50/95 dark:bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40 select-none transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Left: Refined Typographic Lockup (No chunky AI pill badges) */}
        <div className="flex items-center gap-3">
          <div className="text-amber-600 dark:text-amber-400">
            <Orbit className="h-5 w-5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-base tracking-widest text-neutral-900 dark:text-neutral-100">
              OCEWS
            </span>
            <span className="text-neutral-400 dark:text-neutral-600 font-serif text-sm">/</span>
            <span className="font-serif italic text-sm text-neutral-700 dark:text-neutral-300">
              Team Axilla
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 text-xs hidden sm:inline">•</span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 hidden sm:inline">
              HackConquest 2026
            </span>
          </div>
        </div>

        {/* Center: Editorial Chapter Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onScrollTo('problem')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            01 Problem
          </button>
          <button
            onClick={() => onScrollTo('blindspot')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            02 Blindspot
          </button>
          <button
            onClick={() => onScrollTo('physics')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            03 Physics
          </button>
          <button
            onClick={() => onScrollTo('demo')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            04 Triage Queue
          </button>
          <button
            onClick={() => onScrollTo('maneuver')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            05 Maneuver
          </button>
          <button
            onClick={() => onScrollTo('sandbox')}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            06 Sandbox
          </button>
        </nav>

        {/* Right: Theme Toggle & GitHub Link */}
        <div className="flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[11px]">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-neutral-700" />
                <span className="hidden sm:inline text-[11px]">Dark</span>
              </>
            )}
          </button>

          <a
            href="https://github.com/innocous06/ocews"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-mono hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors"
          >
            <Code2 className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Repo</span>
            <ExternalLink className="h-3 w-3 text-neutral-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
