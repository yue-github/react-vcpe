import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 获取角色列表
 * @returns {Promise}
 */
export async function fetchRoles() {
    return request('/api/role/getRoles', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 删除角色
 * @returns {Promise}
 */
export async function deleteRole({ roleid }) {
    return request('/api/role/deleteRole', {
        method: 'POST',
        body: {
            roleid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 更新角色
 * @returns {Promise}
 */
export async function updateRole({ roleid, rolename }) {
    return request('/api/role/deleteRole', {
        method: 'POST',
        body: {
            roleid,
            rolename,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 删除角色用户
 * @returns {Promise}
 */
export async function deleteRoleUser({ roleid, uid }) {
    return request('/api/role/deleteUser', {
        method: 'POST',
        body: {
            roleid,
            uid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取角色用户列表
 * @param roleid
 * @returns {Promise}
 */
export async function fetchRoleUsers({ roleid }) {
    return request('/api/role/getRoleUsers', {
        method: 'POST',
        body: {
            roleid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取角色的权限列表
 * @param roleid
 * @returns {Promise}
 */
export async function fetchRolePermissions({ roleid }) {
    return request('/api/role/authListForId', {
        method: 'POST',
        body: {
            roleid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 更新角色权限
 * @param roleid
 * @param permissions
 * @returns {Promise}
 */
export async function updatePermission({ roleid, permissions }) {
    return request('/api/role/updatePermissions', {
        method: 'POST',
        body: {
            roleid,
            permissions,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 发送邀请
 * @param roleid
 * @param phone
 * @returns {Promise}
 */
export async function sendInvite({ roleid, phone }) {
    return request('/api/role/invitation', {
        method: 'POST',
        body: {
            roleid,
            phone,
            insid: getCurrentOrganizationId(),
        },
    });
}
