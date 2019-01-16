import omitBy from 'lodash/omitBy';
import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 创建基金
 * @param params
 * @returns {Promise}
 */
export async function createFund(params) {
    return request('/api/fund/add', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            ...params,
        },
        mapping: {
            fundid: 'id',
        },
    });
}

/**
 * 获取过滤条件
 * @returns {Promise}
 */
export async function fetchFilters() {
    return request('/api/fund/getFilterParam', {
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
    return request('/api/fund/getData', {
        method: 'POST',
        body: {
            page,
            pageSize,
            filter: omitBy(filter, v => v === '0' || v === null || v === undefined || v === ''),
            insid: getCurrentOrganizationId(),
        },
        mapping: ({ total, funds, ...other }) => ({
            page: other.page,
            pageSize: other.pageSize,
            total,
            list: funds,
        }),
    });
}

/**
 * 查询基金的详细信息
 * @param id
 * @returns {Promise}
 */
export async function fetchInfo(id) {
    return request('/api/fund/getInfo', {
        method: 'POST',
        body: {
            fundid: id,
        },
        // 字段映射
        mapping: ({ ...data }) => ({
            ...data,
        }),
    });
}

/**
 * 更新基金基本信息
 * @param payload
 * @returns {Promise}
 */
export async function updateInfo(payload) {
    return request('/api/fund/update', {
        method: 'POST',
        body: payload,
    });
}

/**
 * 删除基金
 * @param id
 * @returns {Promise}
 */
export async function deleteFund({ id }) {
    return request('/api/fund/delect', {
        method: 'POST',
        body: {
            fundid: id,
        },
    });
}
