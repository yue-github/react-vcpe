import pick from 'lodash/pick';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

let data = {};

/**
 * 将数据存储到localStorage
 */
function saveLocalStorage() {
    localStorage.setItem('app', JSON.stringify(data));
}

/**
 * 重新从localStorage读取数据
 */
function reloadLocalStorage() {
    const str = localStorage.getItem('app');
    data = str ? JSON.parse(str) : {};
}

/**
 * 批量设置数据
 * @param {object} obj
 * @returns {boolean}
 */
export function setItems(obj) {
    data = merge(data, obj);
    saveLocalStorage();
    return true;
}

/**
 * 设置数据
 * @param {string} key
 * @param value
 */
export function setItem(key, value) {
    return setItems({
        [key]: value,
    });
}

/**
 * 批量获取数据
 * @param {string[]}keys
 * @returns {*}
 */
export function getItems(keys) {
    return cloneDeep(pick(data, keys));
}

/**
 * 获取数据
 * @param {string} key
 * @returns {*}
 */
export function getItem(key) {
    return cloneDeep(get(data, key));
}

/**
 * 批量删除数据
 * @param {string[]} keys
 * @returns {boolean}
 */
export function removeItems(keys) {
    if (keys && keys.length) {
        keys.forEach(val => {
            delete data[val];
        });
    }
    saveLocalStorage();
    return true;
}

/**
 * 删除数据
 * @param {string} key
 */
export function removeItem(key) {
    return removeItems([key]);
}

/**
 * 是否有数据
 * @param {string} key
 * @returns {boolean}
 */
export function hasItem(key) {
    return getItem(key) !== undefined;
}

/**
 * 清除所有数据
 */
export function clearAll() {
    data = {};
    saveLocalStorage();
}

reloadLocalStorage();
