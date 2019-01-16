import router from 'umi/router';
import { createFund } from '../../../services/fund';

export default {
    namespace: 'fundCreate',

    state: {
        errorMessage: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(createFund, payload);
            if (response.status !== 200) {
                yield put({
                    type: 'saveErrorMessage',
                    payload: {
                        errorMessage: response.msg,
                    },
                });
            } else {
                router.push(`/fund/view/${response.id}`);
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
