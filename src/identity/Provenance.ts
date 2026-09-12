export interface ProvenanceRecord {
  provenanceId: string;
  sourceSystem: string;
  createdBy: string;
  createdAt: Date;
  notes?: string;
}

export class Provenance {
  static create(sourceSystem: string, createdBy: string, notes?: string): ProvenanceRecord {
    return {
      provenanceId: crypto.randomUUID(),
      sourceSystem,
      createdBy,
      createdAt: new Date(),
      notes,
    };
  }
}
