import React, { useState } from 'react';

export const HeroIllustration: React.FC = () => {
  const [activeShell, setActiveShell] = useState<number | null>(null);

  return (
    <div className="relative w-full aspect-[16/10] max-w-4xl mx-auto flex items-center justify-center select-none overflow-hidden my-4 sm:my-8 border border-neutral-800/80 bg-obsidian-950 rounded-2xl p-4 sm:p-6">
      {/* Background celestial grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* SVG Vector Drawing */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full relative z-10 font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="75%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#030303" />
          </radialGradient>
          <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Coordinate Ring and Calipers */}
        <circle cx="400" cy="250" r="235" stroke="#27272a" strokeWidth="0.75" strokeDasharray="3 4" />
        <circle cx="400" cy="250" r="185" stroke="#27272a" strokeWidth="0.75" strokeDasharray="2 3" />
        <circle cx="400" cy="250" r="135" stroke="#27272a" strokeWidth="0.75" strokeDasharray="1 2" />

        {/* Shell 3: Sun-Synchronous Polar Choke (840 km) */}
        <ellipse
          cx="400"
          cy="250"
          rx="235"
          ry="150"
          stroke={activeShell === 840 ? '#f59e0b' : '#3f3f46'}
          strokeWidth={activeShell === 840 ? '1.5' : '1'}
          strokeDasharray="4 4"
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setActiveShell(840)}
          onMouseLeave={() => setActiveShell(null)}
        />
        <text x="645" y="246" fill="#a1a1aa" fontSize="9" letterSpacing="0.05em">
          SSO SHELL (840 KM)
        </text>

        {/* Shell 2: Mega-Constellation Band (550 km) */}
        <ellipse
          cx="400"
          cy="250"
          rx="185"
          ry="115"
          stroke={activeShell === 550 ? '#f59e0b' : '#52525b'}
          strokeWidth={activeShell === 550 ? '1.5' : '1'}
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setActiveShell(550)}
          onMouseLeave={() => setActiveShell(null)}
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
          stroke={activeShell === 310 ? '#f59e0b' : '#3f3f46'}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          className="cursor-pointer transition-colors duration-300"
          onMouseEnter={() => setActiveShell(310)}
          onMouseLeave={() => setActiveShell(null)}
        />
        <text x="540" y="210" fill="#71717a" fontSize="8">
          VLEO DECAY (310 KM)
        </text>

        {/* Earth Globe Sphere */}
        <g>
          {/* Earth Body */}
          <circle cx="400" cy="250" r="70" fill="url(#earthGradient)" stroke="#e4e4e7" strokeWidth="1.2" />
          
          {/* Atmospheric boundary ring */}
          <circle cx="400" cy="250" r="76" stroke="#52525b" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />

          {/* Minimalist Latitude & Longitude Linework */}
          <ellipse cx="400" cy="250" rx="70" ry="24" stroke="#3f3f46" strokeWidth="0.6" strokeDasharray="2 2" />
          <ellipse cx="400" cy="250" rx="70" ry="48" stroke="#27272a" strokeWidth="0.5" />
          <ellipse cx="400" cy="250" rx="30" ry="70" stroke="#3f3f46" strokeWidth="0.6" />
          <line x1="400" y1="180" x2="400" y2="320" stroke="#52525b" strokeWidth="0.75" />
          <line x1="330" y1="250" x2="470" y2="250" stroke="#52525b" strokeWidth="0.75" />

          {/* Minimal Earth Label */}
          <text x="400" y="253" fill="#e4e4e7" fontSize="10" textAnchor="middle" letterSpacing="0.2em" fontWeight="bold">
            TERRA
          </text>
          <text x="400" y="265" fill="#71717a" fontSize="7" textAnchor="middle">
            R = 6,371 KM
          </text>
        </g>

        {/* Floating Space Debris & Satellites (Curated field) */}
        {/* Debris particles */}
        <circle cx="210" cy="180" r="1.5" fill="#e4e4e7" />
        <circle cx="225" cy="172" r="1" fill="#71717a" />
        <circle cx="240" cy="195" r="2" fill="#a1a1aa" />
        <circle cx="280" cy="140" r="1.5" fill="#e4e4e7" />
        <circle cx="310" cy="120" r="1" fill="#71717a" />
        <circle cx="490" cy="130" r="1.5" fill="#e4e4e7" />
        <circle cx="530" cy="160" r="2" fill="#a1a1aa" />
        <circle cx="580" cy="220" r="1.5" fill="#e4e4e7" />
        <circle cx="560" cy="340" r="1.5" fill="#71717a" />
        <circle cx="480" cy="370" r="2" fill="#e4e4e7" />
        <circle cx="320" cy="380" r="1.5" fill="#a1a1aa" />
        <circle cx="240" cy="330" r="1" fill="#71717a" />
        <circle cx="180" cy="270" r="2" fill="#e4e4e7" />

        {/* Satellite 1: Operational Craft (Line illustration) */}
        <g transform="translate(290, 160) rotate(25)">
          <rect x="-6" y="-3" width="12" height="6" fill="#18181b" stroke="#f4f4f5" strokeWidth="0.8" />
          <line x1="-15" y1="0" x2="-6" y2="0" stroke="#f59e0b" strokeWidth="0.8" />
          <line x1="6" y1="0" x2="15" y2="0" stroke="#f59e0b" strokeWidth="0.8" />
          <rect x="-15" y="-4" width="8" height="8" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
          <rect x="7" y="-4" width="8" height="8" fill="none" stroke="#f59e0b" strokeWidth="0.6" />
        </g>

        {/* Satellite 2: Zenit Rocket Body (Cylinder illustration) */}
        <g transform="translate(515, 335) rotate(-35)">
          <rect x="-12" y="-4" width="24" height="8" rx="2" fill="#18181b" stroke="#e4e4e7" strokeWidth="0.8" />
          <line x1="-4" y1="-4" x2="-4" y2="4" stroke="#71717a" strokeWidth="0.5" />
          <line x1="4" y1="-4" x2="4" y2="4" stroke="#71717a" strokeWidth="0.5" />
          <polygon points="12,-4 16,-6 16,6 12,4" fill="none" stroke="#e4e4e7" strokeWidth="0.7" />
          <text x="-25" y="16" fill="#71717a" fontSize="7">SL-16 (9,000 KG)</text>
        </g>

        {/* Critical Conjunction Point Intersection (Amber Focal Point) */}
        {/* Trajectory Arc A: Operational Sat (White) */}
        <path
          d="M 220 320 Q 320 180 500 160"
          stroke="#e4e4e7"
          strokeWidth="1.2"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Trajectory Arc B: Cross-Track Derelict (Amber) */}
        <path
          d="M 520 100 Q 430 190 310 290"
          stroke="#f59e0b"
          strokeWidth="1.4"
          fill="none"
        />

        {/* Intersection Point: (X: ~412, Y: ~198) */}
        <g transform="translate(415, 195)">
          {/* Target Reticle */}
          <circle cx="0" cy="0" r="16" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" className="animate-spin" />
          <circle cx="0" cy="0" r="8" fill="#f59e0b" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="3" fill="#fbbf24" />

          {/* Caliper Leader Line */}
          <line x1="8" y1="-8" x2="45" y2="-45" stroke="#f59e0b" strokeWidth="0.8" />
          <line x1="45" y1="-45" x2="160" y2="-45" stroke="#f59e0b" strokeWidth="0.8" />

          {/* Editorial Conjunction Metadata Card */}
          <rect x="45" y="-72" width="165" height="42" fill="#09090b" stroke="#f59e0b" strokeWidth="0.8" rx="2" />
          <text x="52" y="-58" fill="#fbbf24" fontSize="8.5" fontWeight="bold">
            CONJUNCTION DETECTED • TCA
          </text>
          <text x="52" y="-46" fill="#e4e4e7" fontSize="7.5">
            MISS: 112 M • V_REL: 14.2 KM/S
          </text>
          <text x="52" y="-36" fill="#a1a1aa" fontSize="7">
            CONSEQUENCE SCORE: 94 / 100 (CRITICAL)
          </text>
        </g>

        {/* Technical Callout Legend */}
        <g transform="translate(30, 440)">
          <text x="0" y="0" fill="#a1a1aa" fontSize="8" letterSpacing="0.1em">
            FIGURE 1.0 — ORBITAL SHELL ARCHITECTURE & CONJUNCTION GEOMETRY
          </text>
          <text x="0" y="14" fill="#52525b" fontSize="7">
            ORBITAL PROPAGATION: SGP4 • CATALOG: 40,000+ SATELLITE SITUATION REPORT
          </text>
        </g>

        {/* Metric Annotations in Top Corners */}
        <g transform="translate(30, 35)">
          <text x="0" y="0" fill="#71717a" fontSize="7.5">TRACKED OBJECTS IN LEO</text>
          <text x="0" y="16" fill="#fafafa" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            40,000+
          </text>
        </g>

        <g transform="translate(670, 35)">
          <text x="0" y="0" fill="#71717a" fontSize="7.5">WEEKLY ALERT LOAD</text>
          <text x="0" y="16" fill="#f59e0b" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
            ~250 CDMs
          </text>
        </g>
      </svg>
    </div>
  );
};
