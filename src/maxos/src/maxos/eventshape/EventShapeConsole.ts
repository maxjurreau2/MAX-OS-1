import { EventShapeEngine } from "./EventShapeEngine";

export class EventShapeConsole {
  private engine = new EventShapeEngine();

  step() {
    const shape = this.engine.step(1);
    console.log("=== Event-Shape Step ===");
    console.log(shape);
  }

  printAllShapes() {
    console.log("=== Event-Shape History ===");
    console.log(this.engine.getAllShapes());
  }
}
