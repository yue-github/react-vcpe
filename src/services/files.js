import request from '../utils/request';
import { getCurrentOrganizationId } from './organization';

/**
 * 获取目录文件列表
 * @param dir
 * @returns {Promise}
 */
export async function fetchFiles({ fileid }) {
    return request('/api/file/fileList', {
        method: 'POST',
        body: {
            fileid,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 创建目录
 * @param parentid
 * @param filename
 * @returns {Promise}
 */
export async function createDir({ parentid, filename }) {
    return request('/api/file/ceateFile', {
        method: 'POST',
        body: {
            parentid,
            filename,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 删除目录文件
 * @param id
 * @returns {Promise}
 */
export async function deleteFile({ id }) {
    return request('/api/file/delectFile', {
        method: 'POST',
        body: {
            id,
            insid: getCurrentOrganizationId(),
        },
    });
}

/**
 * 上传文件
 * @param parentid
 * @param file
 * @returns {Promise}
 */
export async function uploadFile({ parentid, file }) {
    const formData = new FormData();

    formData.append('parentid', parentid);
    formData.append('insid', getCurrentOrganizationId());
    formData.append('file', file);

    return request('/api/file/uploadFile', {
        method: 'POST',
        body: formData,
    });
}

/**
 * 修改文件夹
 * @param id
 * @param filename
 * @returns {Promise}
 */
export async function updateDir({ id, filename }) {
    return request('/api/file/updateFile', {
        method: 'POST',
        body: {
            id,
            filename,
            insid: getCurrentOrganizationId(),
        },
    });
}
