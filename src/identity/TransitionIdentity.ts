export interface TransitionIdentity {
  transitionId: string;
  fromStateId: string;
  toStateId: string;
  inevitabilityScore: number;
  signature: string;
  createdAt: Date;
}

export class TransitionIdentityFactory {
  static create(
    fromStateId: string,
    toStateId: string,
    inevitabilityScore: number
  ): TransitionIdentity {
    const transitionId = crypto.randomUUID();
    const signature = `${fromStateId}->${toStateId}:${inevitabilityScore}`;
    return {
      transitionId,
      fromStateId,
      toStateId,
      inevitabilityScore,
      signature,
      createdAt: new Date(),
    };
  }
}
