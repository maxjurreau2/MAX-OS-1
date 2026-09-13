import { SpatialManifoldEngine } from "./SpatialManifoldEngine";

export class SpatialManifoldConsole {
  private engine = new SpatialManifoldEngine();

  init() {
    this.engine.attachPlanet("planet-1");
    this.engine.attachPlanet("planet-2");
  }

  step() {
    const snapshot = this.engine.step(1);
    console.log("=== Spatial Manifold Step ===");
    console.log("t:", snapshot.t);
    console.log("globalDensity:", snapshot.globalDensity);
    console.log("globalFlowRatio:", snapshot.globalFlowRatio);
    console.log("points:", snapshot.points);
  }

  printAllPoints() {
    console.log("=== Spatial Manifold Points ===");
    console.log(this.engine.getAllPoints());
  }
}
