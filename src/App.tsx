import React, { useState, useMemo } from 'react';
import { PREDEFINED_CONJUNCTION_EVENTS } from './data/predefinedEvents';
import { evaluateAndRankEvents } from './logic/consequenceEngine';
import { EvaluatedConjunction } from './types/conjunction';
import { Header } from './components/Header';
import { PitchBanner } from './components/PitchBanner';
import { MetricCards } from './components/MetricCards';
import { ComparisonToggle } from './components/ComparisonToggle';
import { ConjunctionTable } from './components/ConjunctionTable';
import { ConsequenceInspector } from './components/ConsequenceInspector';
import { ShellCongestionChart } from './components/ShellCongestionChart';
import { PipelineFlow } from './components/PipelineFlow';
import { CustomCalculatorModal } from './components/CustomCalculatorModal';
import { ExternalLink, Code2 } from 'lucide-react';

export const App: React.FC = () => {
  // Evaluated and ranked conjunctions
  const allEvaluatedEvents = useMemo(() => {
    return evaluateAndRankEvents(PREDEFINED_CONJUNCTION_EVENTS);
  }, []);

  // State management
  const [rankingMode, setRankingMode] = useState<'ocews' | 'traditional'>('ocews');
  const [activeFilter, setActiveFilter] = useState<string>('All Events');
  const [selectedEvent, setSelectedEvent] = useState<EvaluatedConjunction | null>(allEvaluatedEvents[0]); // default selected is first event
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  // Filter events based on active tag
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All Events') return allEvaluatedEvents;
    return allEvaluatedEvents.filter(ev => {
      if (activeFilter === 'ISRO') return ev.tag === 'ISRO' || ev.primaryObject.operator.includes('ISRO');
      if (activeFilter === 'Starlink') return ev.tag === 'Starlink' || ev.primaryObject.name.includes('Starlink');
      if (activeFilter === 'Commercial') return ev.tag === 'Commercial';
      if (activeFilter === 'Derelict') return ev.tag === 'Derelict';
      return true;
    });
  }, [allEvaluatedEvents, activeFilter]);

  const handleSelectEvent = (event: EvaluatedConjunction) => {
    setSelectedEvent(event);
    setIsInspectorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Header
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Executive Summary & Pitch Banner for Judges */}
        <PitchBanner />

        {/* Top-Line Metrics & Noise Reduction */}
        <MetricCards events={allEvaluatedEvents} />

        {/* The Hero Comparison Feature: Traditional vs OCEWS */}
        <ComparisonToggle
          rankingMode={rankingMode}
          onToggle={setRankingMode}
        />

        {/* Conjunctions Triage Table */}
        <ConjunctionTable
          events={filteredEvents}
          rankingMode={rankingMode}
          selectedEventId={selectedEvent?.id || null}
          onSelectEvent={handleSelectEvent}
        />

        {/* Pipeline & Congestion Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShellCongestionChart
            events={allEvaluatedEvents}
            onSelectEvent={handleSelectEvent}
          />
          <PipelineFlow />
        </div>
      </main>

      {/* Detail Inspector Drawer Modal */}
      {isInspectorOpen && (
        <ConsequenceInspector
          event={selectedEvent}
          onClose={() => setIsInspectorOpen(false)}
        />
      )}

      {/* Custom What-If Calculator Sandbox Modal */}
      <CustomCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0c1322] py-6 mt-12 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-white font-bold tracking-wide">OCEWS</span> — Orbital Collision Early-Warning System | Team Axilla
            <span className="block text-[11px] text-slate-400 mt-0.5">
              Developed for HackConquest 2026 • Physics based on NASA Standard Breakup Model & USSF SGP4
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/innocous06/ocews"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Code2 className="h-4 w-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
