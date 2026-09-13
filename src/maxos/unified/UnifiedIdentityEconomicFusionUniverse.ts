import { FusionEngine } from "../fusion/FusionEngine";

export class UnifiedIdentityEconomicFusionUniverse {
  private engine = new FusionEngine();

  step() {
    this.engine.step();
    return this.exportUniverse();
  }

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
