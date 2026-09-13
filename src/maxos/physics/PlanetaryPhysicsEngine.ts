import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";

export interface PhysicsState {
  planetId: string;
  t: number;
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
}

export class PlanetaryPhysicsEngine {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();
  private states: Map<string, PhysicsState> = new Map();
  private time = 0;

  addPlanet(planetId: string, initial: PhysicsState) {
    this.states.set(planetId, initial);
  }

  step(dt: number = 1) {
    this.time += dt;

    for (const [id, state] of this.states.entries()) {
      const next: PhysicsState = {
        planetId: id,
        t: this.time,
        position: {
          x: state.position.x + state.velocity.x * dt,
          y: state.position.y + state.velocity.y * dt,
          z: state.position.z + state.velocity.z * dt,
        },
        velocity: state.velocity,
      };
      this.states.set(id, next);
    }

    return {
      t: this.time,
      states: Array.from(this.states.values()),
    };
  }

  getState(planetId: string) {
    return this.states.get(planetId) || null;
  }

  getAllStates() {
    return Array.from(this.states.values());
  }
}
