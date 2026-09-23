import React, { useState, useMemo } from 'react';
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
    <div className="min-h-screen bg-[#050505] text-[#ededed] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Editorial Masthead */}
      <EditorialHeader onScrollTo={handleScrollTo} />

      {/* Main Narrative Flow */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <EditorialHero />

        {/* Chapter 01: The Problem */}
        <ChapterProblem />

        {/* Chapter 02: The Blindspot */}
        <ChapterBlindspot />

        {/* Chapter 03: The Physics & Math */}
        <ChapterPhysics />

        {/* Chapter 04: The Live Logic Demonstrator */}
        <ChapterInteractiveDemo
          events={evaluatedEvents}
          onSelectEvent={(event) => setSelectedEvent(event)}
        />

        {/* Chapter 05: Actionable Astrodynamics (Maneuver) */}
        <ChapterManeuver />

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
