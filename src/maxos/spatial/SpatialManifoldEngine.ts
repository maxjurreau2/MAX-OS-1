import { PlanetaryPhysicsEngine } from "../physics/PlanetaryPhysicsEngine";
import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";

export interface SpatialPoint {
  pointId: string;
  t: number;
  position: { x: number; y: number; z: number };
  density: number;
  flowRatio: number;
}

export class SpatialManifoldEngine {
  private physics = new PlanetaryPhysicsEngine();
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();
  private points: SpatialPoint[] = [];
  private time = 0;

  attachPlanet(planetId: string) {
    const existing = this.physics.getState(planetId);
    if (!existing) {
      this.physics.addPlanet(planetId, {
        planetId,
        t: 0,
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0.5, y: 0.2, z: 0 },
      });
    }
  }

  step(dt: number = 1) {
    this.time += dt;

    const physicsSnapshot = this.physics.step(dt);
    const fusionSnapshot = this.fusionUniverse.exportUniverse();
    const latestFusion = fusionSnapshot.latestFusion;

    const density = latestFusion?.metrics?.density ?? 0;
    const flowRatio = latestFusion?.metrics?.flowRatio ?? 0;

    const newPoints: SpatialPoint[] = physicsSnapshot.states.map(state => ({
      pointId: `sp-${state.planetId}-${this.time}`,
      t: this.time,
      position: state.position,
      density,
      flowRatio,
    }));

    this.points.push(...newPoints);

    return {
      t: this.time,
      points: newPoints,
      globalDensity: density,
      globalFlowRatio: flowRatio,
    };
  }

  getAllPoints() {
    return this.points;
  }
}
