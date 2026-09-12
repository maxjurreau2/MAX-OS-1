import { KernelIdentityLayer } from '../kernel/KernelIdentityLayer';
import { RightType, RightsRecord } from '../../identity/Rights';

export class ProtocolIdentityLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  grantRights(entityId: string, holderId: string, rights: RightType[]): RightsRecord {
    return this.kernel.grantRights(entityId, holderId, rights);
  }

  enforceRights(entityId: string, holderId: string, required: RightType[]): boolean {
    const ctx = this.kernel.getContext();
    for (const record of ctx.rights.values()) {
      if (record.entityId === entityId && record.holderId === holderId) {
        return required.every(r => record.rights.includes(r));
      }
    }
    return false;
  }
}
