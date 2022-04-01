import { Role } from './../enum/role.enum';

export interface AccessTokenPayload {  userId: string;  roles: Role[];    hasRole(role: Role): boolean {        return this.roles.includes(role);    }}