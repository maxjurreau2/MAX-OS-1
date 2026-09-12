import { PlanetaryEconomicPropagationLayer } from "../PlanetaryEconomicPropagationLayer";

export class DynamicsMetrics {
  private planetary: PlanetaryEconomicPropagationLayer;

  constructor(planetary: PlanetaryEconomicPropagationLayer) {
    this.planetary = planetary;
  }

  compute() {
    const density = this.planetary.computeEconomicDensity();
    const flow = this.planetary.computeLiquidityFlow();

    return {
      totalValue: density.totalValue,
      density: density.density,
      flowRatio: flow.flowRatio,
    };
  }
}
