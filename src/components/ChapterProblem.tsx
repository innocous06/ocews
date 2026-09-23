import React from 'react';
import { ProblemIllustration } from './illustrations/ProblemIllustration';

export const ChapterProblem: React.FC = () => {
  return (
    <section id="problem" className="py-12 border-t border-neutral-900 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
        <span className="font-bold">01</span>
        <span>/</span>
        <span className="uppercase tracking-widest">THE PROBLEM</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-100 max-w-3xl leading-snug">
        Alert fatigue in an exponentially crowded sky.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 text-sm text-neutral-400 font-serif leading-relaxed">
        <div>
          <p className="mb-4">
            Today, over 40,000 artificial objects larger than 10 cm are cataloged in Earth orbit, alongside an estimated 100 million untracked millimeter-to-centimeter fragments. With mega-constellation launch cadences accelerating monthly, orbital spatial density has reached a historic critical juncture.
          </p>
          <p>
            Public tracking data is freely accessible via USSPACECOM Conjunction Data Messages (CDMs) and CelesTrak. <em>Data access is not the bottleneck</em>. The crisis lies in triage: a typical commercial or institutional satellite operator receives hundreds of alerts every week, forcing engineers to manually evaluate noisy covariance spreadsheets under tight time constraints.
          </p>
        </div>
        <div>
          <p className="mb-4">
            When every close pass sounds the same emergency siren, human operators experience cognitive exhaustion. Actionable warnings get delayed, and spacecraft burn irreplaceable onboard propellant on routine non-events.
          </p>
          <p>
            Behind this daily operational friction lies the existential risk: the <strong>Kessler Syndrome</strong>. A single catastrophic hypervelocity collision between multi-ton objects shatters thousands of new lethal fragments into cross-orbits, triggering self-sustaining secondary collisions that could close critical orbital shells for centuries.
          </p>
        </div>
      </div>

      {/* Vector Illustration */}
      <ProblemIllustration />
    </section>
  );
};
