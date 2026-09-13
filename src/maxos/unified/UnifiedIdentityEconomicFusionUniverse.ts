import { FusionEngine } from "../fusion/FusionEngine";

export class UnifiedIdentityEconomicFusionUniverse {
  private engine = new FusionEngine();

  exportUniverse() {
    const latest = this.engine.latest();
    const all = this.engine.all();

    return {
      exportedAt: new Date(),
      latestFusion: latest,
      fullFusionHistory: all,
    };
  }
}
