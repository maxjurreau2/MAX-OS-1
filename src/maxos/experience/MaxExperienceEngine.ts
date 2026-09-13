import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";
import { UnifiedSimulationUniverseLayer } from "../unified/UnifiedSimulationUniverseLayer";

export class MaxExperienceEngine {
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();
  private simUniverse = new UnifiedSimulationUniverseLayer();

  buildExperiencePoint(pointId: string) {
    const fusion = this.fusionUniverse.exportUniverse();
    const sim = this.simUniverse.exportUniverse();

    return {
      pointId,
      builtAt: new Date(),
      fusionSnapshot: fusion.latestFusion,
      simulationSnapshot: {
        dynamics: sim.latestDynamics,
        fusion: sim.latestFusion,
      },
    };
  }

  buildExperienceStream(count: number = 5) {
    const stream = [];
    for (let i = 0; i < count; i++) {
      stream.push(this.buildExperiencePoint(`xp-${i + 1}`));
    }
    return stream;
  }
}
