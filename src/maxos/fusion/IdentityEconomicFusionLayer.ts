import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";
import { UnifiedEconomicUniverseLayer } from "../unified/UnifiedEconomicUniverseLayer";

export class IdentityEconomicFusionLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private economic = new UnifiedEconomicUniverseLayer();

  fuse() {
    const ctx = this.kernel.getContext();
    const economicSnapshot = this.economic.getUnifiedEconomicSnapshot();

    const fusedEntities = Array.from(ctx.entities.values()).map(entity => {
      const valuations = economicSnapshot.valuations.filter(v => v.entityId === entity.id);
      const fractions = economicSnapshot.fractions.filter(f => f.entityId === entity.id);
      const futures = economicSnapshot.futures.filter(f => f.entityId === entity.id);
      const licenses = economicSnapshot.licenses.filter(l => l.entityId === entity.id);

      return {
        entity,
        signature: entity.signature,
        lineage: ctx.lineage.get(entity.lineageId),
        provenance: ctx.provenance.get(entity.provenanceId),
        economic: {
          valuations,
          fractions,
          futures,
          licenses,
        },
      };
    });

    return {
      fusedAt: new Date(),
      fusedEntities,
      density: economicSnapshot.density,
      flow: economicSnapshot.flow,
    };
  }
}
