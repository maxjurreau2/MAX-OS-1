import { LawInput, LawLane, LawVerdict } from "./law_lane";

export type PmdMode = "latent" | "transitional" | "stable" | "prohibited";

export interface PmdTransition {
  from: PmdMode;
  to: PmdMode;
  changed: boolean;
}

export interface PmdResult {
  mode: PmdMode;
  transition: PmdTransition;
  law: LawVerdict;
  modalConstraints: string[];
}

export class PmdLane {
  private mode: PmdMode = "latent";

  constructor(private readonly lawLane: LawLane) {}

  classify(input: LawInput, law: LawVerdict = this.lawLane.evaluate(input)): PmdMode {
    if (!law.legal) return "prohibited";
    if (input.economics.fusionDensity === 0 && input.manifold.propagationRate === 0) {
      return "latent";
    }
    if (input.manifold.stability >= 0.75 && Math.abs(input.economics.momentum) <= 1) {
      return "stable";
    }
    return "transitional";
  }

  transitionTo(next: PmdMode): PmdTransition {
    const transition = { from: this.mode, to: next, changed: this.mode !== next };
    this.mode = next;
    return transition;
  }

  applyConstraints(input: LawInput): PmdResult {
    const law = this.lawLane.enforce(input);
    const mode = this.classify(input, law);
    const transition = this.transitionTo(mode);
    const modalConstraints = law.appliedConstraints.map(constraint => constraint.message);

    if (mode === "transitional") {
      modalConstraints.push("Transitions require activation-lock clearance");
    } else if (mode === "prohibited") {
      modalConstraints.push("Propagation is prohibited until all law constraints pass");
    }

    return { mode, transition, law, modalConstraints };
  }

  getMode() {
    return this.mode;
  }
}
