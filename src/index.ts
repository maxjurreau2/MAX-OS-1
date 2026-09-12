import { KernelIdentityLayer } from './maxos/kernel/KernelIdentityLayer';
import { OperatorIdentityLayer } from './maxos/operator/OperatorIdentityLayer';
import { RuntimeIdentityLayer } from './maxos/runtime/RuntimeIdentityLayer';
import { ProtocolIdentityLayer } from './maxos/protocol/ProtocolIdentityLayer';
import { EconomicIdentityLayer } from './maxos/economic/EconomicIdentityLayer';
import { UnifiedIdentityLayer } from './maxos/unified/UnifiedIdentityLayer';

async function main() {
  const kernelLayer = KernelIdentityLayer.getInstance();
  const operator = new OperatorIdentityLayer();
  const runtime = new RuntimeIdentityLayer();
  const protocol = new ProtocolIdentityLayer();
  const economic = new EconomicIdentityLayer();
  const unified = new UnifiedIdentityLayer();

  const entity = operator.createEntityWithDefaults('GS-IP-STRUCTURAL', 'max');

  const ctx = kernelLayer.getIdentityKernel().getContext();
  const lineageId = Array.from(ctx.lineage.values())[0]?.lineageId;

  const s1 = runtime.createState(entity.id, lineageId, 1);
  const s2 = runtime.createState(entity.id, lineageId, 2);
  runtime.createTransition(s1.stateId, s2.stateId, 0.9);

  protocol.grantRights(entity.id, 'max', ['OWN', 'USE']);
  const ok = protocol.enforceRights(entity.id, 'max', ['OWN']);

  const values = economic.listEntitiesWithValue();
  const unifiedModel = unified.getUnifiedIdentityModel();

  console.log({ ok, values, unifiedModel });
}

main().catch(console.error);
