import { fetchList } from '../../../services/task';

export default {
    namespace: 'taskList',

    state: {
        list: [],
        total: 0,
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const response = yield call(fetchList, payload);
            if (response) {
                yield put({
                    type: 'save',
                    payload: {
                        list: response.task,
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
