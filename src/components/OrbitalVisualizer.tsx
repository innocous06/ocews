import React from 'react';
import { EvaluatedConjunction } from '../types/conjunction';
import { Orbit } from 'lucide-react';

interface OrbitalVisualizerProps {
  event: EvaluatedConjunction;
}

export const OrbitalVisualizer: React.FC<OrbitalVisualizerProps> = ({ event }) => {
  return (
    <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 relative overflow-hidden flex flex-col items-center">
      <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Orbit className="h-4 w-4" />
          <span>Encounter Geometry (TCA Plane)</span>
        </div>
        <div>
          <span>Inc: {event.inclinationDeg}° • Alt: {event.altitudeKm} km</span>
        </div>
      </div>

      {/* SVG Canvas for Encounter Visualization */}
      <div className="relative w-full aspect-video max-w-[460px] flex items-center justify-center my-2">
        <svg viewBox="0 0 400 240" className="w-full h-full select-none">
          {/* Background Grid Lines */}
          <defs>
            <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Range rings */}
          <circle cx="200" cy="120" r="100" fill="none" stroke="#1e293b" strokeDasharray="3 3" />
          <circle cx="200" cy="120" r="70" fill="none" stroke="#1e293b" strokeDasharray="2 2" />

          {/* Earth Body */}
          <circle cx="200" cy="120" r="46" fill="url(#earthGrad)" stroke="#38bdf8" strokeWidth="1" opacity="0.9" />
          <circle cx="200" cy="120" r="50" fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.3" />
          <text x="200" y="124" fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="middle">
            EARTH
          </text>

          {/* Primary Object Orbit Arc (Cyan) */}
          <ellipse cx="200" cy="120" rx="90" ry="72" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.85" />
          
          {/* Secondary Object Intersecting Orbit (Rose) */}
          <ellipse
            cx="200"
            cy="120"
            rx="94"
            ry="76"
            transform="rotate(-42 200 120)"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="1.8"
            strokeDasharray="4 3"
            opacity="0.8"
          />

          {/* Intersection / Conjunction Point (TCA) */}
          <g transform="translate(268, 82)">
            {/* Pulsing warning circle */}
            <circle cx="0" cy="0" r="14" fill="#f43f5e" opacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#f43f5e" opacity="0.4" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
            
            {/* Callout line */}
            <line x1="0" y1="0" x2="35" y2="-25" stroke="#f43f5e" strokeWidth="1" />
            <rect x="35" y="-38" width="90" height="22" rx="3" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="0.8" />
            <text x="40" y="-24" fill="#fecdd3" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
              TCA: {event.missDistanceM}m miss
            </text>
          </g>

          {/* Primary Satellite Position Marker */}
          <g transform="translate(250, 68)">
            <circle cx="0" cy="0" r="4" fill="#38bdf8" />
            <text x="-8" y="-8" fill="#38bdf8" fontSize="8" fontFamily="monospace">
              {event.primaryObject.name.split(' ')[0]}
            </text>
          </g>

          {/* Secondary Debris Position Marker */}
          <g transform="translate(282, 102)">
            <polygon points="0,-4 4,4 -4,4" fill="#f43f5e" />
            <text x="6" y="8" fill="#f43f5e" fontSize="8" fontFamily="monospace">
              {event.secondaryObject.name.split(' ')[0]}
            </text>
          </g>

          {/* Velocity Vector Arrow */}
          <line x1="268" y1="82" x2="295" y2="72" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        </svg>
      </div>

      {/* Geometry Legend */}
      <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-slate-800/80 pt-2 text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-cyan-400 rounded-full" />
          <span className="text-slate-400">Primary:</span>
          <span className="truncate">{event.primaryObject.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-rose-400 rounded-full" />
          <span className="text-slate-400">Target:</span>
          <span className="truncate">{event.secondaryObject.name}</span>
        </div>
      </div>
    </div>
  );
};
