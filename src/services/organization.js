import request from '../utils/request';
import { getItem, setItem } from '../utils/storage';

export async function queryOrganizations() {
    return request('/api/institution/getMyIns', {
        method: 'POST',
    });
}

/**
 * 设置当前机构
 * @param {string} org
 */
export function setCurrentOrganization(org) {
    return setItem('organization', org);
}

/**
 * 获取当前机构
 * @returns {string | null}
 */
export function getCurrentOrganization() {
    return getItem('organization');
}

/**
 * 获取当前机构ID
 * @returns {*}
 */
export function getCurrentOrganizationId() {
    const organization = getCurrentOrganization();
    if (organization) {
        return organization.id;
    }
    return null;
}

/**
 * 获取机构权限
 * @returns {Promise}
 */
export async function fetchPermissions() {
    const organization = getCurrentOrganization();
    return request('/api/institution/getAuthority', {
        method: 'POST',
        body: {
            // 机构ID
            insid: organization.id,
        },
    });
}

/**
 * 创建机构
 * @param params
 * @returns {Promise}
 */
export async function createOrganization(params) {
    return request('/api/institution/addIns', {
        method: 'POST',
        body: params,
    });
}

/**
 * 更新机构
 * @param params
 * @returns {Promise}
 */
export async function updateOrganization({ id, insname }) {
    return request('/api/institution/updateIns', {
        method: 'POST',
        body: {
            id,
            insname,
        },
    });
}
