import { EconomicOrchestrationLayer } from "./EconomicOrchestrationLayer";
import { UnifiedEconomicUniverseLayer } from "../unified/UnifiedEconomicUniverseLayer";

export class EconomicConsole {
  private orchestration = new EconomicOrchestrationLayer();
  private unified = new UnifiedEconomicUniverseLayer();

  // Print global economic snapshot
  printGlobalSnapshot() {
    const snapshot = this.orchestration.getGlobalEconomicSnapshot();
    console.log("=== MAX-OS-1 Global Economic Snapshot ===");
    console.log("Registry entries:", snapshot.registry.length);
    console.log("Valuations:", snapshot.valuations.length);
    console.log("Fractions:", snapshot.fractions.length);
    console.log("Futures:", snapshot.futures.length);
    console.log("Licenses:", snapshot.licenses.length);
  }

  // Print unified economic universe snapshot
  printUnifiedUniverse() {
    const unified = this.unified.getUnifiedEconomicSnapshot();
    console.log("=== MAX-OS-1 Unified Economic Universe ===");
    console.log("Timestamp:", unified.timestamp);
    console.log("Total valuations:", unified.valuations.length);
    console.log("Economic density:", unified.density.density);
    console.log("Liquidity flow ratio:", unified.flow.flowRatio);
  }

  // Print economic profile for a single entity
  printEntityProfile(entityId: string) {
    const profile = this.orchestration.getEntityEconomicProfile(entityId);
    console.log(`=== Economic Profile for Entity ${entityId} ===`);
    console.log("Registry records:", profile.registry.length);
    console.log("Valuations:", profile.valuations.length);
    console.log("Fractions:", profile.fractions.length);
    console.log("Futures:", profile.futures.length);
    console.log("Licenses:", profile.licenses.length);
  }
}
