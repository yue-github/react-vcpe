import omitBy from 'lodash/omitBy';
import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 获取任务列表
 * @param payload
 * @returns {Promise}
 */
export async function fetchList({ page, pageSize, filter } = { page: 1 }) {
    return request('/api/task/getTaskList', {
        method: 'POST',
        body: {
            page,
            pageSize,
            filter: omitBy(filter, v => v === '0' || v === null || v === undefined || v === ''),
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 删除任务
 * @param taskid
 * @returns {Promise}
 */
export async function deleteTask({ taskid }) {
    return request('/api/task/deleteTask', {
        method: 'POST',
        body: {
            taskid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 创建任务
 * @param payload
 * @returns {Promise}
 */
export async function createTask(payload) {
    return request('/api/task/createTask', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            ...payload,
        },
    });
}

/**
 * 获取任务的详细信息
 * @param taskid
 * @returns {Promise}
 */
export async function fetchTask({ taskid }) {
    return request('/api/task/taskinfo', {
        method: 'POST',
        body: {
            taskid,
            insid: getCurrentOrganizationId(),
        },
        mapping: {
            followusers: 'follows',
        },
    });
}

/**
 * 获取所有用户
 * @param payload
 * @returns {Promise}
 */
export async function fetchUsers(payload) {
    return request('/api/task/users', {
        method: 'POST',
        body: {
            ...payload,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 添加关注者
 * @param payload
 * @returns {Promise}
 */
export async function addFollower({ taskid, uid }) {
    return request('/api/task/updateFollow', {
        method: 'POST',
        body: {
            taskid,
            uid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 删除关注者
 * @param payload
 * @returns {Promise}
 */
export async function deleteFollower({ taskid, uid }) {
    return request('/api/task/delFollow', {
        method: 'POST',
        body: {
            taskid,
            uid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 添加评论
 * @param taskid
 * @param content
 * @returns {Promise}
 */
export async function addComment({ taskid, content }) {
    return request('/api/task/addCommets', {
        method: 'POST',
        body: {
            taskid,
            contents: content,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 更新任务
 * @param payload
 * @returns {Promise}
 */
export async function updateTask({ taskid, title, enddate, description }) {
    return request('/api/task/updateTask', {
        method: 'POST',
        body: {
            taskid,
            title,
            enddate,
            description,
            insid: getCurrentOrganizationId(),
        },
    });
}
