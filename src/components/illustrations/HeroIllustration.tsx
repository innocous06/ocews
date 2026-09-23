import React, { useState } from 'react';

interface HeroIllustrationProps {
  theme?: 'light' | 'dark';
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({ theme = 'dark' }) => {
  const [activeShell, setActiveShell] = useState<number | null>(null);
  const isLight = theme === 'light';

  // Theme-aware colors
  const strokeColor = isLight ? '#71717a' : '#52525b';
  const mutedStroke = isLight ? '#e4e4e7' : '#27272a';
  const textColor = isLight ? '#18181b' : '#fafafa';
  const secondaryText = isLight ? '#52525b' : '#a1a1aa';
  const tertiaryText = isLight ? '#a1a1aa' : '#71717a';
  const amberColor = isLight ? '#d97706' : '#f59e0b';
  const amberBright = isLight ? '#b45309' : '#fbbf24';
  const cardFill = isLight ? '#ffffff' : '#09090b';

  return (
    <div className="relative w-full aspect-[16/10] max-w-4xl mx-auto flex items-center justify-center select-none overflow-hidden my-4 sm:my-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-obsidian-950 rounded-2xl p-4 sm:p-6 shadow-sm transition-colors duration-200">
      {/* Background celestial coordinate grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* SVG Vector Drawing */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full relative z-10 font-mono"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="earthGradDynamic" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLight ? '#f4f4f5' : '#18181b'} />
            <stop offset="75%" stopColor={isLight ? '#e4e4e7' : '#09090b'} />
            <stop offset="100%" stopColor={isLight ? '#d4d4d8' : '#030303'} />
          </radialGradient>
        </defs>

        {/* Outer Coordinate Rings */}
        <circle cx="400" cy="250" r="235" stroke={mutedStroke} strokeWidth="0.75" strokeDasharray="3 4" />
        <circle cx="400" cy="250" r="185" stroke={mutedStroke} strokeWidth="0.75" strokeDasharray="2 3" />
        <circle cx="400" cy="250" r="135" stroke={mutedStroke} strokeWidth="0.75" strokeDasharray="1 2" />

        {/* Shell 3: Sun-Synchronous Polar Choke (840 km) */}
        <ellipse
          cx="400"
          cy="250"
          rx="235"
          ry="150"
          stroke={activeShell === 840 ? amberColor : strokeColor}
          strokeWidth={activeShell === 840 ? '1.6' : '1'}
          strokeDasharray="4 4"
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setActiveShell(840)}
          onMouseLeave={() => setActiveShell(null)}
        />
        <text x="645" y="246" fill={secondaryText} fontSize="9" letterSpacing="0.05em">
          SSO SHELL (840 KM)
        </text>

        {/* Shell 2: Mega-Constellation Band (550 km) */}
        <ellipse
          cx="400"
          cy="250"
          rx="185"
          ry="115"
          stroke={activeShell === 550 ? amberColor : strokeColor}
          strokeWidth={activeShell === 550 ? '1.6' : '1'}
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setActiveShell(550)}
          onMouseLeave={() => setActiveShell(null)}
        />
        <text x="590" y="278" fill={tertiaryText} fontSize="8.5">
          MEGA-CONSTELLATION (550 KM)
        </text>

        {/* Shell 1: Decaying VLEO (310 km) */}
        <ellipse
          cx="400"
          cy="250"
          rx="135"
          ry="85"
          stroke={activeShell === 310 ? amberColor : strokeColor}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          className="cursor-pointer transition-colors duration-200"
          onMouseEnter={() => setActiveShell(310)}
          onMouseLeave={() => setActiveShell(null)}
        />
        <text x="540" y="210" fill={tertiaryText} fontSize="8">
          VLEO DECAY (310 KM)
        </text>

        {/* Central Earth Globe Sphere */}
        <g>
          {/* Earth Body */}
          <circle cx="400" cy="250" r="70" fill="url(#earthGradDynamic)" stroke={textColor} strokeWidth="1.2" />
          
          {/* Atmospheric boundary ring */}
          <circle cx="400" cy="250" r="76" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.6" />

          {/* Latitude & Longitude Linework */}
          <ellipse cx="400" cy="250" rx="70" ry="24" stroke={strokeColor} strokeWidth="0.6" strokeDasharray="2 2" />
          <ellipse cx="400" cy="250" rx="70" ry="48" stroke={mutedStroke} strokeWidth="0.5" />
          <ellipse cx="400" cy="250" rx="30" ry="70" stroke={strokeColor} strokeWidth="0.6" />
          <line x1="400" y1="180" x2="400" y2="320" stroke={strokeColor} strokeWidth="0.75" />
          <line x1="330" y1="250" x2="470" y2="250" stroke={strokeColor} strokeWidth="0.75" />

          {/* Earth Label */}
          <text x="400" y="253" fill={textColor} fontSize="10" textAnchor="middle" letterSpacing="0.2em" fontWeight="bold">
            TERRA
          </text>
          <text x="400" y="265" fill={secondaryText} fontSize="7.5" textAnchor="middle">
            R = 6,371 KM
          </text>
        </g>

        {/* Floating Debris Particles */}
        <circle cx="210" cy="180" r="1.5" fill={textColor} />
        <circle cx="225" cy="172" r="1" fill={secondaryText} />
        <circle cx="240" cy="195" r="2" fill={secondaryText} />
        <circle cx="280" cy="140" r="1.5" fill={textColor} />
        <circle cx="310" cy="120" r="1" fill={tertiaryText} />
        <circle cx="490" cy="130" r="1.5" fill={textColor} />
        <circle cx="530" cy="160" r="2" fill={secondaryText} />
        <circle cx="580" cy="220" r="1.5" fill={textColor} />
        <circle cx="560" cy="340" r="1.5" fill={tertiaryText} />
        <circle cx="480" cy="370" r="2" fill={textColor} />
        <circle cx="320" cy="380" r="1.5" fill={secondaryText} />
        <circle cx="240" cy="330" r="1" fill={tertiaryText} />
        <circle cx="180" cy="270" r="2" fill={textColor} />

        {/* Satellite 1: Operational Satellite */}
        <g transform="translate(290, 160) rotate(25)">
          <rect x="-6" y="-3" width="12" height="6" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
          <line x1="-15" y1="0" x2="-6" y2="0" stroke={amberColor} strokeWidth="0.8" />
          <line x1="6" y1="0" x2="15" y2="0" stroke={amberColor} strokeWidth="0.8" />
          <rect x="-15" y="-4" width="8" height="8" fill="none" stroke={amberColor} strokeWidth="0.6" />
          <rect x="7" y="-4" width="8" height="8" fill="none" stroke={amberColor} strokeWidth="0.6" />
        </g>

        {/* Satellite 2: Zenit Rocket Body */}
        <g transform="translate(515, 335) rotate(-35)">
          <rect x="-12" y="-4" width="24" height="8" rx="2" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
          <line x1="-4" y1="-4" x2="-4" y2="4" stroke={strokeColor} strokeWidth="0.5" />
          <line x1="4" y1="-4" x2="4" y2="4" stroke={strokeColor} strokeWidth="0.5" />
          <polygon points="12,-4 16,-6 16,6 12,4" fill="none" stroke={textColor} strokeWidth="0.7" />
          <text x="-25" y="16" fill={secondaryText} fontSize="7">SL-16 (9,000 KG)</text>
        </g>

        {/* Trajectory Arc A: Operational Sat */}
        <path
          d="M 220 320 Q 320 180 500 160"
          stroke={textColor}
          strokeWidth="1.2"
          strokeDasharray="4 2"
          fill="none"
        />

        {/* Trajectory Arc B: Cross-Track Derelict (Amber) */}
        <path
          d="M 520 100 Q 430 190 310 290"
          stroke={amberColor}
          strokeWidth="1.4"
          fill="none"
        />

        {/* Conjunction Point */}
        <g transform="translate(415, 195)">
          <circle cx="0" cy="0" r="16" stroke={amberColor} strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="8" fill={amberColor} fillOpacity="0.25" />
          <circle cx="0" cy="0" r="3" fill={amberBright} />

          {/* Caliper Leader Line */}
          <line x1="8" y1="-8" x2="45" y2="-45" stroke={amberColor} strokeWidth="0.8" />
          <line x1="45" y1="-45" x2="160" y2="-45" stroke={amberColor} strokeWidth="0.8" />

          {/* Conjunction Metadata Card */}
          <rect x="45" y="-72" width="165" height="42" fill={cardFill} stroke={amberColor} strokeWidth="0.8" rx="2" />
          <text x="52" y="-58" fill={amberBright} fontSize="8.5" fontWeight="bold">
            CONJUNCTION DETECTED • TCA
          </text>
          <text x="52" y="-46" fill={textColor} fontSize="7.5">
            MISS: 112 M • V_REL: 14.2 KM/S
          </text>
          <text x="52" y="-36" fill={secondaryText} fontSize="7">
            CONSEQUENCE SCORE: 94 / 100 (CRITICAL)
          </text>
        </g>

        {/* Figure Caption */}
        <g transform="translate(30, 440)">
          <text x="0" y="0" fill={secondaryText} fontSize="8" letterSpacing="0.1em">
            FIGURE 1.0 — ORBITAL SHELL ARCHITECTURE & CONJUNCTION GEOMETRY
          </text>
          <text x="0" y="14" fill={tertiaryText} fontSize="7">
            PROPAGATION: SGP4 • SPACE-TRACK CONJUNCTION DATA MESSAGES
          </text>
        </g>
      </svg>
    </div>
  );
};
