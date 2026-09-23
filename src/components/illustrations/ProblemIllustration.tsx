import React from 'react';

interface ProblemIllustrationProps {
  theme?: 'light' | 'dark';
}

export const ProblemIllustration: React.FC<ProblemIllustrationProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';

  const strokeColor = isLight ? '#71717a' : '#a1a1aa';
  const textColor = isLight ? '#18181b' : '#fafafa';
  const mutedText = isLight ? '#71717a' : '#a1a1aa';
  const amberColor = isLight ? '#d97706' : '#f59e0b';
  const amberBright = isLight ? '#b45309' : '#fbbf24';
  const cardFill = isLight ? '#ffffff' : '#18181b';

  return (
    <div className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-obsidian-950 rounded-xl p-5 my-6 overflow-hidden select-none font-mono shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">
        <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wide">
          DIAGRAM 01 • THE KESSLER CASCADE MECHANISM
        </span>
        <span className="text-neutral-500">HYPERVELOCITY BREAKUP REGIME (&gt;10 KM/S)</span>
      </div>

      <svg viewBox="0 0 700 240" className="w-full h-auto text-xs" fill="none">
        {/* Orbital trajectory lines */}
        <line x1="40" y1="80" x2="260" y2="120" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 3" />
        <line x1="260" y1="40" x2="260" y2="200" stroke={amberColor} strokeWidth="1.2" />

        {/* Target Payload */}
        <g transform="translate(140, 98)">
          <rect x="-6" y="-3" width="12" height="6" fill={cardFill} stroke={textColor} strokeWidth="0.8" />
          <line x1="-10" y1="0" x2="-6" y2="0" stroke={strokeColor} />
          <line x1="6" y1="0" x2="10" y2="0" stroke={strokeColor} />
          <text x="-24" y="-8" fill={mutedText} fontSize="8">ACTIVE ASSET</text>
        </g>

        {/* Incoming Derelict Rocket Body */}
        <g transform="translate(260, 65)">
          <rect x="-4" y="-10" width="8" height="20" rx="1" fill={cardFill} stroke={amberColor} strokeWidth="0.8" />
          <text x="12" y="2" fill={amberBright} fontSize="8">DERELICT (9,000 KG)</text>
          <line x1="0" y1="12" x2="0" y2="28" stroke={amberColor} strokeWidth="1" />
        </g>

        {/* Collision Point */}
        <g transform="translate(260, 120)">
          <circle cx="0" cy="0" r="18" stroke={amberColor} strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="8" fill={amberColor} fillOpacity="0.25" />
          <circle cx="0" cy="0" r="2.5" fill={textColor} />
          <text x="-70" y="28" fill={amberColor} fontSize="8" fontWeight="bold">HYPERVELOCITY IMPACT</text>
          <text x="-70" y="38" fill={mutedText} fontSize="7.5">v_rel = 14.2 km/s (14.8 GJ)</text>
        </g>

        {/* Expanding Breakup Cone Envelope */}
        <path d="M 260 120 L 640 40 L 640 200 Z" fill={amberColor} fillOpacity="0.05" stroke={amberColor} strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Shrapnel Field */}
        <g>
          <circle cx="310" cy="115" r="1.5" fill={textColor} />
          <circle cx="330" cy="95" r="1" fill={amberColor} />
          <circle cx="340" cy="135" r="2" fill={textColor} />
          <circle cx="370" cy="105" r="1.5" fill={mutedText} />
          <circle cx="380" cy="145" r="1.2" fill={amberColor} />
          <circle cx="410" cy="80" r="1.8" fill={textColor} />
          <circle cx="420" cy="120" r="2" fill={amberColor} />
          <circle cx="430" cy="165" r="1.5" fill={mutedText} />

          <circle cx="480" cy="65" r="1" fill={amberColor} />
          <circle cx="500" cy="110" r="2" fill={textColor} />
          <circle cx="515" cy="150" r="1.5" fill={amberBright} />
          <circle cx="530" cy="85" r="1.2" fill={mutedText} />
          <circle cx="545" cy="180" r="1.8" fill={textColor} />
          <circle cx="580" cy="55" r="1.5" fill={amberColor} />
          <circle cx="595" cy="100" r="2" fill={textColor} />
          <circle cx="610" cy="135" r="1.5" fill={amberBright} />
          <circle cx="620" cy="175" r="1" fill={mutedText} />
          <circle cx="635" cy="195" r="1.8" fill={textColor} />
        </g>

        {/* Downstream Impact Strike */}
        <g transform="translate(540, 115)">
          <circle cx="0" cy="0" r="8" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="-4" y="-2" width="8" height="4" fill={cardFill} stroke="#ef4444" strokeWidth="0.6" />
          <text x="12" y="2" fill="#ef4444" fontSize="7.5">SECONDARY STRIKE (CASCADE)</text>
        </g>

        {/* Summary Caption */}
        <g transform="translate(430, 225)">
          <text x="0" y="0" fill={mutedText} fontSize="8">
            RESULT: 14,000+ LETHAL FRAGMENTS (&gt;10CM) • LIFETIME: 160+ YEARS
          </text>
        </g>
      </svg>
    </div>
  );
};
