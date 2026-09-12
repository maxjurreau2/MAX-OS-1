export class DynamicsSignals {
  static toSignalPacket(record: any) {
    return {
      emittedAt: new Date(),
      signal: {
        step: record.step,
        totalValue: record.totalValue,
        density: record.density,
        flowRatio: record.flowRatio,
      },
    };
  }
}
