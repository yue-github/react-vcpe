import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import {
    fetchFilters,
    fetchList,
    deleteProject,
    addIndustry,
    updateIndustry,
    deleteIndustry,
} from '../../../services/project';

export default {
    namespace: 'projectList',

    state: {
        users: [],
        industries: [],
        industriesMap: {},
        total: 0,
        pageSize: 20,
        list: [],
    },

    effects: {
        *fetchFilter(_, { call, put }) {
            const response = yield call(fetchFilters);
            yield put({
                type: 'saveState',
                payload: {
                    industries: response.industry,
                    industriesMap: mapValues(keyBy(response.industry, 'id'), 'name'),
                    users: response.users,
                },
            });
        },
        *fetchList({ payload }, { call, put }) {
            const response = yield call(fetchList, payload);
            yield put({
                type: 'saveState',
                payload: response,
            });
        },
        *deleteProject({ payload }, { call }) {
            return yield call(deleteProject, payload);
        },
        *deleteIndustry({ payload }, { call }) {
            return yield call(deleteIndustry, payload);
        },
        *addIndustry({ payload }, { call }) {
            return yield call(addIndustry, payload);
        },
        *updateIndustry({ payload }, { call }) {
            return yield call(updateIndustry, payload);
        },
    },

    reducers: {
        saveState(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
