import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";
import { PlanetaryEconomicPropagationLayer } from "./PlanetaryEconomicPropagationLayer";

export interface DynamicsStepResult {
  step: number;
  timestamp: Date;
  totalValue: number;
  density: number;
  flowRatio: number;
}

export class PlanetaryEconomicDynamicsEngine {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private planetary = new PlanetaryEconomicPropagationLayer();

  private stepCounter = 0;
  private history: DynamicsStepResult[] = [];

  // Advance planetary economics by one dynamics step
  step(): DynamicsStepResult {
    this.stepCounter += 1;

    const density = this.planetary.computeEconomicDensity();
    const flow = this.planetary.computeLiquidityFlow();

    const result: DynamicsStepResult = {
      step: this.stepCounter,
      timestamp: new Date(),
      totalValue: density.totalValue,
      density: density.density,
      flowRatio: flow.flowRatio,
    };

    this.history.push(result);
    return result;
  }

  // Get full dynamics history
  getHistory(): DynamicsStepResult[] {
    return this.history;
  }

  // Get latest dynamics state
  getLatest(): DynamicsStepResult | null {
    if (this.history.length === 0) return null;
    return this.history[this.history.length - 1];
  }
}
