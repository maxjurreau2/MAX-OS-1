import { KernelIdentityLayer } from '../kernel/KernelIdentityLayer';
import { EntityIdentity } from '../../identity/EntityIdentity';

export class EconomicIdentityLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  // placeholder valuation: replace with real liquidity physics later
  valueEntity(entityId: string): number {
    const ctx = this.kernel.getContext();
    const entity: EntityIdentity | undefined = ctx.entities.get(entityId);
    if (!entity) return 0;
    return entity.signature.length;
  }

  listEntitiesWithValue() {
    const ctx = this.kernel.getContext();
    return Array.from(ctx.entities.values()).map(e => ({
      entity: e,
      value: this.valueEntity(e.id),
    }));
  }
}
