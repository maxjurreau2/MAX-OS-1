import { SimulationConsole } from "../sim/SimulationConsole";
import { PlanetaryPhysicsConsole } from "../physics/PlanetaryPhysicsConsole";
import { ExperienceConsole } from "../experience/ExperienceConsole";
import { QuantumConsole } from "../quantum/QuantumConsole";

export class MaxOsUnifiedOrchestrator {
  private sim = new SimulationConsole();
  private physics = new PlanetaryPhysicsConsole();
  private experience = new ExperienceConsole();
  private quantum = new QuantumConsole();

  startAll() {
    console.log("=== MAX‑OS‑1 Unified Orchestration Start ===");

    // Start simulation loop
    this.sim.start();

    // Initialize physics
    this.physics.initDemoPlanet();

    // Begin physics stepping
    setInterval(() => {
      this.physics.step();
    }, 1000);

    // Experience stream generation
    setInterval(() => {
      this.experience.printSingleExperience("xp-live");
    }, 3000);

    // Quantum sampling
    setInterval(() => {
      this.quantum.takeSample("q-sample");
    }, 5000);
  }

  stopAll() {
    console.log("=== MAX‑OS‑1 Unified Orchestration Stop ===");
    this.sim.stop();
    this.quantum.printAllSamples();
    this.experience.printExperienceStream();
  }
}
