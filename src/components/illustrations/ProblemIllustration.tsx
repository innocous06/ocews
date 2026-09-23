import React from 'react';

export const ProblemIllustration: React.FC = () => {
  return (
    <div className="w-full border border-neutral-800 bg-obsidian-950 rounded-xl p-5 my-6 overflow-hidden select-none font-mono">
      <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-2 mb-4">
        <span className="text-amber-400 font-semibold tracking-wide">
          DIAGRAM 01 • THE KESSLER CASCADE MECHANISM
        </span>
        <span>HYPERVELOCITY BREAKUP REGIME (&gt;10 KM/S)</span>
      </div>

      <svg viewBox="0 0 700 240" className="w-full h-auto text-xs" fill="none">
        {/* Orbital trajectory lines */}
        <line x1="40" y1="80" x2="260" y2="120" stroke="#71717a" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="260" y1="40" x2="260" y2="200" stroke="#f59e0b" strokeWidth="1.2" />

        {/* Incoming Objects */}
        {/* Target Payload */}
        <g transform="translate(140, 98)">
          <rect x="-6" y="-3" width="12" height="6" fill="#18181b" stroke="#e4e4e7" strokeWidth="0.8" />
          <line x1="-10" y1="0" x2="-6" y2="0" stroke="#a1a1aa" />
          <line x1="6" y1="0" x2="10" y2="0" stroke="#a1a1aa" />
          <text x="-24" y="-8" fill="#a1a1aa" fontSize="8">ACTIVE ASSET</text>
        </g>

        {/* Incoming Derelict Rocket Body */}
        <g transform="translate(260, 65)">
          <rect x="-4" y="-10" width="8" height="20" rx="1" fill="#18181b" stroke="#f59e0b" strokeWidth="0.8" />
          <text x="12" y="2" fill="#fbbf24" fontSize="8">DERELICT (9,000 KG)</text>
          <line x1="0" y1="12" x2="0" y2="28" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow)" />
        </g>

        {/* Collision Point (X: 260, Y: 120) */}
        <g transform="translate(260, 120)">
          {/* Shock ring */}
          <circle cx="0" cy="0" r="18" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="8" fill="#f59e0b" fillOpacity="0.3" />
          <circle cx="0" cy="0" r="2.5" fill="#fafafa" />
          <text x="-70" y="28" fill="#f59e0b" fontSize="8" fontWeight="bold">HYPERVELOCITY IMPACT</text>
          <text x="-70" y="38" fill="#71717a" fontSize="7.5">v_rel = 14.2 km/s (14.8 GJ)</text>
        </g>

        {/* Expanding Breakup Cone & Fragments */}
        {/* Cone envelope */}
        <path d="M 260 120 L 640 40 L 640 200 Z" fill="#f59e0b" fillOpacity="0.03" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Shrapnel Field */}
        <g>
          {/* Near shrapnel */}
          <circle cx="310" cy="115" r="1.5" fill="#fafafa" />
          <circle cx="330" cy="95" r="1" fill="#fbbf24" />
          <circle cx="340" cy="135" r="2" fill="#fafafa" />
          <circle cx="370" cy="105" r="1.5" fill="#a1a1aa" />
          <circle cx="380" cy="145" r="1.2" fill="#f59e0b" />
          <circle cx="410" cy="80" r="1.8" fill="#fafafa" />
          <circle cx="420" cy="120" r="2" fill="#fbbf24" />
          <circle cx="430" cy="165" r="1.5" fill="#a1a1aa" />

          {/* Far dispersed field */}
          <circle cx="480" cy="65" r="1" fill="#f59e0b" />
          <circle cx="500" cy="110" r="2" fill="#fafafa" />
          <circle cx="515" cy="150" r="1.5" fill="#fbbf24" />
          <circle cx="530" cy="85" r="1.2" fill="#a1a1aa" />
          <circle cx="545" cy="180" r="1.8" fill="#fafafa" />
          <circle cx="580" cy="55" r="1.5" fill="#f59e0b" />
          <circle cx="595" cy="100" r="2" fill="#fafafa" />
          <circle cx="610" cy="135" r="1.5" fill="#fbbf24" />
          <circle cx="620" cy="175" r="1" fill="#a1a1aa" />
          <circle cx="635" cy="195" r="1.8" fill="#fafafa" />
        </g>

        {/* Downstream Impact Strike */}
        <g transform="translate(540, 115)">
          <circle cx="0" cy="0" r="8" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="2 2" />
          <rect x="-4" y="-2" width="8" height="4" fill="#27272a" stroke="#ef4444" strokeWidth="0.6" />
          <text x="12" y="2" fill="#ef4444" fontSize="7.5">SECONDARY STRIKE (CASCADE)</text>
        </g>

        {/* Summary Annotation */}
        <g transform="translate(430, 225)">
          <text x="0" y="0" fill="#a1a1aa" fontSize="8">
            RESULT: 14,000+ LETHAL FRAGMENTS (&gt;10CM) • LIFETIME: 160+ YEARS
          </text>
        </g>
      </svg>
    </div>
  );
};
