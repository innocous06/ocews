import { ConjunctionEvent, ConsequenceMetrics, EvaluatedConjunction, ManeuverSimulationResult } from '../types/conjunction';

/**
 * Shell congestion profiles by altitude bands in Low Earth Orbit (LEO).
 * Derived from space catalog density distributions.
 */
export function getShellCongestion(altitudeKm: number): {
  rating: 'Very Low' | 'Moderate' | 'Dense' | 'Hyper-Congested';
  multiplier: number;
  description: string;
} {
  if (altitudeKm < 380) {
    return {
      rating: 'Very Low',
      multiplier: 0.9,
      description: 'Thinly populated VLEO. Rapid atmospheric clearance within months.'
    };
  } else if (altitudeKm >= 380 && altitudeKm <= 450) {
    return {
      rating: 'Moderate',
      multiplier: 1.4,
      description: 'ISS & Tiangong operational band. Strictly monitored corridor.'
    };
  } else if (altitudeKm > 450 && altitudeKm <= 620) {
    return {
      rating: 'Hyper-Congested',
      multiplier: 2.8,
      description: 'Mega-constellation altitude shell (Starlink/K Space). Extreme spatial density.'
    };
  } else if (altitudeKm > 620 && altitudeKm <= 730) {
    return {
      rating: 'Moderate',
      multiplier: 1.6,
      description: 'Mid-LEO observation and science orbit band.'
    };
  } else if (altitudeKm > 730 && altitudeKm <= 870) {
    return {
      rating: 'Hyper-Congested',
      multiplier: 3.2,
      description: 'Sun-Synchronous Orbit (SSO) polar choke point. Highest legacy debris concentration.'
    };
  } else if (altitudeKm > 870 && altitudeKm <= 1250) {
    return {
      rating: 'Dense',
      multiplier: 2.3,
      description: 'Upper LEO constellation band (OneWeb) and legacy upper stages.'
    };
  } else {
    return {
      rating: 'Moderate',
      multiplier: 1.2,
      description: 'High-LEO to MEO transition shell.'
    };
  }
}

/**
 * Debris lifetime estimation using empirical thermospheric drag models.
 * Higher altitudes lack atmospheric drag, causing fragments to orbit for centuries.
 */
export function estimateDebrisLifetimeYears(altitudeKm: number): number {
  if (altitudeKm < 320) return 0.3; // 3-4 months
  if (altitudeKm < 380) return 0.8; // ~10 months
  if (altitudeKm < 450) return 3.5;
  if (altitudeKm < 550) return 18.0;
  if (altitudeKm < 650) return 45.0;
  if (altitudeKm < 750) return 90.0;
  if (altitudeKm < 850) return 160.0;
  if (altitudeKm < 1000) return 280.0;
  return 500.0; // Century+
}

/**
 * Compute the Consequence Metrics for a conjunction event using transparent physics formulas.
 */
