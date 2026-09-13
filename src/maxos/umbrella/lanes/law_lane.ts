export interface UmbrellaIdentity {
  id: string;
  active?: boolean;
}

export interface UmbrellaEconomicMetrics {
  valuation: number;
  momentum: number;
  fusionDensity: number;
}

export interface UmbrellaManifoldState {
  stability: number;
  curvature: number;
  propagationRate: number;
}

export interface LawInput {
  identity: UmbrellaIdentity;
  economics: UmbrellaEconomicMetrics;
  manifold: UmbrellaManifoldState;
}

export interface AppliedConstraint {
  ruleId: string;
  field: string;
  message: string;
  actual: unknown;
}

export interface LawVerdict {
  legal: boolean;
  appliedConstraints: AppliedConstraint[];
}

export interface LawRule {
  id: string;
  evaluate(input: LawInput): AppliedConstraint | null;
}

export class LawLane {
  private readonly rules = new Map<string, LawRule>();

  constructor(rules: LawRule[] = LawLane.defaultRules()) {
    rules.forEach(rule => this.registerRule(rule));
  }

  registerRule(rule: LawRule) {
    if (!rule.id.trim()) {
      throw new Error("Law rules require a non-empty id");
    }
    this.rules.set(rule.id, rule);
  }

  removeRule(ruleId: string) {
    return this.rules.delete(ruleId);
  }

  listRules() {
    return Array.from(this.rules.keys());
  }

  evaluate(input: LawInput): LawVerdict {
    const appliedConstraints = Array.from(this.rules.values())
      .map(rule => rule.evaluate(input))
      .filter((constraint): constraint is AppliedConstraint => constraint !== null);

    return {
      legal: appliedConstraints.length === 0,
      appliedConstraints,
    };
  }

  enforce(input: LawInput): LawVerdict {
    return this.evaluate(input);
  }

  private static defaultRules(): LawRule[] {
    return [
      {
        id: "identity.required",
        evaluate: ({ identity }) =>
          identity.id.trim() && identity.active !== false
            ? null
            : {
                ruleId: "identity.required",
                field: "identity",
                message: "An active identity is required",
                actual: identity,
              },
      },
      LawLane.finiteMinimumRule("economics.valuation", input => input.economics.valuation, 0),
      LawLane.finiteRule("economics.momentum", input => input.economics.momentum),
      LawLane.finiteMinimumRule("economics.fusionDensity", input => input.economics.fusionDensity, 0),
      LawLane.finiteRangeRule("manifold.stability", input => input.manifold.stability, 0, 1),
      LawLane.finiteMinimumRule("manifold.curvature", input => input.manifold.curvature, 0),
      LawLane.finiteMinimumRule(
        "manifold.propagationRate",
        input => input.manifold.propagationRate,
        0,
      ),
    ];
  }

  private static finiteRule(field: string, read: (input: LawInput) => number): LawRule {
    return {
      id: `${field}.finite`,
      evaluate: input => {
        const actual = read(input);
        return Number.isFinite(actual)
          ? null
          : {
              ruleId: `${field}.finite`,
              field,
              message: `${field} must be finite`,
              actual,
            };
      },
    };
  }

  private static finiteMinimumRule(
    field: string,
    read: (input: LawInput) => number,
    minimum: number,
  ): LawRule {
    return {
      id: `${field}.minimum`,
      evaluate: input => {
        const actual = read(input);
        return Number.isFinite(actual) && actual >= minimum
          ? null
          : {
              ruleId: `${field}.minimum`,
              field,
              message: `${field} must be finite and at least ${minimum}`,
              actual,
            };
      },
    };
  }

  private static finiteRangeRule(
    field: string,
    read: (input: LawInput) => number,
    minimum: number,
    maximum: number,
  ): LawRule {
    return {
      id: `${field}.range`,
      evaluate: input => {
        const actual = read(input);
        return Number.isFinite(actual) && actual >= minimum && actual <= maximum
          ? null
          : {
              ruleId: `${field}.range`,
              field,
              message: `${field} must be between ${minimum} and ${maximum}`,
              actual,
            };
      },
    };
  }
}
