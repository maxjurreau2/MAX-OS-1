export interface FractionUnit {
  fractionId: string;
  entityId: string;
  totalShares: number;
  holderId: string;
  shares: number;
  createdAt: Date;
}

export class FractionalIP {
  private fractions = new Map<string, FractionUnit>();

  createFraction(
    entityId: string,
    holderId: string,
    totalShares: number,
    shares: number
  ): FractionUnit {
    const fractionId = crypto.randomUUID();
    const unit: FractionUnit = {
      fractionId,
      entityId,
      totalShares,
      holderId,
      shares,
      createdAt: new Date(),
    };
    this.fractions.set(fractionId, unit);
    return unit;
  }

  list(): FractionUnit[] {
    return Array.from(this.fractions.values());
  }
}
