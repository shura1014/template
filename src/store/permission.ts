import {defineStore} from 'pinia';

interface Permission {
    roles: string[],
    perms: string[],
}

export const usePermissionStore = defineStore(
    "permission", {
        state: () => {
            const permissionJson = localStorage.getItem("permission")
            return permissionJson ? JSON.parse(permissionJson) : {roles: [], perms: [],}
        },
        actions: {
            GetRoles(): string[] {
                return this.roles
            },

            GetPerms(): string[] {
                return this.perms
            },

            RemovePermission() {
                localStorage.removeItem("permission")
            },

            SetPermission(permission: Permission) {
                this.roles = permission.roles
                this.perms = permission.perms
                localStorage.setItem("permission", JSON.stringify(permission))
            },
        }
    }
)
