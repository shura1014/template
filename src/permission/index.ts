import {DirectiveBinding} from 'vue';
import {usePermissionStore} from "@/store/permission";


export function hasPerm(el: HTMLElement, binding: DirectiveBinding) {
    let permission = usePermissionStore();
    const roles = permission.GetRoles();
    // 超级权限
    if (roles.includes('ROOT')) {
        return true;
    }
    const {value} = binding;
    if (value) {
        const requiredPerms = value;

        const hasPerm = permission.GetPerms()?.some((perm: string) => {
            return requiredPerms.includes(perm);
        });

        if (!hasPerm) {
            // 隐藏
            el['hidden'] = true;
            // 删除
            // el.parentNode && el.parentNode.removeChild(el);
        }
    }

    return true;

}