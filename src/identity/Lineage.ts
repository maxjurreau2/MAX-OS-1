export interface LineageRecord {
  lineageId: string;
  rootEntityId: string;
  parentEntityId?: string;
  createdAt: Date;
}

export class Lineage {
  static create(rootEntityId: string, parentEntityId?: string): LineageRecord {
    return {
      lineageId: crypto.randomUUID(),
      rootEntityId,
      parentEntityId,
      createdAt: new Date(),
    };
  }
}
