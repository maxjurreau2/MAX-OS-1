import { PlanetaryEconomicDynamicsEngine } from "../planetary/PlanetaryEconomicDynamicsEngine";
import { FusionEngine } from "../fusion/FusionEngine";

export class MaxOsSimulationLoop {
  private dynamics = new PlanetaryEconomicDynamicsEngine();
  private fusion = new FusionEngine();

  private intervalMs: number;
  private timer: any = null;
  private stepCounter = 0;

  constructor(intervalMs: number = 1000) {
    this.intervalMs = intervalMs;
  }

  start() {
    if (this.timer) return;

    this.timer = setInterval(() => {
      this.stepCounter += 1;

      // 1. Advance planetary economic dynamics
      const dynamicsStep = this.dynamics.step();

      // 2. Advance identity–economic fusion
      const fusionStep = this.fusion.step();

      // 3. Log simulation step summary
      console.log("=== MAX-OS-1 Simulation Step ===");
      console.log("Step:", this.stepCounter);
      console.log("Dynamics total value:", dynamicsStep.totalValue);
      console.log("Dynamics density:", dynamicsStep.density);
      console.log("Dynamics flow ratio:", dynamicsStep.flowRatio);
      console.log("Fusion fused entities:", fusionStep.metrics.fusedCount);
      console.log("Fusion avg valuation:", fusionStep.metrics.avgValuation);
      console.log("Fusion density:", fusionStep.metrics.density);
      console.log("Fusion flow ratio:", fusionStep.metrics.flowRatio);
    }, this.intervalMs);
  }

  stop() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }

  getStepCount() {
    return this.stepCounter;
  }
}
