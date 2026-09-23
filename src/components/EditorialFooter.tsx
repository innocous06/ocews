import React from 'react';
import { ExternalLink, Code2 } from 'lucide-react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="border-t border-neutral-900 bg-[#030303] py-12 text-xs font-mono text-neutral-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="max-w-md">
            <span className="text-neutral-200 font-bold tracking-widest text-sm block">OCEWS</span>
            <span className="text-neutral-400 font-serif italic text-xs block mt-0.5">
              Orbital Collision Early-Warning System
            </span>
            <p className="text-[11px] text-neutral-500 mt-2 font-sans leading-relaxed">
              Developed for HackConquest 2026 by <strong>Team Axilla</strong>. A physics-grounded astrodynamics prototype prioritizing space debris hazards by consequence, not just probability.
            </p>
          </div>

          <div className="space-y-2 text-[11px]">
            <span className="text-neutral-300 font-bold block uppercase tracking-wider text-[10px]">
              RESOURCES & REPOSITORY
            </span>
            <a
              href="https://github.com/innocous06/ocews"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-400 transition-colors"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>GitHub Repository (innocous06/ocews)</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <div className="text-neutral-600">
              Deployment: GitHub Pages & Cloudflare Pages Static Distribution
            </div>
          </div>
        </div>

        {/* References / Colophon */}
        <div className="border-t border-neutral-900 pt-6 text-[10px] text-neutral-600 space-y-1">
          <span className="text-neutral-400 font-bold block uppercase tracking-wider text-[9px] mb-1">
            SCIENTIFIC & ASTRODYNAMICS CITATIONS
          </span>
          <p>• NASA-NSS-1740.14: Guidelines and Assessment Procedures for Limiting Orbital Debris.</p>
          <p>• Kessler, D. J., & Cour-Palais, B. G. (1978). Collision frequency of artificial satellites: The creation of a debris belt.</p>
          <p>• Hoots, F. R., & Roehrich, R. L. (1980). Models for Propagation of NORAD Element Sets (SGP4/SDP4).</p>
          <p>• European Space Agency (ESA) Space Debris Office, DISCOS Database & Kelvins Conjunction Benchmark.</p>
        </div>

        <div className="border-t border-neutral-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600">
          <span>© 2026 Team Axilla • HackConquest 2026. Released under the MIT License.</span>
          <span className="text-neutral-500 font-serif italic mt-1 sm:mt-0">
            Ad astra per aspera.
          </span>
        </div>
      </div>
    </footer>
  );
};
