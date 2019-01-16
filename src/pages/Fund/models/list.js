import { fetchFilters, fetchList, deleteFund } from '../../../services/fund';

export default {
    namespace: 'fundList',

    state: {
        users: [],
        total: 0,
        pageSize: 20,
        list: [],
    },

    effects: {
        *fetchFilters(_, { call, put }) {
            const response = yield call(fetchFilters);
            yield put({
                type: 'saveState',
                payload: {
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
        *deleteFund({ payload }, { call }) {
            return yield call(deleteFund, payload);
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
