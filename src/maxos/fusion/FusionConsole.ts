import { FusionEngine } from "./FusionEngine";

export class FusionConsole {
  private engine = new FusionEngine();

  printFusionStep() {
    const step = this.engine.step();
    console.log("=== Fusion Step ===");
    console.log("Step:", step.step);
    console.log("Timestamp:", step.timestamp);
    console.log("Fused entities:", step.metrics.fusedCount);
    console.log("Avg valuation:", step.metrics.avgValuation);
    console.log("Density:", step.metrics.density);
    console.log("Flow ratio:", step.metrics.flowRatio);
  }

  printLatest() {
    const latest = this.engine.latest();
    console.log("=== Latest Fusion ===");
    console.log(latest);
  }

  printHistory() {
    const all = this.engine.all();
    console.log("=== Full Fusion History ===");
    console.log(all);
  }
}
