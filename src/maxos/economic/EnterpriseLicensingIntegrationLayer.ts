import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";
import { EnterpriseLicensing } from "../../liquidity/EnterpriseLicensing";
import { EntityIdentity } from "../../identity/EntityIdentity";

export class EnterpriseLicensingIntegrationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private licensing: EnterpriseLicensing;

  constructor() {
    this.licensing = new EnterpriseLicensing();
  }

  // --- Create enterprise license ---
  createLicense(entityId: string, enterpriseId: string, terms: string) {
    return this.licensing.createLicense(entityId, enterpriseId, terms);
  }

  // --- List all licenses ---
  listLicenses() {
    return this.licensing.list();
  }

  // --- List licenses for a specific entity ---
  listEntityLicenses(entityId: string) {
    return this.licensing.list().filter(l => l.entityId === entityId);
  }

  // --- List licenses for a specific enterprise ---
  listEnterpriseLicenses(enterpriseId: string) {
    return this.licensing.list().filter(l => l.enterpriseId === enterpriseId);
  }

  // --- Check if an entity is licensed by an enterprise ---
  isLicensed(entityId: string, enterpriseId: string): boolean {
    return this.licensing
      .list()
      .some(l => l.entityId === entityId && l.enterpriseId === enterpriseId);
  }
}
