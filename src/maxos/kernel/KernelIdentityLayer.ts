
import { IdentityKernel } from "../../identity/IdentityKernel";

export class KernelIdentityLayer {
  private static instance: KernelIdentityLayer;
  private identityKernel: IdentityKernel;

  private constructor() {
    this.identityKernel = new IdentityKernel();
  }

  static getInstance(): KernelIdentityLayer {
    if (!KernelIdentityLayer.instance) {
      KernelIdentityLayer.instance = new KernelIdentityLayer();
    }
    return KernelIdentityLayer.instance;
  }

  getIdentityKernel(): IdentityKernel {
    return this.identityKernel;
  }
}
