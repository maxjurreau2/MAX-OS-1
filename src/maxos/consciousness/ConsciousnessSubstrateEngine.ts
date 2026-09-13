import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";

export interface ConsciousnessFrame {
  frameId: string;
  t: number;
  fusedCount: number;
  avgValuation: number;
  density: number;
  flowRatio: number;
}

export class ConsciousnessSubstrateEngine {
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();
  private frames: ConsciousnessFrame[] = [];
  private time = 0;

  step(dt: number = 1) {
    this.time += dt;

    const fusion = this.fusionUniverse.exportUniverse();
    const latest = fusion.latestFusion;

    const metrics = latest?.metrics ?? {
      fusedCount: 0,
      avgValuation: 0,
      density: 0,
      flowRatio: 0,
    };

    const frame: ConsciousnessFrame = {
      frameId: `cs-${this.time}`,
      t: this.time,
      fusedCount: metrics.fusedCount,
      avgValuation: metrics.avgValuation,
      density: metrics.density,
      flowRatio: metrics.flowRatio,
    };

    this.frames.push(frame);
    return frame;
  }

  getAllFrames() {
    return this.frames;
  }
}
