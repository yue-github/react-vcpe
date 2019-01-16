import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { fetchFilters, fetchList, deleteInvestor } from '../../../services/investor';

export default {
    namespace: 'investorList',

    state: {
        users: [],
        funds: [],
        fundsMap: {},
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
                    funds: response.funds,
                    fundsMap: mapValues(keyBy(response.funds, 'id'), 'fundname'),
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
        *deleteInvestor({ payload }, { call }) {
            return yield call(deleteInvestor, payload);
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
