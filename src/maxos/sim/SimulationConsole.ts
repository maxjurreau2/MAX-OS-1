import { SimulationController } from "./SimulationController";
import { UnifiedSimulationUniverseLayer } from "../unified/UnifiedSimulationUniverseLayer";

export class SimulationConsole {
  private controller = new SimulationController();
  private universe = new UnifiedSimulationUniverseLayer();

  start() {
    this.controller.start();
  }

  stop() {
    this.controller.stop();
  }

  printStatus() {
    console.log("=== Simulation Status ===");
    console.log(this.controller.status());
  }

  printUniverse() {
    console.log("=== Simulation Universe Export ===");
    console.log(this.universe.exportUniverse());
  }
}
