import { SpatialManifoldEngine } from "../spatial/SpatialManifoldEngine";

export interface EventShape {
  shapeId: string;
  t: number;
  centroid: { x: number; y: number; z: number };
  spread: number;
  density: number;
  flowRatio: number;
}

export class EventShapeEngine {
  private spatial = new SpatialManifoldEngine();
  private shapes: EventShape[] = [];
  private time = 0;

  step(dt: number = 1) {
    this.time += dt;

    const snapshot = this.spatial.step(dt);
    const points = snapshot.points;

    if (points.length === 0) {
      return null;
    }

    const cx =
      points.reduce((sum, p) => sum + p.position.x, 0) / points.length;
    const cy =
      points.reduce((sum, p) => sum + p.position.y, 0) / points.length;
    const cz =
      points.reduce((sum, p) => sum + p.position.z, 0) / points.length;

    const spread = points.reduce((sum, p) => {
      const dx = p.position.x - cx;
      const dy = p.position.y - cy;
      const dz = p.position.z - cz;
      return sum + Math.sqrt(dx * dx + dy * dy + dz * dz);
    }, 0);

    const shape: EventShape = {
      shapeId: `es-${this.time}`,
      t: this.time,
      centroid: { x: cx, y: cy, z: cz },
      spread,
      density: snapshot.globalDensity,
      flowRatio: snapshot.globalFlowRatio,
    };

    this.shapes.push(shape);
    return shape;
  }

  getAllShapes() {
    return this.shapes;
  }
}
