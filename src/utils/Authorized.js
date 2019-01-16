import RenderAuthorized from '../components/Authorized';
import CheckPermissions from '../components/Authorized/CheckPermissions';
import { getPermissions } from '../services/user';

let Authorized = RenderAuthorized(getPermissions()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getPermissions());
};

export { reloadAuthorized };
export default Authorized;

// 检查权限
export function checkPermission(permission) {
    return CheckPermissions(permission, true) === true;
}
