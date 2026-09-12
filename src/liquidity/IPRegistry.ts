import { IdentityKernel } from "../identity/IdentityKernel";
import { EntityIdentity } from "../identity/EntityIdentity";

export interface RegistryEntry {
  registryId: string;
  entityId: string;
  registeredAt: Date;
}

export class IPRegistry {
  private entries = new Map<string, RegistryEntry>();
  private kernel: IdentityKernel;

  constructor(kernel: IdentityKernel) {
    this.kernel = kernel;
  }

  registerEntity(entityId: string): RegistryEntry | null {
    const ctx = this.kernel.getContext();
    const entity: EntityIdentity | undefined = ctx.entities.get(entityId);
    if (!entity) return null;

    const registryId = crypto.randomUUID();
    const entry: RegistryEntry = {
      registryId,
      entityId,
      registeredAt: new Date(),
    };
    this.entries.set(registryId, entry);
    return entry;
  }

  list(): RegistryEntry[] {
    return Array.from(this.entries.values());
  }
}
