import { SpatialManifoldEngine } from "../spatial/SpatialManifoldEngine";
import { TemporalPropagationEngine } from "../temporal/TemporalPropagationEngine";

export interface WorldlinePoint {
  worldlineId: string;
  t: number;
  x: number;
  y: number;
  z: number;
  density: number;
  flowRatio: number;
}

export class WorldlineEngine {
  private spatial = new SpatialManifoldEngine();
  private temporal = new TemporalPropagationEngine();
  private points: WorldlinePoint[] = [];
  private time = 0;

  step(dt: number = 1) {
    this.time += dt;

    const spatialSnapshot = this.spatial.step(dt);
    const temporalEvent = this.temporal.step(dt);

    spatialSnapshot.points.forEach(p => {
      const wp: WorldlinePoint = {
        worldlineId: `wl-${p.pointId}-${this.time}`,
        t: this.time,
        x: p.position.x,
        y: p.position.y,
        z: p.position.z,
        density: spatialSnapshot.globalDensity + temporalEvent.deltaDensity,
        flowRatio: spatialSnapshot.globalFlowRatio + temporalEvent.deltaFlow,
      };
      this.points.push(wp);
    });

    return {
      t: this.time,
      points: spatialSnapshot.points.length,
    };
  }

  getAllPoints() {
    return this.points;
  }
}
