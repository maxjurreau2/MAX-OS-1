import { TemporalPropagationEngine } from "../temporal/TemporalPropagationEngine";

export interface CausalLink {
  linkId: string;
  fromEventId: string;
  toEventId: string;
  weight: number;
}

export class CausalityEngine {
  private temporal = new TemporalPropagationEngine();
  private links: CausalLink[] = [];
  private lastEventId: string | null = null;

  step() {
    const event = this.temporal.step(1);

    if (this.lastEventId) {
      const weight =
        Math.abs(event.deltaDensity) +
        Math.abs(event.deltaFlow) +
        Math.abs(event.physicsDrift);

      const link: CausalLink = {
        linkId: `cl-${event.eventId}`,
        fromEventId: this.lastEventId,
        toEventId: event.eventId,
        weight,
      };

      this.links.push(link);
    }

    this.lastEventId = event.eventId;
    return event;
  }

  getAllLinks() {
    return this.links;
  }
}
