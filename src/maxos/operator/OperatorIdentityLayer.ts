import { KernelIdentityLayer } from '../kernel/KernelIdentityLayer';
import { EntityIdentity } from '../../identity/EntityIdentity';

export class OperatorIdentityLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  createEntityWithDefaults(type: string, createdBy: string): EntityIdentity {
    return this.kernel.createEntity(type, 'MAX-OS-1', createdBy);
  }
}
