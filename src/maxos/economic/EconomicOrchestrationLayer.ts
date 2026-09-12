import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";

import { LiquidityIntegrationLayer } from "./LiquidityIntegrationLayer";
import { ValuationIntegrationLayer } from "./ValuationIntegrationLayer";
import { FractionalIntegrationLayer } from "./FractionalIntegrationLayer";
import { FuturesIntegrationLayer } from "./FuturesIntegrationLayer";
import { EnterpriseLicensingIntegrationLayer } from "./EnterpriseLicensingIntegrationLayer";

export class EconomicOrchestrationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  private liquidity: LiquidityIntegrationLayer;
  private valuation: ValuationIntegrationLayer;
  private fractional: FractionalIntegrationLayer;
  private futures: FuturesIntegrationLayer;
  private licensing: EnterpriseLicensingIntegrationLayer;

  constructor() {
    this.liquidity = new LiquidityIntegrationLayer();
    this.valuation = new ValuationIntegrationLayer();
    this.fractional = new FractionalIntegrationLayer();
    this.futures = new FuturesIntegrationLayer();
    this.licensing = new EnterpriseLicensingIntegrationLayer();
  }

  // --- Registry + valuation combined ---
  registerAndValue(entityId: string) {
    const registryEntry = this.liquidity.registerEntity(entityId);
    const valuationRecord = this.valuation.valueEntity(entityId);
    return { registryEntry, valuationRecord };
  }

  // --- Full economic snapshot for an entity ---
  getEntityEconomicProfile(entityId: string) {
    const registry = this.liquidity.listRegistry().filter(r => r.entityId === entityId);
    const valuations = this.valuation.listValuations().filter(v => v.entityId === entityId);
    const fractions = this.fractional.listEntityFractions(entityId);
    const futures = this.futures.listEntityFutures(entityId);
    const licenses = this.licensing.listEntityLicenses(entityId);

    return {
      entityId,
      registry,
      valuations,
      fractions,
      futures,
      licenses,
    };
  }

  // --- Global economic snapshot ---
  getGlobalEconomicSnapshot() {
    return {
      registry: this.liquidity.listRegistry(),
      valuations: this.valuation.listValuations(),
      fractions: this.fractional.listFractions(),
      futures: this.futures.listFutures(),
      licenses: this.licensing.listLicenses(),
    };
  }
}
