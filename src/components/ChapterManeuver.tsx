import React from 'react';
import { ManeuverIllustration } from './illustrations/ManeuverIllustration';

export const ChapterManeuver: React.FC = () => {
  return (
    <section id="maneuver" className="py-12 border-t border-neutral-200 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Chapter Marker */}
      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 mb-2">
        <span className="font-bold">05</span>
        <span>/</span>
        <span className="uppercase tracking-widest">ACTIONABLE ASTRODYNAMICS</span>
      </div>

      <h2 className="text-2xl sm:text-4xl font-serif text-neutral-900 max-w-3xl leading-snug">
        Avoidance maneuver verification & orbital phasing.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 text-sm text-neutral-600 font-serif leading-relaxed">
        <div>
          <p className="mb-4">
            Identifying a high-consequence conjunction is only half the battle. When an alert is validated as critical, satellite flight operations teams must verify whether a minor propulsion burn can resolve the threat without putting other orbital assets at risk.
          </p>
          <p>
            Rather than cross-track burns which require high propellant mass, optimal collision avoidance relies on <strong>along-track orbital phasing</strong> executed one to two days prior to the conjunction node.
          </p>
        </div>
        <div>
          <p className="mb-4">
            A small along-track impulse of just Δv ≈ 0.5 m/s slightly raises or lowers orbital altitude by tens of meters. Over the remaining 20 to 30 orbital revolutions, this minor period alteration translates to an in-track spatial displacement (Δs ≈ 3 · Δv · Δt) measuring thousands of meters at the encounter point.
          </p>
          <p>
            Use the interactive control below to simulate an along-track maneuver and watch the miss distance and collision probability evolve dynamically.
          </p>
        </div>
      </div>

      {/* Interactive Maneuver Illustration */}
      <ManeuverIllustration />
    </section>
  );
};