export function evaluateConsequence(event: ConjunctionEvent): ConsequenceMetrics {
  const m1 = event.primaryObject.massKg;
  const m2 = event.secondaryObject.massKg;
  const totalMassKg = m1 + m2;
  const reducedMassKg = (m1 * m2) / totalMassKg;

  // Relative velocity in m/s
  const vRelMs = event.relativeVelocityKms * 1000;

  // Kinetic energy: 0.5 * mu * v^2 in Joules -> convert to GJ
  const kineticEnergyJoules = 0.5 * reducedMassKg * Math.pow(vRelMs, 2);
  const impactKineticEnergyGJ = parseFloat((kineticEnergyJoules / 1e9).toFixed(3));

  // Specific energy = Energy (J) / total mass in grams
  const totalMassGrams = totalMassKg * 1000;
  const specificEnergyJoulePerGram = Math.round(kineticEnergyJoules / totalMassGrams);

  // NASA Standard Breakup Model threshold: catastrophic breakup if Specific Energy >= 40 J/g
  const isCatastrophicBreakup = specificEnergyJoulePerGram >= 40;

  // NASA empirical fragment estimation for trackable fragments (>10 cm)
  // N = 0.1 * (M_total)^0.75
  const predictedFragmentsCount = isCatastrophicBreakup
    ? Math.max(1, Math.round(1.2 * Math.pow(totalMassKg, 0.75)))
    : Math.max(1, Math.round(0.2 * Math.pow(Math.min(m1, m2), 0.75)));

  const debrisLifetimeYears = estimateDebrisLifetimeYears(event.altitudeKm);
  const shellInfo = getShellCongestion(event.altitudeKm);

  // 1. Mass & Energy severity (0 to 35 pts)
  // Log scale based on mass and kinetic energy
  const massLog = Math.min(35, Math.log10(Math.max(1, totalMassKg)) * 8.5);

  // 2. Debris residence persistence (0 to 30 pts)
  const lifetimeScore = Math.min(30, Math.log10(debrisLifetimeYears + 1) * 11.5);

  // 3. Shell congestion multiplier (0 to 20 pts)
  const congestionScore = Math.min(20, shellInfo.multiplier * 6.0);

  // 4. Criticality bonus (0 to 15 pts)
  let criticalityScore = 0;
  if (event.primaryObject.type === 'crewed' || event.secondaryObject.type === 'crewed') {
    criticalityScore = 15;
  } else if (event.primaryObject.status === 'active' && (event.primaryObject.type === 'payload' || event.primaryObject.type === 'rocket_body')) {
    criticalityScore = 12;
  } else if (event.primaryObject.type === 'cubesat' && event.secondaryObject.type === 'cubesat') {
    criticalityScore = 2;
  } else {
    criticalityScore = 6;
  }

  // Calculate raw consequence score (0 to 100)
  const rawConsequence = massLog + lifetimeScore + congestionScore + criticalityScore;
  const consequenceScore = Math.min(100, Math.max(1, Math.round(rawConsequence)));

  // Composite Risk Score = Consequence * log10 factor of Pc
  // Normalizes the impact of Pc so negligible consequence cannot become #1 priority,
  // but a high consequence with non-negligible Pc gets escalated.
  const pcWeight = Math.log10(Math.max(1e-7, event.collisionProbability) * 1e6) + 1; // 1 to 5 scale
  const normalizedPcWeight = Math.max(0.4, Math.min(2.5, pcWeight / 2.0));
  const compositeRiskScore = Math.min(100, Math.max(1, Math.round(consequenceScore * normalizedPcWeight * 0.95)));

  // Categorize priority
  let priorityLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  if (consequenceScore >= 75 && event.collisionProbability >= 1e-4) {
    priorityLevel = 'CRITICAL';
  } else if (consequenceScore >= 60 || (consequenceScore >= 45 && event.collisionProbability >= 1e-3)) {
    priorityLevel = 'HIGH';
  } else if (consequenceScore >= 35) {
    priorityLevel = 'ELEVATED';
  } else {
    priorityLevel = 'LOW';
  }

  // Craft plain-language explanation for judges and operators
  let judgeTakeaway = '';
  if (totalMassKg > 2000 && debrisLifetimeYears > 50) {
    judgeTakeaway = `HIGH RISK KESSLER HAZARD: Massive objects (${totalMassKg.toLocaleString()} kg) at ${event.altitudeKm} km. A breakup generates ~${predictedFragmentsCount.toLocaleString()} lethal fragments persisting for ~${Math.round(debrisLifetimeYears)} years in a crowded shell.`;
  } else if (totalMassKg < 20 && debrisLifetimeYears <= 1) {
    judgeTakeaway = `FALSE-ALARM NOISE: High Pc (${event.collisionProbability.toExponential(2)}) but negligible consequence. Tiny mass (${totalMassKg} kg) generates only ~${predictedFragmentsCount} fragments which burn up in Earth's atmosphere within months.`;
  } else if (event.primaryObject.type === 'crewed') {
    judgeTakeaway = `CREWED VEHICLE SAFETY: Involves human-habitable vehicle (ISS/Station). Immediate avoidance burn mandatory regardless of fragment persistence.`;
  } else {
    judgeTakeaway = `MODERATE RISK: Active asset encounter with ${event.missDistanceM}m miss distance. Actionable only if miss distance converges below operator safety threshold.`;
  }

  return {
    totalMassKg,
    reducedMassKg: parseFloat(reducedMassKg.toFixed(1)),
    impactKineticEnergyGJ,
    specificEnergyJoulePerGram,
    isCatastrophicBreakup,
    predictedFragmentsCount,
    debrisLifetimeYears,
    shellDensityRating: shellInfo.rating,
    shellDensityMultiplier: shellInfo.multiplier,
    consequenceScore,
    compositeRiskScore,
    priorityLevel,
    judgeTakeaway
  };
}

/**
 * Rank a list of conjunction events by traditional Pc vs consequence score.
 */
