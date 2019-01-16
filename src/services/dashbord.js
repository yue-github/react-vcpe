import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 获取数据看板的数据
 * @returns {Promise}
 */
export async function fetchAnalysis() {
    return request('/api/institution/getDataStatis', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取与我相关的数据
 * @returns {Promise}
 */
export async function fetchAboutMe() {
    return request('/api/institution/getMyRelation', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取工作统计
 * @returns {Promise}
 */
export async function fetchWorkplace() {
    return request('/api/institution/getWorkStatis', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 获取系统日志
 * @returns {Promise}
 */
export async function fetchEvents(payload) {
    return request('/api/institution/getSysLog', {
        method: 'POST',
        body: {
            insid: getCurrentOrganizationId(),
            page: payload.page,
            pageSize: payload.pageSize,
        },
    });
}

export default fetch;
