import { PlanetaryEconomicPropagationLayer } from "../planetary/PlanetaryEconomicPropagationLayer";

export class UnifiedEconomicUniverseLayer {
  private planetaryEconomic = new PlanetaryEconomicPropagationLayer();

  // Unified economic universe snapshot
  getUnifiedEconomicSnapshot() {
    const snapshot = this.planetaryEconomic.snapshot();
    const density = this.planetaryEconomic.computeEconomicDensity();
    const flow = this.planetaryEconomic.computeLiquidityFlow();

    return {
      timestamp: snapshot.timestamp,
      registry: snapshot.registry,
      valuations: snapshot.valuations,
      fractions: snapshot.fractions,
      futures: snapshot.futures,
      licenses: snapshot.licenses,
      density,
      flow,
    };
  }

  // Unified per-entity economic profile universe-wide
  getUnifiedEntityProfiles() {
    const propagation = this.planetaryEconomic.propagate();
    return {
      propagatedAt: propagation.propagatedAt,
      profiles: propagation.propagated,
    };
  }
}
