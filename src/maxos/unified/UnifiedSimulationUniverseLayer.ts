import { PlanetaryEconomicDynamicsEngine } from "../planetary/PlanetaryEconomicDynamicsEngine";
import { FusionEngine } from "../fusion/FusionEngine";

export class UnifiedSimulationUniverseLayer {
  private dynamics = new PlanetaryEconomicDynamicsEngine();
  private fusion = new FusionEngine();

  exportUniverse() {
    return {
      exportedAt: new Date(),
      latestDynamics: this.dynamics.getLatest(),
      fullDynamicsHistory: this.dynamics.getHistory(),
      latestFusion: this.fusion.latest(),
      fullFusionHistory: this.fusion.all(),
    };
  }
}
