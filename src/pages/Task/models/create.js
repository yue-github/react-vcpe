import { createTask } from '../../../services/task';

export default {
    namespace: 'taskCreate',

    state: {
        errorMessage: null,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(createTask, payload);
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
