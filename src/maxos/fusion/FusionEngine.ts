import { IdentityEconomicFusionLayer } from "./IdentityEconomicFusionLayer";
import { FusionMetrics } from "./FusionMetrics";
import { FusionHistoryStore } from "./FusionHistoryStore";

export class FusionEngine {
  private fusion = new IdentityEconomicFusionLayer();
  private history = new FusionHistoryStore();
  private stepCounter = 0;

  step() {
    this.stepCounter += 1;

    const fused = this.fusion.fuse();
    const metrics = FusionMetrics.compute(fused);

    const record = {
      step: this.stepCounter,
      timestamp: new Date(),
      fused,
      metrics,
    };

    this.history.store(record);
    return record;
  }

  latest() {
    return this.history.latest();
  }

  all() {
    return this.history.getAll();
  }
}
