import { KernelIdentityLayer } from "../kernel/KernelIdentityLayer";

import { IPRegistry } from "../../liquidity/IPRegistry";
import { ValuationEngine } from "../../liquidity/ValuationEngine";
import { FractionalIP } from "../../liquidity/FractionalIP";
import { FuturesEngine } from "../../liquidity/FuturesEngine";
import { EnterpriseLicensing } from "../../liquidity/EnterpriseLicensing";

export class LiquidityIntegrationLayer {
  private kernel = KernelIdentityLayer.getInstance().getIdentityKernel();

  private registry: IPRegistry;
  private valuation: ValuationEngine;
  private fractional: FractionalIP;
  private futures: FuturesEngine;
  private licensing: EnterpriseLicensing;

  constructor() {
    this.registry = new IPRegistry(this.kernel);
    this.valuation = new ValuationEngine(this.kernel);
    this.fractional = new FractionalIP();
    this.futures = new FuturesEngine();
    this.licensing = new EnterpriseLicensing();
  }

  // --- Registry ---
  registerEntity(entityId: string) {
    return this.registry.registerEntity(entityId);
  }

  listRegistry() {
    return this.registry.list();
  }

  // --- Valuation ---
  valueEntity(entityId: string) {
    return this.valuation.valueEntity(entityId);
  }

  listValuations() {
    return this.valuation.list();
  }

  // --- Fractionalization ---
  fractionalize(entityId: string, holderId: string, totalShares: number, shares: number) {
    return this.fractional.createFraction(entityId, holderId, totalShares, shares);
  }

  listFractions() {
    return this.fractional.list();
  }

  // --- Futures ---
  createFuture(entityId: string, holderId: string, strikeValue: number, expiry: Date) {
    return this.futures.createFuture(entityId, holderId, strikeValue, expiry);
  }

  listFutures() {
    return this.futures.list();
  }

  // --- Enterprise Licensing ---
  createLicense(entityId: string, enterpriseId: string, terms: string) {
    return this.licensing.createLicense(entityId, enterpriseId, terms);
  }

  listLicenses() {
    return this.licensing.list();
  }
}
