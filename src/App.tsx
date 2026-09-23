import React, { useState, useMemo, useEffect } from 'react';
import { PREDEFINED_CONJUNCTION_EVENTS } from './data/predefinedEvents';
import { evaluateAndRankEvents } from './logic/consequenceEngine';
import { EvaluatedConjunction } from './types/conjunction';
import { EditorialHeader } from './components/EditorialHeader';
import { EditorialHero } from './components/EditorialHero';
import { ChapterProblem } from './components/ChapterProblem';
import { ChapterBlindspot } from './components/ChapterBlindspot';
import { ChapterPhysics } from './components/ChapterPhysics';
import { ChapterInteractiveDemo } from './components/ChapterInteractiveDemo';
import { ChapterManeuver } from './components/ChapterManeuver';
import { ChapterSandbox } from './components/ChapterSandbox';
import { ChapterArchitecture } from './components/ChapterArchitecture';
import { EditorialFooter } from './components/EditorialFooter';
import { ConsequenceInspector } from './components/ConsequenceInspector';

export const App: React.FC = () => {
  // Theme state: defaults to 'dark', switchable to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ocews-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // default
  });

  // Sync theme with <html> class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ocews-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Pre-evaluated conjunction events
  const evaluatedEvents = useMemo(() => {
    return evaluateAndRankEvents(PREDEFINED_CONJUNCTION_EVENTS);
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<EvaluatedConjunction | null>(null);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper-100 dark:bg-[#050505] text-neutral-900 dark:text-[#ededed] flex flex-col font-sans selection:bg-amber-400 selection:text-black transition-colors duration-200">
      {/* Editorial Masthead with Theme Toggle */}
      <EditorialHeader
        onScrollTo={handleScrollTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Narrative Flow */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <EditorialHero theme={theme} />

        {/* Chapter 01: The Problem */}
        <ChapterProblem theme={theme} />

        {/* Chapter 02: The Blindspot */}
        <ChapterBlindspot theme={theme} />

        {/* Chapter 03: The Physics & Math */}
        <ChapterPhysics theme={theme} />

        {/* Chapter 04: The Live Logic Demonstrator */}
        <ChapterInteractiveDemo
          events={evaluatedEvents}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

        {/* Chapter 05: Actionable Astrodynamics (Maneuver) */}
        <ChapterManeuver theme={theme} />

        {/* Chapter 06: Evaluator Sandbox */}
        <ChapterSandbox />

        {/* Chapter 07: System Architecture Funnel */}
        <ChapterArchitecture />
      </main>

      {/* Deep-Dive Inspector Modal */}
      {selectedEvent && (
        <ConsequenceInspector
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Editorial Colophon & Citations */}
      <EditorialFooter />
    </div>
  );
};
