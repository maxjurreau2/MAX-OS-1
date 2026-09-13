import { PlanetaryPhysicsEngine } from "./PlanetaryPhysicsEngine";

export class PlanetaryPhysicsConsole {
  private engine = new PlanetaryPhysicsEngine();

  initDemoPlanet() {
    this.engine.addPlanet("planet-1", {
      planetId: "planet-1",
      t: 0,
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
    });
  }

  step() {
    const snapshot = this.engine.step(1);
    console.log("=== Planetary Physics Step ===");
    console.log("t:", snapshot.t);
    console.log("states:", snapshot.states);
  }
}
