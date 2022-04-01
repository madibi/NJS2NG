import { Role } from './../enum/role.enum';

export class AccessTokenPayload {
    public userId: string = '00000000-0000-0000-0000-000000000000';
    public roles: Role[] = [];

    hasRole(role: Role): boolean {
        return this.roles.includes(role);
    }
}