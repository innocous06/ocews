import React from 'react';
import { BreakupPhysicsIllustration } from './illustrations/BreakupPhysicsIllustration';

export const ChapterPhysics: React.FC = () => {
  return (
    <section id="physics" className="py-12 border-t border-neutral-200 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 mb-2">
        <span className="font-bold">03</span>
        <span>/</span>
        <span className="uppercase tracking-widest">THE MATHEMATICS & FORMULATION</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-900 max-w-3xl leading-snug">
        Why not machine learning? Transparent physics-based scoring.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 text-sm text-neutral-600 font-serif leading-relaxed">
        <div>
          <p className="mb-4">
            A common hackathon suggestion is training a machine learning classifier on conjunction records. We explicitly rejected this approach: catastrophic satellite collisions in spaceflight history number in the single digits (Iridium 33 and Kosmos 2251 in 2009; Kosmos 1408 ASAT). There is no statistically valid training distribution of catastrophic collisions.
          </p>
          <p>
            An operator managing a $500M national spacecraft or an aerospace underwriter evaluating fleet insurance will never trust an uninterpretable neural network.
          </p>
        </div>
        <div>
          <p className="mb-4">
            Instead, OCEWS is grounded in <strong>transparent, peer-reviewed astrodynamics and NASA break-up mechanics</strong>. Every single variable — relative velocity, reduced mass, specific impact energy, and atmospheric scale height — is deterministic, auditable, and physically explainable.
          </p>
          <p>
            By combining physical fragmentation thresholds with orbital debris residence lifetimes, we calculate an auditable consequence index (0 to 100) that informs decision-makers immediately.
          </p>
        </div>
      </div>

      {/* Interactive Physics Illustration & Formula Cards */}
      <BreakupPhysicsIllustration />
    </section>
  );
};
