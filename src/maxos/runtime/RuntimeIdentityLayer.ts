import { KernelIdentityLayer } from '../kernel/KernelIdentityLayer';
import { StateIdentity } from '../../identity/StateIdentity';
import { TransitionIdentity } from '../../identity/TransitionIdentity';

export class RuntimeIdentityLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  createState(entityId: string, lineageId: string, version: number): StateIdentity {
    return this.kernel.createState(entityId, lineageId, version);
  }

  createTransition(
    fromStateId: string,
    toStateId: string,
    inevitabilityScore: number
  ): TransitionIdentity {
    return this.kernel.createTransition(fromStateId, toStateId, inevitabilityScore);
  }
}
