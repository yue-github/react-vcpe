import router from 'umi/router';
import {
    queryOrganizations,
    getCurrentOrganization,
    setCurrentOrganization,
    fetchPermissions,
} from '../services/organization';

import { setPermissions, fetchNoticesCount } from '../services/user';
import { reloadAuthorized } from '../utils/Authorized';

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        noticesCount: 0,
        organizations: [],
        currentOrganization: null,
    },

    effects: {
        *fetchNoticesCount(_, { call, put }) {
            const response = yield call(fetchNoticesCount);
            if (response && response.count) {
                yield put({
                    type: 'changeNoticesCount',
                    payload: response.count,
                });
            }
        },
        *fetchOrganizations(_, { call, put }) {
            const response = yield call(queryOrganizations);
            yield put({
                type: 'saveOrganizations',
                payload: response.myInss || [],
            });
        },
        *fetchCurrentOrganization(_, { put }) {
            const org = getCurrentOrganization();
            if (!org) {
                router.push('/organizations');
            } else {
                yield put({
                    type: 'saveCurrentOrganization',
                    payload: org,
                });
            }
        },
        *saveOrganization({ payload }, { call }) {
            setCurrentOrganization(payload);

            const response = yield call(fetchPermissions);
            setPermissions(response);
            reloadAuthorized();

            router.push('/');
        },
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        changeNoticesCount(state, { payload }) {
            return {
                ...state,
                noticesCount: payload,
            };
        },
        saveCurrentOrganization(state, { payload }) {
            return {
                ...state,
                currentOrganization: payload,
            };
        },
        saveOrganizations(state, { payload }) {
            return {
                ...state,
                organizations: payload,
            };
        },
    },
};
