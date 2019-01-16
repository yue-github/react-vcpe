import omitBy from 'lodash/omitBy';
import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 创建项目
 * @param payload
 * @returns {Promise}
 */
export async function createProject(payload) {
    return request('/api/project/add', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            ...payload,
        },
        mapping: {
            projectid: 'id',
        },
    });
}

/**
 * 获取过滤条件
 * @returns {Promise}
 */
export async function fetchFilters() {
    return request('/api/project/getFilterParam', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
        mapping: {
            projectcates: 'industry',
        },
    });
}

/**
 * 查询列表
 * @param payload
 * @returns {Promise}
 */
export async function fetchList({ page, pageSize, filter }) {
    return request('/api/project/getData', {
        method: 'POST',
        body: {
            page,
            pageSize,
            filter: omitBy(filter, v => v === '0' || v === null || v === undefined || v === ''),
            insid: getCurrentOrganizationId(),
        },
        mapping: ({ total, projects, ...other }) => ({
            page: other.page,
            pageSize: other.pageSize,
            total,
            list: projects,
        }),
    });
}

/**
 * 查询项目的详细信息
 * @param id
 * @param payload
 * @returns {Promise}
 */
export async function fetchBasic({ id }) {
    return request('/api/project/getInfo', {
        method: 'POST',
        body: {
            projectid: id,
        },
        // 字段映射
        mapping: ({ projects, ...data }) => ({
            ...data,
            ...projects,
        }),
    });
}

/**
 * 更新项目基本信息
 * @param id
 * @param params
 * @returns {Promise}
 */
export async function updateBasic({ id, ...payload }) {
    return request('/api/project/update', {
        method: 'POST',
        body: {
            projectid: id,
            ...payload,
        },
    });
}

/**
 * 删除项目
 * @param id
 * @returns {Promise}
 */
export async function deleteProject({ id }) {
    return request('/api/project/delete', {
        method: 'POST',
        body: {
            projectid: id,
        },
    });
}

/**
 * 新增行业
 * @param name
 * @returns {Promise}
 */
export async function addIndustry({ name }) {
    return request('/api/project/addProCates', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            name,
        },
    });
}

/**
 * 更新行业
 * @param id
 * @param name
 * @returns {Promise}
 */
export async function updateIndustry({ id, name }) {
    return request('/api/project/updateProCates', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            id,
            name,
        },
    });
}

/**
 * 删除行业
 * @param id
 * @returns {Promise}
 */
export async function deleteIndustry({ id }) {
    return request('/api/project/delProCates', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            id,
        },
    });
}

/**
 * 获取项目文件
 * @param id
 * @returns {Promise}
 */
export async function fetchFiles({ id }) {
    return request('/api/project/getFile', {
        method: 'POST',
        body: {
            projectid: id,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取项目任务列表
 * @param id
 * @returns {Promise}
 */
export async function fetchTasks({ id }) {
    return request('/api/project/tasks', {
        method: 'POST',
        body: {
            projectid: id,
            insid: getCurrentOrganizationId(),
        },
    });
}
