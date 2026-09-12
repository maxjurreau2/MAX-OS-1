export type RightType = 'OWN' | 'USE' | 'MODIFY' | 'TRANSFER' | 'LICENSE';

export interface RightsRecord {
  rightsId: string;
  entityId: string;
  holderId: string;
  rights: RightType[];
  grantedAt: Date;
}

export class Rights {
  static grant(
    entityId: string,
    holderId: string,
    rights: RightType[]
  ): RightsRecord {
    return {
      rightsId: crypto.randomUUID(),
      entityId,
      holderId,
      rights,
      grantedAt: new Date(),
    };
  }
}
