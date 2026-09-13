import { SimulationConsole } from "../sim/SimulationConsole";
import { PlanetaryPhysicsConsole } from "../physics/PlanetaryPhysicsConsole";
import { ExperienceConsole } from "../experience/ExperienceConsole";
import { QuantumConsole } from "../quantum/QuantumConsole";
import { SpatialManifoldConsole } from "../spatial/SpatialManifoldConsole";

export class MaxOsUnifiedOrchestrator {
  private sim = new SimulationConsole();
  private physics = new PlanetaryPhysicsConsole();
  private experience = new ExperienceConsole();
  private quantum = new QuantumConsole();
  private spatial = new SpatialManifoldConsole();

  startAll() {
    console.log("=== MAX‑OS‑1 Unified Orchestration Start ===");

    this.sim.start();

    this.physics.initDemoPlanet();
    this.spatial.init();

    setInterval(() => {
      this.physics.step();
      this.spatial.step();
    }, 1000);

    setInterval(() => {
      this.experience.printSingleExperience("xp-live");
    }, 3000);

    setInterval(() => {
      this.quantum.takeSample("q-sample");
    }, 5000);
  }

  stopAll() {
    console.log("=== MAX‑OS‑1 Unified Orchestration Stop ===");
    this.sim.stop();
    this.quantum.printAllSamples();
    this.experience.printExperienceStream();
    this.spatial.printAllPoints();
  }
}
