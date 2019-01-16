import router from 'umi/router';
import { createProject } from '../../../services/project';

export default {
    namespace: 'projectCreate',

    state: {
        errorMessage: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(createProject, payload);
            if (response.status !== 200) {
                yield put({
                    type: 'saveErrorMessage',
                    payload: {
                        errorMessage: response.msg,
                    },
                });
            } else {
                router.push(`/project/view/${response.id}`);
            }
        },
    },
    reducers: {
        saveErrorMessage(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        },
    },
};
