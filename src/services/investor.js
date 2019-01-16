import omitBy from 'lodash/omitBy';
import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 创建投资人
 * @param params
 * @returns {Promise}
 */
export async function createInvestor(params) {
    return request('/api/investor/add', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            ...params,
        },
    });
}

/**
 * 获取过滤条件
 * @returns {Promise}
 */
export async function fetchFilters() {
    return request('/api/investor/getFilterParam', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 查询列表
 * @param payload
 * @returns {Promise}
 */
export async function fetchList({ page, pageSize, filter }) {
    return request('/api/investor/getData', {
        method: 'POST',
        body: {
            page,
            pageSize,
            filter: omitBy(filter, v => v === '0' || v === null || v === undefined || v === ''),
            insid: getCurrentOrganizationId(),
        },
        mapping: ({ total, investors, ...other }) => ({
            page: other.page,
            pageSize: other.pageSize,
            total,
            list: investors,
        }),
    });
}

/**
 * 查询投资人的详细信息
 * @param id
 * @returns {Promise}
 */
export async function fetchBasic({ id }) {
    return request('/api/investor/getInfo', {
        method: 'POST',
        body: {
            investorid: id,
        },
        // 字段映射
        mapping: ({ investors, ...data }) => ({
            ...data,
            ...investors,
        }),
    });
}

/**
 * 更新投资人基本信息
 * @param id
 * @param payload
 * @returns {Promise}
 */
export async function updateBasic({ id, ...payload }) {
    return request('/api/investor/update', {
        method: 'POST',
        body: {
            investorid: id,
            ...payload,
        },
    });
}

/**
 * 删除投资人
 * @param id
 * @returns {Promise}
 */
export async function deleteInvestor({ id }) {
    return request('/api/investor/delinvest', {
        method: 'POST',
        body: {
            investorid: id,
        },
    });
}

/**
 * 获取项目文件
 * @param id
 * @returns {Promise}
 */
export async function fetchFiles({ id }) {
    return request('/api/investor/getFile', {
        method: 'POST',
        body: {
            investorid: id,
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
    return request('/api/investor/tasks', {
        method: 'POST',
        body: {
            investorid: id,
            insid: getCurrentOrganizationId(),
        },
    });
}
