import React, { useState } from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { ArrowUp, ArrowDown, Minus, Sparkles, AlertCircle } from 'lucide-react';

interface ChapterInteractiveDemoProps {
  events: EvaluatedConjunction[];
  onSelectEvent: (event: EvaluatedConjunction) => void;
}

export const ChapterInteractiveDemo: React.FC<ChapterInteractiveDemoProps> = ({
  events,
  onSelectEvent
}) => {
  const [rankingMode, setRankingMode] = useState<'ocews' | 'traditional'>('ocews');
  const [activeTag, setActiveTag] = useState<string>('All');

  const tags = ['All', 'ISRO', 'Starlink', 'Commercial', 'Derelict'];

  // Filter events
  const filtered = events.filter(ev => {
    if (activeTag === 'All') return true;
    if (activeTag === 'ISRO') return ev.tag === 'ISRO' || ev.primaryObject.operator.includes('ISRO');
    if (activeTag === 'Starlink') return ev.tag === 'Starlink';
    if (activeTag === 'Commercial') return ev.tag === 'Commercial';
    if (activeTag === 'Derelict') return ev.tag === 'Derelict';
    return true;
  });

  // Sort events
  const sorted = [...filtered].sort((a, b) => {
    if (rankingMode === 'traditional') {
      return a.traditionalRank - b.traditionalRank;
    }
    return a.consequenceRank - b.consequenceRank;
  });

  const getRankShiftBadge = (event: EvaluatedConjunction) => {
    const shift = event.traditionalRank - event.consequenceRank;
    if (shift > 0) {
      return (
        <span className="inline-flex items-center text-[10px] font-mono text-amber-300 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/80">
          <ArrowUp className="h-2.5 w-2.5 mr-0.5" /> +{shift}
        </span>
      );
    } else if (shift < 0) {
      return (
        <span className="inline-flex items-center text-[10px] font-mono text-neutral-400 font-bold bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">
          <ArrowDown className="h-2.5 w-2.5 mr-0.5" /> {shift}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[10px] font-mono text-neutral-500 bg-neutral-900 px-1.5 py-0.5 rounded">
        <Minus className="h-2.5 w-2.5" /> 0
      </span>
    );
  };

  return (
    <section id="demo" className="py-12 border-t border-neutral-900 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
        <span className="font-bold">04</span>
        <span>/</span>
        <span className="uppercase tracking-widest">LIVE LOGIC DEMONSTRATOR</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-100 max-w-3xl leading-snug">
        The Triage Shift: Raw Probability vs Consequence.
      </h2>

      <p className="mt-3 text-sm text-neutral-400 font-serif leading-relaxed max-w-3xl">
        Toggle between the legacy industry queue (sorted purely by collision probability <code className="text-amber-300 font-mono">P_c</code>) and the OCEWS queue to observe how consequence scoring eliminates alert fatigue while prioritizing critical infrastructure.
      </p>

      {/* Interactive Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 mb-4 border border-neutral-800 bg-obsidian-950 p-3.5 rounded-xl font-mono text-xs">
        {/* Toggle Mode */}
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 uppercase text-[10px] hidden md:inline">SORT ORDER:</span>
          <div className="inline-flex p-1 bg-[#020202] border border-neutral-800 rounded-lg">
            <button
              onClick={() => setRankingMode('traditional')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                rankingMode === 'traditional'
                  ? 'bg-neutral-800 text-neutral-200 border border-neutral-700 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              01: Traditional (Raw Pc Only)
            </button>
            <button
              onClick={() => setRankingMode('ocews')}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                rankingMode === 'ocews'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800/80 font-semibold'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              02: OCEWS Consequence Ranking
            </button>
          </div>
        </div>

        {/* Watchlist Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-neutral-500 uppercase text-[10px] hidden lg:inline mr-1">FILTER:</span>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                activeTag === tag
                  ? 'bg-neutral-800 text-neutral-100 border border-neutral-700'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Editorial Commentary for Evaluators */}
      {rankingMode === 'traditional' ? (
        <div className="border border-neutral-800 bg-neutral-950/70 p-4 rounded-xl mb-6 font-serif text-xs leading-relaxed text-neutral-300 flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-neutral-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-mono text-neutral-200 uppercase tracking-wide block mb-1">
              CURRENT INDUSTRY CONJUNCTION QUEUE (SORTED BY RAW P_C)
            </strong>
            Notice that <span className="text-neutral-100 font-bold">EduSat-3U vs AeroCube-11</span> (two 4 kg CubeSats at 310 km) is displayed as the <strong className="text-amber-400">#1 most urgent threat</strong> on the operator screen simply due to an estimated 45-meter close pass. In contrast, the <span className="text-neutral-100 font-bold">9-ton SL-16 Zenit rocket body</span> encounter at 842 km sits down at <strong className="text-neutral-400">Rank #4</strong> because its probability is moderate.
          </div>
        </div>
      ) : (
        <div className="border border-amber-900/40 bg-amber-950/20 p-4 rounded-xl mb-6 font-serif text-xs leading-relaxed text-neutral-300 flex items-start gap-3">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-mono text-amber-400 uppercase tracking-wide block mb-1">
              OCEWS CONSEQUENCE-AWARE TRIAGE QUEUE
            </strong>
            The <span className="text-amber-200 font-bold">9-ton SL-16 Zenit Rocket Body</span> immediately vaults to <strong className="text-amber-300 font-bold">Rank #1 (CRITICAL)</strong>. Our physics engine recognized that 14.8 GJ of kinetic energy at 842 km would generate <span className="text-amber-200 font-bold">14,200+ fragments lasting 160+ years</span> in the crowded Sun-Synchronous shell. The CubeSat event is safely de-prioritized to <strong className="text-neutral-400 font-bold">Rank #5 (LOW)</strong> because its fragments burn up naturally within months.
          </div>
        </div>
      )}

      {/* Editorial Conjunction Queue Table */}
      <div className="border border-neutral-800 bg-obsidian-950 rounded-xl overflow-hidden font-mono text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-neutral-800 bg-[#020202] text-neutral-500 text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Objects in Conjunction</th>
                <th className="py-3 px-4">Altitude / Shell</th>
                <th className="py-3 px-4">Miss / Closing V</th>
                <th className="py-3 px-4">Raw P_c</th>
                <th className="py-3 px-4">Consequence Score</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900">
              {sorted.map(event => {
                const currentRank = rankingMode === 'traditional' ? event.traditionalRank : event.consequenceRank;
                const isCritical = event.metrics.priorityLevel === 'CRITICAL';
                const isHigh = event.metrics.priorityLevel === 'HIGH';

                return (
                  <tr
                    key={event.id}
                    onClick={() => onSelectEvent(event)}
                    className="hover:bg-neutral-900/50 cursor-pointer transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold text-neutral-100">
                        <span>#{currentRank}</span>
                        {rankingMode === 'ocews' && getRankShiftBadge(event)}
                      </div>
                    </td>

                    {/* Objects */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-medium text-neutral-200 flex items-center gap-1.5">
                        <span>{event.primaryObject.name}</span>
                        {event.tag === 'ISRO' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800">
                            ISRO
                          </span>
                        )}
                        {event.tag === 'Starlink' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-900 text-neutral-300 border border-neutral-700">
                            Starlink
                          </span>
                        )}
                        {event.tag === 'ISS' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800">
                            Crewed
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-500 text-[11px] font-mono mt-0.5">
                        vs {event.secondaryObject.name} ({(event.primaryObject.massKg + event.secondaryObject.massKg).toLocaleString()} kg)
                      </div>
                    </td>

                    {/* Altitude */}
                    <td className="py-3.5 px-4">
                      <div className="text-neutral-200">{event.altitudeKm} km</div>
                      <div className="text-[10px] text-neutral-500 truncate max-w-[140px]">{event.shellBandName}</div>
                    </td>

                    {/* Miss / Velocity */}
                    <td className="py-3.5 px-4">
                      <div className="text-neutral-200">{event.missDistanceM} m</div>
                      <div className="text-[10px] text-amber-400">{event.relativeVelocityKms} km/s</div>
                    </td>

                    {/* Collision Probability */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="text-neutral-300">{event.collisionProbability.toExponential(2)}</div>
                      <div className="text-[10px] text-neutral-500">TCA: {event.timeToClosestApproachHours}h</div>
                    </td>

                    {/* Consequence Score */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1 w-24">
                        <div className="flex justify-between text-[10px]">
                          <span className="font-bold text-neutral-200">{event.metrics.consequenceScore}/100</span>
                          <span className="text-neutral-500">{event.metrics.predictedFragmentsCount.toLocaleString()} f</span>
                        </div>
                        <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              isCritical ? 'bg-amber-400' : isHigh ? 'bg-amber-500' : 'bg-neutral-600'
                            }`}
                            style={{ width: `${event.metrics.consequenceScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCritical
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : isHigh
                          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                      }`}>
                        {event.metrics.priorityLevel}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(event);
                        }}
                        className="px-2 py-1 rounded border border-neutral-800 hover:border-neutral-600 text-[11px] text-neutral-300 hover:text-white transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
