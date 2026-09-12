export interface FutureContract {
  futureId: string;
  entityId: string;
  holderId: string;
  strikeValue: number;
  expiry: Date;
  createdAt: Date;
}

export class FuturesEngine {
  private futures = new Map<string, FutureContract>();

  createFuture(
    entityId: string,
    holderId: string,
    strikeValue: number,
    expiry: Date
  ): FutureContract {
    const futureId = crypto.randomUUID();
    const contract: FutureContract = {
      futureId,
      entityId,
      holderId,
      strikeValue,
      expiry,
      createdAt: new Date(),
    };
    this.futures.set(futureId, contract);
    return contract;
  }

  list(): FutureContract[] {
    return Array.from(this.futures.values());
  }
}
