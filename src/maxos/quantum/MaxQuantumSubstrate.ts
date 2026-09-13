import { UnifiedIdentityEconomicFusionUniverse } from "../unified/UnifiedIdentityEconomicFusionUniverse";

export interface QuantumSample {
  sampleId: string;
  takenAt: Date;
  fusedDensity: number;
  fusedFlowRatio: number;
}

export class MaxQuantumSubstrate {
  private fusionUniverse = new UnifiedIdentityEconomicFusionUniverse();
  private samples: QuantumSample[] = [];

  sample(sampleId: string): QuantumSample {
    const fusion = this.fusionUniverse.exportUniverse();
    const latest = fusion.latestFusion;

    const sample: QuantumSample = {
      sampleId,
      takenAt: new Date(),
      fusedDensity: latest?.metrics?.density ?? 0,
      fusedFlowRatio: latest?.metrics?.flowRatio ?? 0,
    };

    this.samples.push(sample);
    return sample;
  }

  getAllSamples() {
    return this.samples;
  }
}
