import { RealityFabricPatch } from "../../reality/RealityFabricEngine";
import { ContinuityCheck, ContinuityLogic } from "../continuity/continuity_logic";
import { SubstrateGeometry, SubstrateGeometryState } from "../geometry/substrate_geometry";
import { ActivationLock, ActivationLockResult } from "../lanes/activation_lock";
import { LawInput, LawLane, LawVerdict } from "../lanes/law_lane";
import { PmdLane, PmdResult } from "../lanes/pmd_lane";
import { RankingBand, RankingResult } from "../lanes/ranking_band";
import { RevenueTrajectory, RevenueTrajectoryState } from "../lanes/revenue_trajectory";

export interface UmbrellaRuntimeState {
  tick: number;
  timestamp: Date;
  law: LawVerdict;
  pmd: PmdResult;
  activation: ActivationLockResult;
  ranking: RankingResult;
  revenue: RevenueTrajectoryState;
  geometry: SubstrateGeometryState;
  continuity: ContinuityCheck;
  realityFrame: RealityFabricPatch;
}

export class UmbrellaRuntime {
  private readonly lawLane: LawLane;
  private readonly pmdLane: PmdLane;
  private readonly activationLock: ActivationLock;
  private readonly rankingBand: RankingBand;
  private readonly revenueTrajectory: RevenueTrajectory;
  private readonly substrateGeometry: SubstrateGeometry;
  private readonly continuityLogic: ContinuityLogic;
  private tick = 0;
  private previousFrame: RealityFabricPatch | null = null;
  private state: UmbrellaRuntimeState | null = null;

  constructor() {
    this.lawLane = new LawLane();
    this.pmdLane = new PmdLane(this.lawLane);
    this.activationLock = new ActivationLock();
    this.rankingBand = new RankingBand();
    this.revenueTrajectory = new RevenueTrajectory();
    this.substrateGeometry = new SubstrateGeometry();
    this.continuityLogic = new ContinuityLogic();
  }

  initialize() {
    this.tick = 0;
    this.previousFrame = null;
    this.state = null;
    this.activationLock.lock();
  }

  step(dt = 1, identityId?: string): UmbrellaRuntimeState {
    if (!Number.isFinite(dt) || dt <= 0) {
      throw new Error("UmbrellaRuntime step requires a finite, positive dt");
    }

    this.tick += 1;
    const revenue = this.revenueTrajectory.step(identityId);
    const realityFrame = this.continuityLogic.captureFrame(dt);
    const geometry = this.substrateGeometry.analyze(
      {
        t: realityFrame.t,
        points: [{ position: realityFrame.centroid }],
      },
      {
        t: realityFrame.t,
        deltaDensity: realityFrame.identityDensity,
        deltaFlow: realityFrame.flowRatio,
        physicsDrift: realityFrame.temporalWeight,
      },
    );
    const lawInput: LawInput = {
      identity: { id: revenue.identityId, active: true },
      economics: {
        valuation: revenue.valuation,
        momentum: revenue.economicMomentum,
        fusionDensity: revenue.fusionDensity,
      },
      manifold: {
        stability: geometry.stability,
        curvature: geometry.curvature,
        propagationRate: geometry.propagationRate,
      },
    };
    const law = this.lawLane.enforce(lawInput);
    const pmd = this.pmdLane.applyConstraints(lawInput);
    const activation = this.activationLock.update(pmd, law);
    const ranking = this.rankingBand.assign(
      revenue.identityId,
      revenue.valuation,
      revenue.fusionDensity,
    );
    const continuity = this.continuityLogic.validateTransition(this.previousFrame, realityFrame);

    this.previousFrame = realityFrame;
    this.state = {
      tick: this.tick,
      timestamp: new Date(),
      law,
      pmd,
      activation,
      ranking,
      revenue,
      geometry,
      continuity,
      realityFrame,
    };
    return this.state;
  }

  checkLegality(input: LawInput) {
    return this.lawLane.evaluate(input);
  }

  queryPmd(input: LawInput) {
    return this.pmdLane.applyConstraints(input);
  }

  rankIdentity(identityId: string, valuation: number, fusionDensity: number) {
    return this.rankingBand.assign(identityId, valuation, fusionDensity);
  }

  validateContinuity(previous: RealityFabricPatch | null, next: RealityFabricPatch) {
    return this.continuityLogic.validateTransition(previous, next);
  }

  getState() {
    return this.state;
  }

  printState() {
    console.log("=== Umbrella Governance State ===");
    console.log(this.state);
  }
}
