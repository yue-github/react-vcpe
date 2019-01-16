import { fetchNotices } from '../../../services/user';

export default {
    namespace: 'messagesList',

    state: {
        messages: [],
        total: 0,
    },

    effects: {
        *fetchNotices({ payload }, { call, put }) {
            const response = yield call(fetchNotices, payload);

            if (response) {
                yield put({
                    type: 'save',
                    payload: {
                        messages: response.messages,
                        total: response.total,
                    },
                });
            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
