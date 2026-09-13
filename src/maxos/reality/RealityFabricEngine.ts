import { SpatialManifoldEngine } from "../spatial/SpatialManifoldEngine";
import { TemporalPropagationEngine } from "../temporal/TemporalPropagationEngine";
import { ConsciousnessSubstrateEngine } from "../consciousness/ConsciousnessSubstrateEngine";
import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";

export interface RealityFabricPatch {
  patchId: string;
  t: number;
  centroid: { x: number; y: number; z: number };
  temporalWeight: number;
  consciousnessIntensity: number;
  identityDensity: number;
  flowRatio: number;
}

export class RealityFabricEngine {
  private spatial = new SpatialManifoldEngine();
  private temporal = new TemporalPropagationEngine();
  private consciousness = new ConsciousnessSubstrateEngine();
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();

  private patches: RealityFabricPatch[] = [];
  private time = 0;

  step(dt: number = 1) {
    this.time += dt;

    const spatialSnapshot = this.spatial.step(dt);
    const temporalEvent = this.temporal.step(dt);
    const consciousnessFrame = this.consciousness.step(dt);
    const fusion = this.fusionUniverse.exportUniverse();
    const latestFusion = fusion.latestFusion;

    const points = spatialSnapshot.points;
    let cx = 0,
      cy = 0,
      cz = 0;

    if (points.length > 0) {
      cx = points.reduce((s, p) => s + p.position.x, 0) / points.length;
      cy = points.reduce((s, p) => s + p.position.y, 0) / points.length;
      cz = points.reduce((s, p) => s + p.position.z, 0) / points.length;
    }

    const temporalWeight =
      Math.abs(temporalEvent.deltaDensity) +
      Math.abs(temporalEvent.deltaFlow) +
      Math.abs(temporalEvent.physicsDrift);

    const consciousnessIntensity =
      consciousnessFrame.fusedCount * (consciousnessFrame.avgValuation || 1);

    const identityDensity = latestFusion?.metrics?.density ?? 0;
    const flowRatio = latestFusion?.metrics?.flowRatio ?? 0;

    const patch: RealityFabricPatch = {
      patchId: `rf-${this.time}`,
      t: this.time,
      centroid: { x: cx, y: cy, z: cz },
      temporalWeight,
      consciousnessIntensity,
      identityDensity,
      flowRatio,
    };

    this.patches.push(patch);
    return patch;
  }

  getAllPatches() {
    return this.patches;
  }
}
