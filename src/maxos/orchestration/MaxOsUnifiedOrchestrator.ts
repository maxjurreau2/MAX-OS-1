import { SimulationConsole } from "../sim/SimulationConsole";
import { PlanetaryPhysicsConsole } from "../physics/PlanetaryPhysicsConsole";
import { ExperienceConsole } from "../experience/ExperienceConsole";
import { QuantumConsole } from "../quantum/QuantumConsole";
import { SpatialManifoldConsole } from "../spatial/SpatialManifoldConsole";
import { TemporalPropagationConsole } from "../temporal/TemporalPropagationConsole";
import { ConsciousnessConsole } from "../consciousness/ConsciousnessConsole";
import { CausalityConsole } from "../causality/CausalityConsole";
import { EventShapeConsole } from "../eventshape/EventShapeConsole";
import { WorldlineConsole } from "../worldline/WorldlineConsole";
import { RealityFabricConsole } from "../reality/RealityFabricConsole";

export class MaxOsUnifiedOrchestrator {
  private sim = new SimulationConsole();
  private physics = new PlanetaryPhysicsConsole();
  private experience = new ExperienceConsole();
  private quantum = new QuantumConsole();
  private spatial = new SpatialManifoldConsole();
  private temporal = new TemporalPropagationConsole();
  private consciousness = new ConsciousnessConsole();
  private causality = new CausalityConsole();
  private eventShape = new EventShapeConsole();
  private worldline = new WorldlineConsole();
  private realityFabric = new RealityFabricConsole();

  startAll() {
    console.log("=== MAX‑OS‑1 Unified Orchestration Start ===");

    this.sim.start();
    this.physics.initDemoPlanet();
    this.spatial.init();

    setInterval(() => {
      this.physics.step();
      this.spatial.step();
      this.temporal.step();
      this.consciousness.step();
      this.causality.step();
      this.eventShape.step();
      this.worldline.step();
      this.realityFabric.step();
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
    this.temporal.printAllEvents();
    this.consciousness.printAllFrames();
    this.causality.printAllLinks();
    this.eventShape.printAllShapes();
    this.worldline.printAllPoints();
    this.realityFabric.printAllPatches();
  }
}
