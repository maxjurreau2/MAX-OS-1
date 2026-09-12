import { KernelIdentityLayer } from '../kernel/KernelIdentityLayer';

export class PlanetaryIdentityLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  exportGlobalIdentitySnapshot() {
    const ctx = this.kernel.getContext();
    return {
      entities: Array.from(ctx.entities.values()),
      provenance: Array.from(ctx.provenance.values()),
      lineage: Array.from(ctx.lineage.values()),
      rights: Array.from(ctx.rights.values()),
      states: Array.from(ctx.states.values()),
      transitions: Array.from(ctx.transitions.values()),
    };
  }
}
