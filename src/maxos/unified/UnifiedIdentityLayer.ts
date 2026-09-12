import { PlanetaryIdentityLayer } from '../planetary/PlanetaryIdentityLayer';

export class UnifiedIdentityLayer {
  private planetary = new PlanetaryIdentityLayer();

  getUnifiedIdentityModel() {
    // later: merge across worlds; for now, single-world unified view
    return this.planetary.exportGlobalIdentitySnapshot();
  }
}
