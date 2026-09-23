export type ObjectType = 'payload' | 'rocket_body' | 'debris' | 'cubesat' | 'crewed';
export type ObjectStatus = 'active' | 'derelict';

export interface SpaceObject {
  id: string;
  name: string;
  noradId: number;
  type: ObjectType;
  status: ObjectStatus;
  operator: string;
  massKg: number;
  country: string;
  isManeuverable: boolean;
}

export interface ConjunctionEvent {
  id: string;
  eventCode: string;
  primaryObject: SpaceObject;
  secondaryObject: SpaceObject;
  altitudeKm: number;
  missDistanceM: number;
  relativeVelocityKms: number; // km/s
  collisionProbability: number; // Pc (e.g. 0.0042)
  timeToClosestApproachHours: number; // TCA in hours
  tleAgeDays: number;
  inclinationDeg: number;
  shellBandName: string; // e.g., "Sun-Synchronous Orbit (SSO)", "Starlink Constellation Shell", "Decaying VLEO"
  description: string;
  tag?: 'ISRO' | 'Starlink' | 'ISS' | 'Commercial' | 'Derelict';
}

export interface ConsequenceMetrics {
  totalMassKg: number;
  reducedMassKg: number;
  impactKineticEnergyGJ: number;
  specificEnergyJoulePerGram: number;
  isCatastrophicBreakup: boolean;
  predictedFragmentsCount: number;
  debrisLifetimeYears: number;
  shellDensityRating: 'Very Low' | 'Moderate' | 'Dense' | 'Hyper-Congested';
  shellDensityMultiplier: number;
  consequenceScore: number; // 0 - 100
  compositeRiskScore: number; // Pc * Consequence factor normalized (0 - 100)
  priorityLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  judgeTakeaway: string;
}

export interface EvaluatedConjunction extends ConjunctionEvent {
  metrics: ConsequenceMetrics;
  traditionalRank: number; // Rank by raw Pc
  consequenceRank: number; // Rank by OCEWS Consequence
}

export interface ManeuverSimulationResult {
  deltaVms: number; // m/s
  newMissDistanceM: number;
  newCollisionProbability: number;
  newConsequenceScore: number;
  newPriority: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'LOW';
  fuelCostKgEstimate: number;
  isSafe: boolean;
}
