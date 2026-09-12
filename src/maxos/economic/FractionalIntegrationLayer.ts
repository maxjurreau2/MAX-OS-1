import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";
import { FractionalIP } from "../../liquidity/FractionalIP";
import { EntityIdentity } from "../../identity/EntityIdentity";

export class FractionalIntegrationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private fractional: FractionalIP;

  constructor() {
    this.fractional = new FractionalIP();
  }

  // --- Create fractional ownership ---
  fractionalize(entityId: string, holderId: string, totalShares: number, shares: number) {
    return this.fractional.createFraction(entityId, holderId, totalShares, shares);
  }

  // --- List all fractional units ---
  listFractions() {
    return this.fractional.list();
  }

  // --- Compute fractional ownership percentage ---
  getOwnershipPercentage(fractionId: string): number | null {
    const fractions = this.fractional.list();
    const unit = fractions.find(f => f.fractionId === fractionId);
    if (!unit) return null;
    return (unit.shares / unit.totalShares) * 100;
  }

  // --- List fractional ownership per entity ---
  listEntityFractions(entityId: string) {
    return this.fractional.list().filter(f => f.entityId === entityId);
  }

  // --- List fractional ownership per holder ---
  listHolderFractions(holderId: string) {
    return this.fractional.list().filter(f => f.holderId === holderId);
  }
}
