export interface SpatialManifoldSnapshot {
  t: number;
  points: Array<{ position: { x: number; y: number; z: number } }>;
}

export interface TemporalManifoldSnapshot {
  t: number;
  deltaDensity: number;
  deltaFlow: number;
  physicsDrift: number;
}

export interface GeometryConstraint {
  id: string;
  satisfied: boolean;
  measured: number;
  limit: number;
}

export interface SubstrateGeometryState {
  curvature: number;
  propagationRate: number;
  stability: number;
  topology: Record<string, number>;
  constraints: GeometryConstraint[];
}

export type TopologyHook = (
  spatial: SpatialManifoldSnapshot,
  temporal: TemporalManifoldSnapshot,
) => number;

export class SubstrateGeometry {
  private readonly topologyHooks = new Map<string, TopologyHook>();

  constructor(private readonly maximumCurvature = 100) {}

  registerTopologyHook(name: string, hook: TopologyHook) {
    this.topologyHooks.set(name, hook);
  }

  analyze(
    spatial: SpatialManifoldSnapshot,
    temporal: TemporalManifoldSnapshot,
  ): SubstrateGeometryState {
    const curvature = this.computeCurvature(spatial);
    const propagationRate =
      Math.abs(temporal.deltaDensity) + Math.abs(temporal.deltaFlow) + Math.abs(temporal.physicsDrift);
    const timeAligned = spatial.t === temporal.t;
    const constraints: GeometryConstraint[] = [
      {
        id: "curvature.maximum",
        satisfied: Number.isFinite(curvature) && curvature <= this.maximumCurvature,
        measured: curvature,
        limit: this.maximumCurvature,
      },
      {
        id: "frames.time-aligned",
        satisfied: timeAligned,
        measured: Math.abs(spatial.t - temporal.t),
        limit: 0,
      },
    ];
    const failedRatio = constraints.filter(constraint => !constraint.satisfied).length / constraints.length;
    const curvatureRatio = Math.min(1, curvature / Math.max(this.maximumCurvature, 1));
    const stability = Math.max(0, Math.min(1, 1 - curvatureRatio - failedRatio));
    const topology = Object.fromEntries(
      Array.from(this.topologyHooks, ([name, hook]) => [name, hook(spatial, temporal)]),
    );

    return { curvature, propagationRate, stability, topology, constraints };
  }

  private computeCurvature(spatial: SpatialManifoldSnapshot) {
    if (spatial.points.length < 2) return 0;
    const centroid = spatial.points.reduce(
      (sum, point) => ({
        x: sum.x + point.position.x / spatial.points.length,
        y: sum.y + point.position.y / spatial.points.length,
        z: sum.z + point.position.z / spatial.points.length,
      }),
      { x: 0, y: 0, z: 0 },
    );
    return (
      spatial.points.reduce((sum, point) => {
        const dx = point.position.x - centroid.x;
        const dy = point.position.y - centroid.y;
        const dz = point.position.z - centroid.z;
        return sum + Math.sqrt(dx * dx + dy * dy + dz * dz);
      }, 0) / spatial.points.length
    );
  }
}
