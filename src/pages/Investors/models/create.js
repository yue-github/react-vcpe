import router from 'umi/router';
import { createInvestor } from '../../../services/investor';

export default {
    namespace: 'investorCreate',

    state: {
        errorMessage: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(createInvestor, payload);
            if (response.status !== 200) {
                yield put({
                    type: 'saveErrorMessage',
                    payload: {
                        errorMessage: response.msg,
                    },
                });
            } else {
                router.push(`/investor/view/${response.investorid}`);
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
