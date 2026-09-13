import { TemporalPropagationEngine } from "./TemporalPropagationEngine";

export class TemporalPropagationConsole {
  private engine = new TemporalPropagationEngine();

  step() {
    const event = this.engine.step(1);
    console.log("=== Temporal Propagation Step ===");
    console.log(event);
  }

  printAllEvents() {
    console.log("=== Temporal Propagation Events ===");
    console.log(this.engine.getAllEvents());
  }
}
