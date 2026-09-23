import React from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { ArrowUp, ArrowDown, Minus, Info, Flame } from 'lucide-react';

interface ConjunctionTableProps {
  events: EvaluatedConjunction[];
  rankingMode: 'ocews' | 'traditional';
  selectedEventId: string | null;
  onSelectEvent: (event: EvaluatedConjunction) => void;
}

export const ConjunctionTable: React.FC<ConjunctionTableProps> = ({
  events,
  rankingMode,
  selectedEventId,
  onSelectEvent
}) => {
  // Sort events based on selected mode
  const sortedEvents = [...events].sort((a, b) => {
    if (rankingMode === 'traditional') {
      return a.traditionalRank - b.traditionalRank;
    }
    return a.consequenceRank - b.consequenceRank;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <Flame className="h-3 w-3 animate-pulse" />
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            HIGH
          </span>
        );
      case 'ELEVATED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
            ELEVATED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            LOW (NOISE)
          </span>
        );
    }
  };

  const getRankShiftBadge = (event: EvaluatedConjunction) => {
    // Delta = traditionalRank - consequenceRank
    // Positive means OCEWS moved it UP (higher priority)
    // Negative means OCEWS moved it DOWN (lower priority)
    const shift = event.traditionalRank - event.consequenceRank;
    if (shift > 0) {
      return (
        <span className="inline-flex items-center text-[10px] font-mono text-rose-400 font-bold bg-rose-950/60 px-1.5 py-0.5 rounded">
          <ArrowUp className="h-2.5 w-2.5 mr-0.5" /> +{shift}
        </span>
      );
    } else if (shift < 0) {
      return (
        <span className="inline-flex items-center text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded">
          <ArrowDown className="h-2.5 w-2.5 mr-0.5" /> {shift}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[10px] font-mono text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
        <Minus className="h-2.5 w-2.5" /> 0
      </span>
    );
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden backdrop-blur">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <span>Conjunction Triage Register</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
              Showing {sortedEvents.length} Active Encounters
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any row to inspect the full physics breakdown and simulate avoidance maneuvers.
          </p>
        </div>
        <div className="text-xs text-cyan-400 font-mono hidden md:block">
          Active Mode: <strong className="uppercase">{rankingMode}</strong>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#070b14]/80 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-3 sm:px-4">Rank</th>
              <th className="py-3 px-3 sm:px-4">Objects in Conjunction</th>
              <th className="py-3 px-3 sm:px-4">Altitude / Shell</th>
              <th className="py-3 px-3 sm:px-4">Miss / Closing V</th>
              <th className="py-3 px-3 sm:px-4">Raw P_c</th>
              <th className="py-3 px-3 sm:px-4">Consequence Score</th>
              <th className="py-3 px-3 sm:px-4">Triage Priority</th>
              <th className="py-3 px-3 sm:px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedEvents.map(event => {
              const isSelected = selectedEventId === event.id;
              const currentRank = rankingMode === 'traditional' ? event.traditionalRank : event.consequenceRank;

              return (
                <tr
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyan-950/40 border-l-4 border-cyan-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-3 px-3 sm:px-4">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-bold text-sm text-white">#{currentRank}</span>
                      {rankingMode === 'ocews' && getRankShiftBadge(event)}
                    </div>
                  </td>

                  {/* Objects Column */}
                  <td className="py-3 px-3 sm:px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-200">{event.primaryObject.name}</span>
                        {event.tag === 'ISRO' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-orange-950 text-orange-400 border border-orange-800">
                            ISRO
                          </span>
                        )}
                        {event.tag === 'Starlink' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800">
                            Starlink
                          </span>
                        )}
                        {event.tag === 'ISS' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-800">
                            ISS Crewed
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-[11px] flex items-center gap-1">
                        <span className="text-rose-400 font-mono">vs</span>
                        <span>{event.secondaryObject.name}</span>
                        <span className="text-slate-400">({(event.primaryObject.massKg + event.secondaryObject.massKg).toLocaleString()} kg total)</span>
                      </div>
                    </div>
                  </td>

                  {/* Altitude / Shell Column */}
                  <td className="py-3 px-3 sm:px-4 font-mono">
                    <div className="text-slate-200 font-semibold">{event.altitudeKm} km</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[170px]" title={event.shellBandName}>
                      {event.shellBandName}
                    </div>
                  </td>

                  {/* Miss / Velocity Column */}
                  <td className="py-3 px-3 sm:px-4 font-mono">
                    <div className="text-slate-200">{event.missDistanceM} m</div>
                    <div className="text-[10px] text-cyan-400">{event.relativeVelocityKms} km/s</div>
                  </td>

                  {/* Collision Probability Column */}
                  <td className="py-3 px-3 sm:px-4 font-mono">
                    <div className="text-slate-300 font-semibold">
                      {event.collisionProbability.toExponential(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      TCA: {event.timeToClosestApproachHours}h
                    </div>
                  </td>

                  {/* Consequence Score Bar Column */}
                  <td className="py-3 px-3 sm:px-4">
                    <div className="space-y-1 w-28 sm:w-32">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="font-bold text-slate-200">{event.metrics.consequenceScore}/100</span>
                        <span className="text-slate-400 text-[10px]">
                          {event.metrics.predictedFragmentsCount.toLocaleString()} frags
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            event.metrics.consequenceScore >= 75
                              ? 'bg-rose-500'
                              : event.metrics.consequenceScore >= 50
                              ? 'bg-amber-500'
                              : event.metrics.consequenceScore >= 30
                              ? 'bg-blue-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${event.metrics.consequenceScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Triage Priority */}
                  <td className="py-3 px-3 sm:px-4">
                    {getPriorityBadge(event.metrics.priorityLevel)}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 sm:px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(event);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 hover:border-cyan-500/40 text-[11px] font-mono transition-all inline-flex items-center gap-1"
                    >
                      <Info className="h-3 w-3" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
