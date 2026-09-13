import { LawVerdict } from "./law_lane";
import { PmdResult } from "./pmd_lane";

export type ActivationLockState = "locked" | "unlocked";

export interface ActivationLockResult {
  state: ActivationLockState;
  violations: string[];
  unlocked: boolean;
}

export class ActivationLock {
  private state: ActivationLockState = "locked";

  detectViolations(pmd: PmdResult, law: LawVerdict = pmd.law) {
    const violations = law.appliedConstraints.map(constraint => constraint.message);
    if (pmd.mode === "prohibited") violations.push("PMD mode prohibits activation");
    return Array.from(new Set(violations));
  }

  canUnlock(pmd: PmdResult, law: LawVerdict = pmd.law) {
    return law.legal && (pmd.mode === "latent" || pmd.mode === "stable");
  }

  update(pmd: PmdResult, law: LawVerdict = pmd.law): ActivationLockResult {
    const violations = this.detectViolations(pmd, law);
    this.state = this.canUnlock(pmd, law) ? "unlocked" : "locked";
    return { state: this.state, violations, unlocked: this.state === "unlocked" };
  }

  lock() {
    this.state = "locked";
  }

  getState() {
    return this.state;
  }
}
