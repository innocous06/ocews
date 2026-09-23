import React from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { Orbit } from 'lucide-react';

interface OrbitalVisualizerProps {
  event: EvaluatedConjunction;
}

export const OrbitalVisualizer: React.FC<OrbitalVisualizerProps> = ({ event }) => {
  return (
    <div className="bg-[#020202] border border-neutral-900 rounded-xl p-4 relative overflow-hidden flex flex-col items-center select-none font-mono">
      <div className="w-full flex items-center justify-between text-xs text-neutral-500 mb-2 border-b border-neutral-900 pb-2">
        <div className="flex items-center gap-1.5 text-neutral-200 font-semibold">
          <Orbit className="h-3.5 w-3.5 text-amber-400" />
          <span>ENCOUNTER GEOMETRY (TCA PLANE)</span>
        </div>
        <div>
          <span>INC: {event.inclinationDeg}° • ALT: {event.altitudeKm} KM</span>
        </div>
      </div>

      {/* SVG Canvas for Encounter Visualization */}
      <div className="relative w-full aspect-video max-w-[460px] flex items-center justify-center my-2">
        <svg viewBox="0 0 400 240" className="w-full h-full">
          <defs>
            <radialGradient id="earthGradMono" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="70%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
          </defs>

          {/* Range rings */}
          <circle cx="200" cy="120" r="100" fill="none" stroke="#27272a" strokeDasharray="3 3" />
          <circle cx="200" cy="120" r="70" fill="none" stroke="#27272a" strokeDasharray="2 2" />

          {/* Earth Body */}
          <circle cx="200" cy="120" r="46" fill="url(#earthGradMono)" stroke="#71717a" strokeWidth="1" />
          <circle cx="200" cy="120" r="50" fill="none" stroke="#3f3f46" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x="200" y="124" fill="#a1a1aa" fontSize="9" textAnchor="middle" letterSpacing="0.1em">
            EARTH
          </text>

          {/* Primary Object Orbit Arc (White) */}
          <ellipse cx="200" cy="120" rx="90" ry="72" fill="none" stroke="#fafafa" strokeWidth="1.5" opacity="0.85" />
          
          {/* Secondary Object Intersecting Orbit (Amber) */}
          <ellipse
            cx="200"
            cy="120"
            rx="94"
            ry="76"
            transform="rotate(-42 200 120)"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            opacity="0.9"
          />

          {/* Intersection / Conjunction Point (TCA) */}
          <g transform="translate(268, 82)">
            {/* Warning pulse */}
            <circle cx="0" cy="0" r="14" fill="#f59e0b" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#f59e0b" opacity="0.35" />
            <circle cx="0" cy="0" r="3" fill="#fbbf24" />
            
            {/* Callout line */}
            <line x1="0" y1="0" x2="35" y2="-25" stroke="#f59e0b" strokeWidth="0.8" />
            <rect x="35" y="-38" width="96" height="22" rx="2" fill="#09090b" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="40" y="-24" fill="#fbbf24" fontSize="8" fontWeight="bold">
              TCA: {event.missDistanceM}M MISS
            </text>
          </g>

          {/* Primary Satellite Position Marker */}
          <g transform="translate(250, 68)">
            <circle cx="0" cy="0" r="3.5" fill="#fafafa" />
            <text x="-10" y="-8" fill="#a1a1aa" fontSize="7.5">
              {event.primaryObject.name.split(' ')[0]}
            </text>
          </g>

          {/* Secondary Debris Position Marker */}
          <g transform="translate(282, 102)">
            <polygon points="0,-4 4,4 -4,4" fill="#f59e0b" />
            <text x="6" y="8" fill="#f59e0b" fontSize="7.5">
              {event.secondaryObject.name.split(' ')[0]}
            </text>
          </g>
        </svg>
      </div>

      {/* Geometry Legend */}
      <div className="w-full grid grid-cols-2 gap-2 text-[10px] border-t border-neutral-900 pt-2 text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-neutral-200 rounded-full" />
          <span className="text-neutral-500">PRIMARY:</span>
          <span className="truncate text-neutral-300">{event.primaryObject.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-amber-400 rounded-full" />
          <span className="text-neutral-500">TARGET:</span>
          <span className="truncate text-amber-300">{event.secondaryObject.name}</span>
        </div>
      </div>
    </div>
  );
};
