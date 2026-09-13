import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";
import { PlanetaryPhysicsEngine } from "../physics/PlanetaryPhysicsEngine";

export interface TemporalEvent {
  eventId: string;
  t: number;
  deltaDensity: number;
  deltaFlow: number;
  physicsDrift: number;
}

export class TemporalPropagationEngine {
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();
  private physics = new PlanetaryPhysicsEngine();
  private events: TemporalEvent[] = [];
  private time = 0;

  step(dt: number = 1) {
    this.time += dt;

    const fusion = this.fusionUniverse.exportUniverse();
    const latestFusion = fusion.latestFusion;

    const density = latestFusion?.metrics?.density ?? 0;
    const flow = latestFusion?.metrics?.flowRatio ?? 0;

    const physicsSnapshot = this.physics.step(dt);
    const physicsDrift = physicsSnapshot.states.reduce((sum, s) => {
      return sum + Math.abs(s.position.x + s.position.y + s.position.z);
    }, 0);

    const event: TemporalEvent = {
      eventId: `tp-${this.time}`,
      t: this.time,
      deltaDensity: density * 0.01,
      deltaFlow: flow * 0.01,
      physicsDrift,
    };

    this.events.push(event);

    return event;
  }

  getAllEvents() {
    return this.events;
  }
}
