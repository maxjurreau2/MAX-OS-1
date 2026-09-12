import { PlanetaryEconomicDynamicsEngine } from "../planetary/PlanetaryEconomicDynamicsEngine";
import { DynamicsSignals } from "../planetary/dynamics/DynamicsSignals";

export class UnifiedDynamicsUniverseLayer {
  private engine = new PlanetaryEconomicDynamicsEngine();

  exportUniverse() {
    const history = this.engine.getHistory();
    const latest = this.engine.getLatest();

    return {
      exportedAt: new Date(),
      latestSignal: latest ? DynamicsSignals.toSignalPacket(latest) : null,
      fullHistory: history,
    };
  }
}
