import { RealityFabricEngine } from "./RealityFabricEngine";

export class RealityFabricConsole {
  private engine = new RealityFabricEngine();

  step() {
    const patch = this.engine.step(1);
    console.log("=== Reality Fabric Step ===");
    console.log(patch);
  }

  printAllPatches() {
    console.log("=== Reality Fabric Patches ===");
    console.log(this.engine.getAllPatches());
  }
}
