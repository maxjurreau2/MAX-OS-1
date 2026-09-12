export interface LicenseContract {
  licenseId: string;
  entityId: string;
  enterpriseId: string;
  terms: string;
  activatedAt: Date;
}

export class EnterpriseLicensing {
  private licenses = new Map<string, LicenseContract>();

  createLicense(
    entityId: string,
    enterpriseId: string,
    terms: string
  ): LicenseContract {
    const licenseId = crypto.randomUUID();
    const contract: LicenseContract = {
      licenseId,
      entityId,
      enterpriseId,
      terms,
      activatedAt: new Date(),
    };
    this.licenses.set(licenseId, contract);
    return contract;
  }

  list(): LicenseContract[] {
    return Array.from(this.licenses.values());
  }
}
