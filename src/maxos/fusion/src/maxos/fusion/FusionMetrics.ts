export class FusionMetrics {
  static compute(fused: any) {
    const count = fused.fusedEntities.length;

    const avgValuation =
      count === 0
        ? 0
        : fused.fusedEntities.reduce((sum: number, e: any) => {
            const vals = e.economic.valuations;
            if (vals.length === 0) return sum;
            return sum + vals[0].value;
          }, 0) / count;

    return {
      fusedCount: count,
      avgValuation,
      density: fused.density.density,
      flowRatio: fused.flow.flowRatio,
    };
  }
}
