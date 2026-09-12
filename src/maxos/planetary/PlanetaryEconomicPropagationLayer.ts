import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";

import { LiquidityIntegrationLayer } from "../economic/LiquidityIntegrationLayer";
import { ValuationIntegrationLayer } from "../economic/ValuationIntegrationLayer";
import { FractionalIntegrationLayer } from "../economic/FractionalIntegrationLayer";
import { FuturesIntegrationLayer } from "../economic/FuturesIntegrationLayer";
import { EnterpriseLicensingIntegrationLayer } from "../economic/EnterpriseLicensingIntegrationLayer";

export class PlanetaryEconomicPropagationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  private liquidity = new LiquidityIntegrationLayer();
  private valuation = new ValuationIntegrationLayer();
  private fractional = new FractionalIntegrationLayer();
  private futures = new FuturesIntegrationLayer();
  private licensing = new EnterpriseLicensingIntegrationLayer();

  // --- Planetary propagation event ---
  propagate() {
    const ctx = this.kernel.getContext();

    const entities = Array.from(ctx.entities.values());

    const propagated = entities.map(entity => {
      const registry = this.liquidity.listRegistry().filter(r => r.entityId === entity.id);
      const valuations = this.valuation.listValuations().filter(v => v.entityId === entity.id);
      const fractions = this.fractional.listEntityFractions(entity.id);
      const futures = this.futures.listEntityFutures(entity.id);
      const licenses = this.licensing.listEntityLicenses(entity.id);

      return {
        entity,
        registry,
        valuations,
        fractions,
        futures,
        licenses,
      };
    });

    return {
      propagatedAt: new Date(),
      propagated,
    };
  }

  // --- Planetary economic snapshot ---
  snapshot() {
    return {
      timestamp: new Date(),
      registry: this.liquidity.listRegistry(),
      valuations: this.valuation.listValuations(),
      fractions: this.fractional.listFractions(),
      futures: this.futures.listFutures(),
      licenses: this.licensing.listLicenses(),
    };
  }

  // --- Planetary signal: economic density ---
  computeEconomicDensity() {
    const valuations = this.valuation.listValuations();
    const totalValue = valuations.reduce((sum, v) => sum + v.value, 0);

    return {
      timestamp: new Date(),
      totalValue,
      entityCount: valuations.length,
      density: valuations.length === 0 ? 0 : totalValue / valuations.length,
    };
  }

  // --- Planetary signal: liquidity flow ---
  computeLiquidityFlow() {
    const registry = this.liquidity.listRegistry();
    const valuations = this.valuation.listValuations();

    return {
      timestamp: new Date(),
      registryCount: registry.length,
      valuationCount: valuations.length,
      flowRatio: valuations.length === 0 ? 0 : registry.length / valuations.length,
    };
  }
}
