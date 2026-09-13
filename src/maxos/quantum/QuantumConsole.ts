import { MaxQuantumSubstrate } from "./MaxQuantumSubstrate";

export class QuantumConsole {
  private substrate = new MaxQuantumSubstrate();

  takeSample(id: string) {
    const sample = this.substrate.sample(id);
    console.log("=== MAX-Quantum Sample ===");
    console.log(sample);
  }

  printAllSamples() {
    console.log("=== MAX-Quantum Sample History ===");
    console.log(this.substrate.getAllSamples());
  }
}
