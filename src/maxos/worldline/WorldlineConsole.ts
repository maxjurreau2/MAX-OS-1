import { WorldlineEngine } from "./WorldlineEngine";

export class WorldlineConsole {
  private engine = new WorldlineEngine();

  step() {
    const summary = this.engine.step(1);
    console.log("=== Worldline Step ===");
    console.log(summary);
  }

  printAllPoints() {
    console.log("=== Worldline Points ===");
    console.log(this.engine.getAllPoints());
  }
}
