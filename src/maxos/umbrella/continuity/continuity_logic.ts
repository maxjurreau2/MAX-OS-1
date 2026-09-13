import { RealityFabricEngine, RealityFabricPatch } from "../../reality/RealityFabricEngine";

export interface ContinuityCheck {
  continuous: boolean;
  violations: string[];
  stitchedFrame: RealityFabricPatch | null;
}

export class ContinuityLogic {
  constructor(private readonly realityFabric = new RealityFabricEngine()) {}

  captureFrame(dt = 1) {
    return this.realityFabric.step(dt);
  }

  validateTransition(previous: RealityFabricPatch | null, next: RealityFabricPatch): ContinuityCheck {
    const violations: string[] = [];
    if (!Number.isFinite(next.t) || (previous && next.t <= previous.t)) {
      violations.push("Reality-fabric time must advance monotonically");
    }
    if (!this.isFinitePatch(next)) {
      violations.push("Reality-fabric frame contains non-finite manifold values");
    }

    return {
      continuous: violations.length === 0,
      violations,
      stitchedFrame: violations.length === 0 ? this.stitchFrames(previous, next) : null,
    };
  }

  stitchFrames(previous: RealityFabricPatch | null, next: RealityFabricPatch): RealityFabricPatch {
    if (!previous) return { ...next, centroid: { ...next.centroid } };
    return {
      ...next,
      centroid: {
        x: (previous.centroid.x + next.centroid.x) / 2,
        y: (previous.centroid.y + next.centroid.y) / 2,
        z: (previous.centroid.z + next.centroid.z) / 2,
      },
    };
  }

  private isFinitePatch(patch: RealityFabricPatch) {
    return [
      patch.t,
      patch.centroid.x,
      patch.centroid.y,
      patch.centroid.z,
      patch.temporalWeight,
      patch.consciousnessIntensity,
      patch.identityDensity,
      patch.flowRatio,
    ].every(Number.isFinite);
  }
}
