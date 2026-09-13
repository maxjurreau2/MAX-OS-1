import { CausalityEngine } from "./CausalityEngine";

export class CausalityConsole {
  private engine = new CausalityEngine();

  step() {
    const event = this.engine.step();
    console.log("=== Causality Step (Temporal Event) ===");
    console.log(event);
  }

  printAllLinks() {
    console.log("=== Causal Links ===");
    console.log(this.engine.getAllLinks());
  }
}
