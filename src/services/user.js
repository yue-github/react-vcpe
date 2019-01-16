
import isArray from 'lodash/isArray';
import forEachRight from 'lodash/forEachRight';
import isPlainObject from 'lodash/isPlainObject';
import omitBy from 'lodash/omitBy';
import request from '../utils/request';
import { getItem, setItems, setItem, clearAll } from '../utils/storage';
import { getCurrentOrganizationId } from './organization';
// import domain from '../../config/env';
export async function query() {
    return request('/api/users');
}

/**
 * 获取当前登录用户
 * @returns {object|boolean}
 */
export function getLoginUser() {
    return getItem('user');
}

/**
 * 获取登录token
 * @returns {string|boolean}
 */
export function getLoginToken() {
    return getItem('token');
}

/**
 * 设置权限
 * @param permissions
 */
export function setPermissions(permissions) {
    let permissionsArray = permissions;

    if (isPlainObject(permissions)) {
        permissionsArray = [];
        forEachRight(permissions, (boolean, key) => {
            if (boolean === true) {
                permissionsArray.push(key);
            }
        });
    }

    if (isArray(permissionsArray)) {
        return setItem('permissions', permissionsArray);
    }

    return false;
}

/**
 * 获取用户权限数组
 * @returns Array<string>
 */
export function getPermissions() {
    let permissions = getItem('permissions');
    permissions = permissions || [];
    const user = getLoginUser();
    if (user) {
        permissions.push('admin');
    }
    return permissions;
}

/**
 * 设置当前登录用户
 * @param {object} user
 * @param {string} token
 */
export function setLoginUser(user, token) {
    return setItems({
        user,
        token,
    });
}

/**
 * 发送注册手机验证码
 * @param phone
 * @returns {Promise<void>}
 */
export async function sendRegisterSmsCode(phone) {
    return request('/api/auth/getValidCode', {
        method: 'POST',
        body: { phone },
    });
}

/**
 * 发送找回密码的验证码
 * @param phone
 * @returns {Promise<void>}
 */
export async function sendForgetPasswordSmsCode(phone) {
    return request('/api/auth/searchPassSms', {
        method: 'POST',
        body: { phone },
    });
}

/**
 * 注册用户
 * @param params
 * @returns {Promise}
 */
export async function register(params) {
    return request('/api/user/register', {
        method: 'POST',
        body: params,
    });
}

/**
 * 用户登录
 * @param params
 * @returns {Promise}
 */
export async function login(params) {
    return request('/api/user/login', {
        method: 'POST',
        body: params,
    });
}

/**
 * 退出登录
 */
export function logout() {
    clearAll();
}

/**
 * 获取未读消息数量
 * @returns {Promise}
 */
export async function fetchNoticesCount() {
    return request('/api/institution/getUnReads', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
        mapping: {
            msgCounts: 'count',
        },
    });
}

/**
 * 获取用户的消息
 * @returns {Promise}
 */
export async function fetchNotices({ filter, page, pageSize }) {
    return request('/api/institution/getMessage', {
        method: 'POST',
        body: {
            filter: omitBy(filter, v => v === '0' || v === null || v === undefined || v === ''),
            page,
            pageSize,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 重置密码
 * @param phone
 * @param password
 * @param token
 * @returns {Promise}
 */
export async function resetPassword({ phone, password, token }) {
    return request('/api/auth/resetPassSms', {
        method: 'POST',
        body: {
            phone,
            password,
            token,
        },
    });
}
