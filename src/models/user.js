import { query as queryUsers, getLoginUser } from '../services/user';

export default {
    namespace: 'user',

    state: {
        list: [],
        currentUser: {},
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(queryUsers);
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *fetchCurrent(_, { put }) {
            const user = getLoginUser();
            yield put({
                type: 'saveCurrentUser',
                payload: user,
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        saveCurrentUser(state, action) {
            return {
                ...state,
                currentUser: action.payload || {},
            };
        },
    },
};
