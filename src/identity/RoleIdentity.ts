export interface RoleIdentity {
  roleId: string;
  name: string;
  authorityLevel: number;
  inheritsFrom?: string; // parent roleId
}

export class RoleIdentityFactory {
  static create(name: string, authorityLevel: number, inheritsFrom?: string): RoleIdentity {
    return {
      roleId: crypto.randomUUID(),
      name,
      authorityLevel,
      inheritsFrom,
    };
  }
}
