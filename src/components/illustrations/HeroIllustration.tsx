import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const HeroIllustration: React.FC = () => {
  const [activeShell, setActiveShell] = useState<number | null>(null);
  const [debrisDensity, setDebrisDensity] = useState<number>(30); // 10 to 60 debris dots
  const [tcaHours, setTcaHours] = useState<number>(12); // 36 to 0 hours
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Play animation timer
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setTcaHours(prev => {
          if (prev <= 0.5) {
            setIsPlaying(false);
            return 0;
          }
          return parseFloat((prev - 0.5).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Positions of the two craft parameterized by tcaHours (36h -> 0h)
  // At 0h they are at conjunction point (415, 195)
  const progress = 1 - tcaHours / 36; // 0 to 1
  const sat1X = 240 + progress * (415 - 240);
  const sat1Y = 280 - progress * (280 - 195);

  const sat2X = 500 - progress * (500 - 415);
  const sat2Y = 120 + progress * (195 - 120);

  const currentMissM = Math.round(112 + (1 - progress) * 14200);

  // Generate debris particles deterministically
  const debrisParticles = Array.from({ length: debrisDensity }, (_, i) => {
    const angle = (i * 360) / debrisDensity;
    const radiusX = 120 + (i % 3) * 55 + (i * 7) % 20;
    const radiusY = 80 + (i % 3) * 35 + (i * 5) % 15;
    const rad = (angle * Math.PI) / 180;
    const cx = Math.round(400 + radiusX * Math.cos(rad));
    const cy = Math.round(250 + radiusY * Math.sin(rad));
    return { cx, cy, r: (i % 3 === 0 ? 1.8 : 1.2) };
  });

  return (
    <div className="border border-neutral-200 bg-white rounded-2xl p-5 sm:p-6 my-6 shadow-sm select-none font-mono">
      {/* Interactive Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-200 text-xs">
        {/* Shell Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-neutral-500 uppercase text-[10px] tracking-wider">SHELL FILTER:</span>
          {[
            { label: 'All Shells', val: null },
            { label: '310 km VLEO', val: 310 },
            { label: '550 km Mega-Constellation', val: 550 },
            { label: '840 km SSO Polar', val: 840 },
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setActiveShell(s.val)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeShell === s.val
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Play / Pause / Reset for Time Scrubbing */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-[11px] font-mono transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>{isPlaying ? 'Pause' : 'Simulate TCA'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTcaHours(36);
            }}
            title="Reset to T-36 hours"
            className="p-1 rounded border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Scrubbing Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 mb-3 border-b border-neutral-100 text-[11px]">
        {/* Time Scrubbing Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">TIME TO CLOSEST APPROACH (TCA):</span>
            <span className="text-amber-700 font-bold">{tcaHours.toFixed(1)} hrs remaining</span>
          </div>
          <input
            type="range"
            min="0"
            max="36"
            step="0.5"
            value={36 - tcaHours}
            onChange={(e) => {
              setIsPlaying(false);
              setTcaHours(36 - parseFloat(e.target.value));
            }}
            className="w-full accent-amber-600 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>T-36h (Far)</span>
            <span>T-18h</span>
            <span>T-0h (TCA Node)</span>
          </div>
        </div>

        {/* Debris Density Slider */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-neutral-500">SIMULATED DEBRIS DENSITY:</span>
            <span className="text-neutral-800 font-bold">{debrisDensity * 120} tracked fragments</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={debrisDensity}
            onChange={(e) => setDebrisDensity(parseInt(e.target.value))}
            className="w-full accent-neutral-800 h-1 bg-neutral-200 rounded cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>Nominal (1,200)</span>
            <span>Standard (3,600)</span>
            <span>Dense Catalog (7,200)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full aspect-[16/10] max-w-4xl mx-auto flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full relative z-10 font-mono"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="earthGradLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#f4f4f5" />
              <stop offset="100%" stopColor="#e4e4e7" />
            </radialGradient>
          </defs>

          {/* Coordinate grid rings */}
          <circle cx="400" cy="250" r="235" stroke="#e4e4e7" strokeWidth="0.75" strokeDasharray="3 4" />
          <circle cx="400" cy="250" r="185" stroke="#e4e4e7" strokeWidth="0.75" strokeDasharray="2 3" />
          <circle cx="400" cy="250" r="135" stroke="#e4e4e7" strokeWidth="0.75" strokeDasharray="1 2" />

          {/* Shell 3: Sun-Synchronous Polar Choke (840 km) */}
          <ellipse
            cx="400"
            cy="250"
            rx="235"
            ry="150"
            stroke={activeShell === 840 ? '#d97706' : '#a1a1aa'}
            strokeWidth={activeShell === 840 ? '1.8' : '1'}
            strokeDasharray="4 4"
            className="cursor-pointer transition-colors duration-200"
            onClick={() => setActiveShell(activeShell === 840 ? null : 840)}
          />
          <text x="645" y="246" fill="#71717a" fontSize="9" letterSpacing="0.05em">
            SSO SHELL (840 KM)
          </text>

          {/* Shell 2: Mega-Constellation Band (550 km) */}
          <ellipse
            cx="400"
            cy="250"
            rx="185"
            ry="115"
            stroke={activeShell === 550 ? '#d97706' : '#a1a1aa'}
            strokeWidth={activeShell === 550 ? '1.8' : '1'}
            className="cursor-pointer transition-colors duration-200"
            onClick={() => setActiveShell(activeShell === 550 ? null : 550)}
          />
          <text x="590" y="278" fill="#71717a" fontSize="8.5">
            MEGA-CONSTELLATION (550 KM)
          </text>

          {/* Shell 1: Decaying VLEO (310 km) */}
          <ellipse
            cx="400"
            cy="250"
            rx="135"
            ry="85"
            stroke={activeShell === 310 ? '#d97706' : '#a1a1aa'}
            strokeWidth="0.8"
            strokeDasharray="2 2"
            className="cursor-pointer transition-colors duration-200"
            onClick={() => setActiveShell(activeShell === 310 ? null : 310)}
          />
          <text x="540" y="210" fill="#a1a1aa" fontSize="8">
            VLEO DECAY (310 KM)
          </text>

          {/* Earth Body */}
          <g>
            <circle cx="400" cy="250" r="70" fill="url(#earthGradLight)" stroke="#18181b" strokeWidth="1.2" />
            <circle cx="400" cy="250" r="76" stroke="#71717a" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />

            {/* Latitude & Longitude lines */}
            <ellipse cx="400" cy="250" rx="70" ry="24" stroke="#a1a1aa" strokeWidth="0.6" strokeDasharray="2 2" />
            <ellipse cx="400" cy="250" rx="70" ry="48" stroke="#d4d4d8" strokeWidth="0.5" />
            <ellipse cx="400" cy="250" rx="30" ry="70" stroke="#a1a1aa" strokeWidth="0.6" />
            <line x1="400" y1="180" x2="400" y2="320" stroke="#71717a" strokeWidth="0.75" />
            <line x1="330" y1="250" x2="470" y2="250" stroke="#71717a" strokeWidth="0.75" />

            <text x="400" y="253" fill="#18181b" fontSize="10" textAnchor="middle" letterSpacing="0.2em" fontWeight="bold">
              TERRA
            </text>
            <text x="400" y="265" fill="#71717a" fontSize="7.5" textAnchor="middle">
              R = 6,371 KM
            </text>
          </g>

          {/* Floating Debris Cloud (Generated deterministically from density slider) */}
          {debrisParticles.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={i % 4 === 0 ? '#d97706' : '#71717a'} />
          ))}

          {/* Trajectory Arc A: Primary Craft Track (Black line) */}
          <path
            d="M 220 320 Q 320 180 500 160"
            stroke="#18181b"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Trajectory Arc B: Intersecting Debris Track (Amber line) */}
          <path
            d="M 520 100 Q 430 190 310 290"
            stroke="#d97706"
            strokeWidth="1.4"
            fill="none"
          />

          {/* Conjunction Point TCA Intersection (415, 195) */}
          <g transform="translate(415, 195)">
            <circle cx="0" cy="0" r="14" stroke="#d97706" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="6" fill="#d97706" fillOpacity="0.2" />
            <circle cx="0" cy="0" r="2.5" fill="#b45309" />
          </g>

          {/* Dynamic Moving Primary Satellite (X: sat1X, Y: sat1Y) */}
          <g transform={`translate(${sat1X}, ${sat1Y})`}>
            <rect x="-6" y="-3" width="12" height="6" fill="#ffffff" stroke="#18181b" strokeWidth="0.8" />
            <line x1="-12" y1="0" x2="-6" y2="0" stroke="#d97706" strokeWidth="0.8" />
            <line x1="6" y1="0" x2="12" y2="0" stroke="#d97706" strokeWidth="0.8" />
            <text x="-25" y="-8" fill="#18181b" fontSize="8" fontWeight="bold">
              ONEWEB-SAT
            </text>
          </g>

          {/* Dynamic Moving Zenit Rocket Body (X: sat2X, Y: sat2Y) */}
          <g transform={`translate(${sat2X}, ${sat2Y}) rotate(-35)`}>
            <rect x="-12" y="-4" width="24" height="8" rx="1.5" fill="#ffffff" stroke="#d97706" strokeWidth="1.2" />
            <line x1="-4" y1="-4" x2="-4" y2="4" stroke="#a1a1aa" strokeWidth="0.5" />
            <line x1="4" y1="-4" x2="4" y2="4" stroke="#a1a1aa" strokeWidth="0.5" />
            <polygon points="12,-4 16,-6 16,6 12,4" fill="none" stroke="#d97706" strokeWidth="0.8" />
            <text x="-20" y="16" fill="#d97706" fontSize="7.5" fontWeight="bold">
              SL-16 (9T)
            </text>
          </g>

          {/* Range Caliper between the two closing objects */}
          <line x1={sat1X} y1={sat1Y} x2={sat2X} y2={sat2Y} stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
          
          {/* Dynamic Metadata Card attached to midpoint */}
          <g transform={`translate(${(sat1X + sat2X) / 2 + 15}, ${(sat1Y + sat2Y) / 2 - 30})`}>
            <rect x="0" y="0" width="160" height="38" fill="#ffffff" stroke="#d97706" strokeWidth="0.8" rx="2" />
            <text x="8" y="14" fill="#b45309" fontSize="8" fontWeight="bold">
              CLOSING: {currentMissM.toLocaleString()} M
            </text>
            <text x="8" y="24" fill="#18181b" fontSize="7.5">
              CLOSING SPEED: 14.2 KM/S
            </text>
            <text x="8" y="32" fill="#71717a" fontSize="6.5">
              TCA IN {tcaHours.toFixed(1)} HOURS
            </text>
          </g>

          {/* Caption */}
          <g transform="translate(30, 460)">
            <text x="0" y="0" fill="#71717a" fontSize="8" letterSpacing="0.08em">
              FIGURE 1.0 — ORBITAL CONJUNCTION PHASING & CATALOG SITUATION
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
