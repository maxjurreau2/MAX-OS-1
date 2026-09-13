import { MaxOsSimulationLoop } from "./MaxOsSimulationLoop";

export class SimulationController {
  private loop: MaxOsSimulationLoop;

  constructor(intervalMs: number = 1000) {
    this.loop = new MaxOsSimulationLoop(intervalMs);
  }

  start() {
    console.log("Starting MAX-OS-1 Simulation...");
    this.loop.start();
  }

  stop() {
    console.log("Stopping MAX-OS-1 Simulation...");
    this.loop.stop();
  }

  status() {
    return {
      steps: this.loop.getStepCount(),
      running: true,
    };
  }
}
