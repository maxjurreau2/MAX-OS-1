import { FuturesEngine } from "../../liquidity/FuturesEngine";

export class FuturesIntegrationLayer {
  private readonly futures = new FuturesEngine();

  createFuture(entityId: string, holderId: string, strikeValue: number, expiry: Date) {
    return this.futures.createFuture(entityId, holderId, strikeValue, expiry);
  }

  listFutures() {
    return this.futures.list();
  }

  listEntityFutures(entityId: string) {
    return this.futures.list().filter(future => future.entityId === entityId);
  }

  listHolderFutures(holderId: string) {
    return this.futures.list().filter(future => future.holderId === holderId);
  }
}
