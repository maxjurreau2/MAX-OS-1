export class DynamicsHistoryStore {
  private history: any[] = [];

  store(record: any) {
    this.history.push(record);
  }

  getAll() {
    return this.history;
  }

  getLatest() {
    if (this.history.length === 0) return null;
    return this.history[this.history.length - 1];
  }
}
