import { MaxExperienceEngine } from "./MaxExperienceEngine";

export class ExperienceConsole {
  private engine = new MaxExperienceEngine();

  printSingleExperience(pointId: string) {
    const xp = this.engine.buildExperiencePoint(pointId);
    console.log("=== MAX-Experience Point ===");
    console.log(xp);
  }

  printExperienceStream() {
    const stream = this.engine.buildExperienceStream();
    console.log("=== MAX-Experience Stream ===");
    console.log(stream);
  }
}
