export type EntityId = string;

export interface EntityIdentity {
  id: EntityId;
  type: string;              // structural type
  signature: string;         // hash/fingerprint
  createdAt: Date;
  provenanceId: string;
}

export class EntityIdentityFactory {
  static create(type: string, provenanceId: string): EntityIdentity {
    const id = crypto.randomUUID();
    const signature = `${type}:${id}:${provenanceId}`;
    return {
      id,
      type,
      signature,
      createdAt: new Date(),
      provenanceId,
    };
  }
}
