import { IdentityKernel } from "../identity/IdentityKernel";
import { EntityIdentity } from "../identity/EntityIdentity";

export interface ValuationRecord {
  valuationId: string;
  entityId: string;
  value: number;
  calculatedAt: Date;
}

export class ValuationEngine {
  private kernel: IdentityKernel;
  private records = new Map<string, ValuationRecord>();

  constructor(kernel: IdentityKernel) {
    this.kernel = kernel;
  }

  valueEntity(entityId: string): ValuationRecord | null {
    const ctx = this.kernel.getContext();
    const entity: EntityIdentity | undefined = ctx.entities.get(entityId);
    if (!entity) return null;

    const base = entity.signature.length;
    const value = base; // placeholder; swap for real physics later

    const valuationId = crypto.randomUUID();
    const record: ValuationRecord = {
      valuationId,
      entityId,
      value,
      calculatedAt: new Date(),
    };
    this.records.set(valuationId, record);
    return record;
  }

  list(): ValuationRecord[] {
    return Array.from(this.records.values());
  }
}
