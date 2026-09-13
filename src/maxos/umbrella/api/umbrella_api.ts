import { RealityFabricPatch } from "../../reality/RealityFabricEngine";
import { LawInput } from "../lanes/law_lane";
import { UmbrellaRuntime } from "../runtime/umbrella_runtime";

export class UmbrellaAPI {
  constructor(private readonly runtime: UmbrellaRuntime) {}

  checkLegality(input: LawInput) {
    return this.runtime.checkLegality(input);
  }

  queryPmd(input: LawInput) {
    return this.runtime.queryPmd(input);
  }

  rankIdentity(identityId: string, valuation: number, fusionDensity: number) {
    return this.runtime.rankIdentity(identityId, valuation, fusionDensity);
  }

  validateContinuity(previous: RealityFabricPatch | null, next: RealityFabricPatch) {
    return this.runtime.validateContinuity(previous, next);
  }

  step(dt = 1, identityId?: string) {
    return this.runtime.step(dt, identityId);
  }

  getState() {
    return this.runtime.getState();
  }
}
