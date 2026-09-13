import { ConsciousnessSubstrateEngine } from "./ConsciousnessSubstrateEngine";

export class ConsciousnessConsole {
  private engine = new ConsciousnessSubstrateEngine();

  step() {
    const frame = this.engine.step(1);
    console.log("=== Consciousness Frame ===");
    console.log(frame);
  }

  printAllFrames() {
    console.log("=== Consciousness Frames ===");
    console.log(this.engine.getAllFrames());
  }
}
