export class FusionHistoryStore {
  private history: any[] = [];

  store(record: any) {
    this.history.push(record);
  }

  getAll() {
    return this.history;
  }

  latest() {
    if (this.history.length === 0) return null;
    return this.history[this.history.length - 1];
  }
}
