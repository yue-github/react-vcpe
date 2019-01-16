import fetch from 'dva/fetch';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import mapKeys from 'lodash/mapKeys';
import { notification } from 'antd';
import router from 'umi/router';
import { getLoginToken } from '../services/user';
// import domain , {api} from '../../config/env';
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户未登录或登录状态失效，请重新登录。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: 'API接口不存在。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
};

/**
 * 字段映射
 * @param data
 * @param mapping
 * @returns {Object}
 */
const mapFields = (data, mapping) => mapKeys(data, (value, key) => mapping[key] || key);

/**
 * 转换
 * @param json
 * @param mapping
 * @returns {*}
 */
export const conversion = (json, mapping) => {
    if (isPlainObject(mapping)) {
        return mapFields(json, mapping);
    }
    if (isFunction(mapping)) {
        return mapping.call(json, json, mapping);
    }
    return json;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return Promise
 */
export default function request(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options };
    if (
        newOptions.method === 'POST' ||
        newOptions.method === 'PUT' ||
        newOptions.method === 'DELETE'
    ) {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }

    const token = getLoginToken();

    if (token) {
        newOptions.headers = newOptions.headers || {};
        newOptions.headers.Authorization = `Bearer ${token}`;
    }
  
    return fetch(url, newOptions)
        // .then(res=>{
        //      console.log(res.status)
        // })
       
        .then(checkStatus)
        .then(response => {

            // DELETE and 204 do not return data by default
            // using .json will report an error.
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }

            return response.json().then(json => conversion(json, newOptions.mapping));
        })
        .then(json => {

            if (json && json.status && json.status !== 200) {
                // console.log(json);
                notification.error({
                    message: `请求错误`,
                    description: isString(json.msg) ? json.msg : '',
                });
            }

            return json;
        })
        .catch(e => {
            const status = e.name;
            if (status === 401) {
                // @HACK
                /* eslint-disable no-underscore-dangle */
                window.g_app._store.dispatch({
                    type: 'login/logout',
                });
                return e;
            }
            // environment should not be used
            if (status === 403) {
                router.push('/exception/403');
                return e;
            }

            notification.error({
                message: `请求错误： ${status}`,
                description: e.message,
            });

            return e;
            // if (status <= 504 && status >= 500) {
            //     router.push('/exception/500');
            //     return;
            // }
            // if (status >= 404 && status < 422) {
            //     router.push('/exception/404');
            // }
        });
}
