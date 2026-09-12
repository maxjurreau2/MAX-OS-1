export interface StateIdentity {
  stateId: string;
  entityId: string;
  version: number;
  signature: string;
  lineageId: string;
  createdAt: Date;
}

export class StateIdentityFactory {
  static create(entityId: string, lineageId: string, version: number): StateIdentity {
    const stateId = crypto.randomUUID();
    const signature = `${entityId}:v${version}:${lineageId}`;
    return {
      stateId,
      entityId,
      version,
      signature,
      lineageId,
      createdAt: new Date(),
    };
  }
}
