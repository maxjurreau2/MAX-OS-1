import { KernelIdentityLayer } from './maxos/kernel/KernelIdentityLayer';
import { OperatorIdentityLayer } from './maxos/operator/OperatorIdentityLayer';
import { RuntimeIdentityLayer } from './maxos/runtime/RuntimeIdentityLayer';
import { ProtocolIdentityLayer } from './maxos/protocol/ProtocolIdentityLayer';
import { EconomicIdentityLayer } from './maxos/economic/EconomicIdentityLayer';
import { UnifiedIdentityLayer } from './maxos/unified/UnifiedIdentityLayer';

import { SimulationConsole } from './maxos/sim/SimulationConsole';

async function main() {
  // --- Identity Kernel + Layers Initialization ---
  const kernelLayer = KernelIdentityLayer.getInstance();
  const operator = new OperatorIdentityLayer();
  const runtime = new RuntimeIdentityLayer();
  const protocol = new ProtocolIdentityLayer();
  const economic = new EconomicIdentityLayer();
  const unified = new UnifiedIdentityLayer();

  // --- Create an entity ---
  const entity = operator.createEntityWithDefaults('GS-IP-STRUCTURAL', 'max');

  // --- Context + lineage extraction ---
  const ctx = kernelLayer.getIdentityKernel().getContext();
  const lineageId = Array.from(ctx.lineage.values())[0]?.lineageId;

  // --- Runtime state + transition ---
  const s1 = runtime.createState(entity.id, lineageId, 1);
  const s2 = runtime.createState(entity.id, lineageId, 2);
  runtime.createTransition(s1.stateId, s2.stateId, 0.9);

  // --- Protocol rights ---
  protocol.grantRights(entity.id, 'max', ['OWN', 'USE']);
  const ok = protocol.enforceRights(entity.id, 'max', ['OWN']);

  // --- Economic + Unified Identity Model ---
  const values = economic.listEntitiesWithValue();
  const unifiedModel = unified.getUnifiedIdentityModel();

  console.log("=== Identity + Economic Initialization ===");
  console.log({ ok, values, unifiedModel });

  // --- Start MAX‑OS‑1 Simulation ---
  const sim = new SimulationConsole();
  sim.start();

  // --- Stop after 10 seconds and export universe ---
  setTimeout(() => {
    sim.stop();
    sim.printUniverse();
  }, 10000);
}

main().catch(console.error);
