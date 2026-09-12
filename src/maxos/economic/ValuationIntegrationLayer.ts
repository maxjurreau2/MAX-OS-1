import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";
import { ValuationEngine } from "../../liquidity/ValuationEngine";
import { EntityIdentity } from "../../identity/EntityIdentity";

export class ValuationIntegrationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private valuation: ValuationEngine;

  constructor() {
    this.valuation = new ValuationEngine(this.kernel);
  }

  // --- Single valuation ---
  valueEntity(entityId: string) {
    return this.valuation.valueEntity(entityId);
  }

  // --- Bulk valuation ---
  valueAllEntities() {
    const ctx = this.kernel.getContext();
    const results: Array<{ entity: EntityIdentity; valuation: number }> = [];

    for (const entity of ctx.entities.values()) {
      const record = this.valuation.valueEntity(entity.id);
      if (record) {
        results.push({
          entity,
          valuation: record.value,
        });
      }
    }

    return results;
  }

  // --- Access valuation history ---
  listValuations() {
    return this.valuation.list();
  }
}
