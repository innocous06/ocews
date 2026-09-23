import React from 'react';
import { BlindspotIllustration } from './illustrations/BlindspotIllustration';

export const ChapterBlindspot: React.FC = () => {
  return (
    <section id="blindspot" className="py-12 border-t border-neutral-200 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 mb-2">
        <span className="font-bold">02</span>
        <span>/</span>
        <span className="uppercase tracking-widest">THE CRITICAL BLINDSPOT</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-900 max-w-3xl leading-snug">
        Probability alone is dangerously misleading.
      </h2>

      <div className="my-6 text-sm text-neutral-600 font-serif leading-relaxed max-w-3xl">
        <p className="mb-4">
          All modern conjunction assessment feeds sort events by <span className="font-mono text-amber-700 font-semibold">P_c</span> (Probability of Collision), calculated from position covariance ellipsoids and miss distance. But probability measures <em>proximity uncertainty</em> — it is blind to <em>physical outcome severity</em>.
        </p>
        <p>
          Two conjunctions can have identical collision probabilities, yet one would be a harmless puff of aluminum and the other would permanently destroy global satellite navigation. No existing tool ranks alerts by how catastrophic the outcome would be.
        </p>
      </div>

      {/* Interactive Vector Illustration */}
      <BlindspotIllustration />
    </section>
  );
};
