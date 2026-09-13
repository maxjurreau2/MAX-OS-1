import { UnifiedIdentityEconomicFusionUniverse } from "../../unified/UnifiedIdentityEconomicFusionUniverse";

export interface RevenueTrajectoryPoint {
  period: number;
  projectedValuation: number;
}

export interface RevenueTrajectoryState {
  identityId: string;
  valuation: number;
  valuationDrift: number;
  economicMomentum: number;
  fusionDensity: number;
  curve: RevenueTrajectoryPoint[];
}

export class RevenueTrajectory {
  private readonly previousValuations = new Map<string, number>();

  constructor(private readonly fusionUniverse = new UnifiedIdentityEconomicFusionUniverse()) {}

  step(identityId?: string, horizon = 5): RevenueTrajectoryState {
    const universe = this.fusionUniverse.step();
    const fusedEntities = universe.latestFusion?.fused?.fusedEntities ?? [];
    const fusedEntity = identityId
      ? fusedEntities.find((item: { entity: { id: string } }) => item.entity.id === identityId)
      : fusedEntities[0];
    const resolvedIdentityId = identityId ?? fusedEntity?.entity.id ?? "umbrella-system";
    const valuations = fusedEntity?.economic.valuations ?? [];
    const valuation = valuations.length > 0 ? valuations[valuations.length - 1].value : 0;
    const previous = this.previousValuations.get(resolvedIdentityId) ?? valuation;
    const valuationDrift = valuation - previous;
    const economicMomentum = previous === 0 ? valuationDrift : valuationDrift / Math.abs(previous);
    const fusionDensity = universe.latestFusion?.metrics?.density ?? 0;
    const boundedHorizon = Math.max(0, Math.floor(horizon));
    const curve = Array.from({ length: boundedHorizon + 1 }, (_, period) => ({
      period,
      projectedValuation: Math.max(0, valuation + valuationDrift * period),
    }));

    this.previousValuations.set(resolvedIdentityId, valuation);
    return {
      identityId: resolvedIdentityId,
      valuation,
      valuationDrift,
      economicMomentum,
      fusionDensity,
      curve,
    };
  }
}
