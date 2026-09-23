import React from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { BarChart3 } from 'lucide-react';

interface ShellCongestionChartProps {
  events: EvaluatedConjunction[];
  onSelectEvent: (event: EvaluatedConjunction) => void;
}

export const ShellCongestionChart: React.FC<ShellCongestionChartProps> = ({ events, onSelectEvent }) => {
  // LEO Altitude bands from 200 km to 1200 km
  const bands = [
    { range: '200-350 km', label: 'VLEO Decay', density: 15, risk: 'Low', color: 'bg-emerald-500/40' },
    { range: '350-450 km', label: 'ISS & Stations', density: 38, risk: 'Moderate', color: 'bg-blue-500/40' },
    { range: '450-600 km', label: 'Mega-Constellations', density: 92, risk: 'Critical', color: 'bg-rose-500/60' },
    { range: '600-750 km', label: 'Mid-LEO Science', density: 45, risk: 'Moderate', color: 'bg-blue-500/40' },
    { range: '750-880 km', label: 'SSO Polar Choke', density: 98, risk: 'Critical', color: 'bg-rose-500/70' },
    { range: '880-1050 km', label: 'Upper LEO Graveyard', density: 72, risk: 'High', color: 'bg-amber-500/50' },
    { range: '1050-1200 km', label: 'Constellation Periphery', density: 40, risk: 'Moderate', color: 'bg-blue-500/40' },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:p-5 backdrop-blur">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wide">
            LEO Shell Congestion & Kessler Density Hotspots
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          Altitude Distribution (200 - 1,200 km)
        </span>
      </div>

      <div className="space-y-3">
        {bands.map((band, idx) => {
          // Find if any events fall into this altitude range
          const matchingEvents = events.filter(e => {
            if (idx === 0) return e.altitudeKm < 350;
            if (idx === 1) return e.altitudeKm >= 350 && e.altitudeKm < 450;
            if (idx === 2) return e.altitudeKm >= 450 && e.altitudeKm < 600;
            if (idx === 3) return e.altitudeKm >= 600 && e.altitudeKm < 750;
            if (idx === 4) return e.altitudeKm >= 750 && e.altitudeKm < 880;
            if (idx === 5) return e.altitudeKm >= 880 && e.altitudeKm < 1050;
            return e.altitudeKm >= 1050;
          });

          return (
            <div key={band.range} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-medium w-24 sm:w-28">{band.range}</span>
                  <span className="text-slate-400 text-[11px] hidden sm:inline">({band.label})</span>
                </div>
                <div className="flex items-center gap-2">
                  {matchingEvents.map(ev => (
                    <button
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      title={`Click to view: ${ev.primaryObject.name} vs ${ev.secondaryObject.name}`}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 hover:border-cyan-400 hover:bg-cyan-900 transition-colors"
                    >
                      {ev.primaryObject.name.split(' ')[0]} @ {ev.altitudeKm}km
                    </button>
                  ))}
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    band.risk === 'Critical' ? 'text-rose-400' : band.risk === 'High' ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {band.risk} Density
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${band.color}`}
                  style={{ width: `${band.density}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <span>Kessler cascade risk compounds exponentially in bands above 75% density.</span>
        <span className="text-cyan-400">Data modeled after ESA DISCOS & USSPACECOM</span>
      </div>
    </div>
  );
};
