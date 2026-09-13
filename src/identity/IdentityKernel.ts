import { EntityIdentity, EntityIdentityFactory } from './EntityIdentity';
import { RoleIdentity, RoleIdentityFactory } from './RoleIdentity';
import { StateIdentity, StateIdentityFactory } from './StateIdentity';
import { TransitionIdentity, TransitionIdentityFactory } from './TransitionIdentity';
import { Provenance, ProvenanceRecord } from './Provenance';
import { RightType, Rights, RightsRecord } from './Rights';
import { Lineage, LineageRecord } from './Lineage';

export interface IdentityKernelContext {
  entities: Map<string, EntityIdentity>;
  roles: Map<string, RoleIdentity>;
  states: Map<string, StateIdentity>;
  transitions: Map<string, TransitionIdentity>;
  provenance: Map<string, ProvenanceRecord>;
  rights: Map<string, RightsRecord>;
  lineage: Map<string, LineageRecord>;
}

export class IdentityKernel {
  private ctx: IdentityKernelContext;

  constructor() {
    this.ctx = {
      entities: new Map(),
      roles: new Map(),
      states: new Map(),
      transitions: new Map(),
      provenance: new Map(),
      rights: new Map(),
      lineage: new Map(),
    };
  }

  createEntity(type: string, sourceSystem: string, createdBy: string): EntityIdentity {
    const prov = Provenance.create(sourceSystem, createdBy);
    this.ctx.provenance.set(prov.provenanceId, prov);

    const entity = EntityIdentityFactory.create(type, prov.provenanceId);
    this.ctx.entities.set(entity.id, entity);

    const lineage = Lineage.create(entity.id);
    this.ctx.lineage.set(lineage.lineageId, lineage);

    return entity;
  }

  createRole(name: string, authorityLevel: number, inheritsFrom?: string): RoleIdentity {
    const role = RoleIdentityFactory.create(name, authorityLevel, inheritsFrom);
    this.ctx.roles.set(role.roleId, role);
    return role;
  }

  createState(entityId: string, lineageId: string, version: number): StateIdentity {
    const state = StateIdentityFactory.create(entityId, lineageId, version);
    this.ctx.states.set(state.stateId, state);
    return state;
  }

  createTransition(
    fromStateId: string,
    toStateId: string,
    inevitabilityScore: number
  ): TransitionIdentity {
    const transition = TransitionIdentityFactory.create(
      fromStateId,
      toStateId,
      inevitabilityScore
    );
    this.ctx.transitions.set(transition.transitionId, transition);
    return transition;
  }

  grantRights(
    entityId: string,
    holderId: string,
    rightsTypes: RightType[]
  ): RightsRecord {
    const rights = Rights.grant(entityId, holderId, rightsTypes);
    this.ctx.rights.set(rights.rightsId, rights);
    return rights;
  }

  getContext(): IdentityKernelContext {
    return this.ctx;
  }
}