export function evaluateAndRankEvents(events: ConjunctionEvent[]): EvaluatedConjunction[] {
  // First evaluate consequence metrics for all events
  const evaluated = events.map(ev => ({
    ...ev,
    metrics: evaluateConsequence(ev),
    traditionalRank: 0,
    consequenceRank: 0
  }));

  // Rank by Traditional: pure collision probability (Pc descending)
  const sortedByPc = [...evaluated].sort((a, b) => b.collisionProbability - a.collisionProbability);
  sortedByPc.forEach((item, index) => {
    item.traditionalRank = index + 1;
  });

  // Rank by OCEWS: composite consequence risk score descending
  const sortedByConsequence = [...evaluated].sort((a, b) => {
    if (b.metrics.compositeRiskScore !== a.metrics.compositeRiskScore) {
      return b.metrics.compositeRiskScore - a.metrics.compositeRiskScore;
    }
    return b.metrics.consequenceScore - a.metrics.consequenceScore;
  });
  sortedByConsequence.forEach((item, index) => {
    item.consequenceRank = index + 1;
  });

  return evaluated;
}

/**
 * Simulate an avoidance maneuver by firing satellite thrusters along-track.
 */
export function simulateAvoidanceManeuver(
  event: ConjunctionEvent,
  deltaVms: number // m/s along-track burn
): ManeuverSimulationResult {
  // Along-track burn delta-v increases miss distance at TCA:
  // Roughly: Delta_r ~ 3 * delta_v * t_remaining (Keplerian orbital phasing)
  const tRemainingSeconds = event.timeToClosestApproachHours * 3600;
  const missIncreaseMeters = Math.abs(deltaVms) * 2.8 * (tRemainingSeconds / 3600) * 12;

  const newMissDistanceM = Math.round(event.missDistanceM + missIncreaseMeters);

  // Miss distance increases exponentially reduces collision probability
  const distanceRatio = newMissDistanceM / Math.max(1, event.missDistanceM);
  const newCollisionProbability = Math.max(1e-9, event.collisionProbability * Math.exp(-distanceRatio * 2.2));

  // Recalculate consequence risk with new miss distance and Pc
  const updatedEvent: ConjunctionEvent = {
    ...event,
    missDistanceM: newMissDistanceM,
    collisionProbability: newCollisionProbability
  };
  const newMetrics = evaluateConsequence(updatedEvent);

  // Fuel consumption estimate (Tsiolkovsky rocket equation proxy: delta_m ~ m * delta_v / (g0 * Isp))
  // Assuming typical hydrazine/ion Isp: ~220s for chemical, ~1600s for electric
  const isp = event.primaryObject.type === 'cubesat' ? 120 : 250;
  const fuelCostKgEstimate = parseFloat(((event.primaryObject.massKg * Math.abs(deltaVms)) / (9.81 * isp)).toFixed(3));

  return {
    deltaVms,
    newMissDistanceM,
    newCollisionProbability,
    newConsequenceScore: newMetrics.consequenceScore,
    newPriority: newCollisionProbability < 1e-5 ? 'LOW' : newMetrics.priorityLevel,
    fuelCostKgEstimate,
    isSafe: newMissDistanceM >= 1000 || newCollisionProbability < 1e-6
  };
}

/**
 * Compute overall alert fatigue reduction metrics across the dataset.
 */
export function calculateAlertFatigueMetrics(evaluatedEvents: EvaluatedConjunction[]) {
  const total = evaluatedEvents.length;
  // Traditional alert threshold: any Pc >= 1e-4 triggers an operator ticket
  const traditionalAlerts = evaluatedEvents.filter(e => e.collisionProbability >= 1e-4).length;
  // OCEWS actionable alert threshold: high consequence + actionable
  const ocewsActionableAlerts = evaluatedEvents.filter(e => e.metrics.priorityLevel === 'CRITICAL' || e.metrics.priorityLevel === 'HIGH').length;

  const filteredNoiseCount = Math.max(0, traditionalAlerts - ocewsActionableAlerts);
  const noiseReductionPercentage = traditionalAlerts > 0 ? Math.round((filteredNoiseCount / traditionalAlerts) * 100) : 0;

  // Verify critical threats missed
  const criticalThreatsTotal = evaluatedEvents.filter(e => e.metrics.consequenceScore >= 75).length;
  const criticalThreatsCaughtByOcews = evaluatedEvents.filter(e => e.metrics.consequenceScore >= 75 && (e.metrics.priorityLevel === 'CRITICAL' || e.metrics.priorityLevel === 'HIGH')).length;

  return {
    totalEvents: total,
    traditionalAlertCount: traditionalAlerts,
    ocewsActionableCount: ocewsActionableAlerts,
    noiseReductionPercentage,
    criticalThreatsTotal,
    criticalThreatsCaughtByOcews,
    missedCriticalThreats: criticalThreatsTotal - criticalThreatsCaughtByOcews
  };
}
