import router from 'umi/router';
import { createOrganization, updateOrganization } from '../../../services/organization';

export default {
    namespace: 'organization',

    state: {
        status: undefined,
        errorMessage: undefined,
    },

    effects: {
        *create({ payload }, { call, put }) {
            const response = yield call(createOrganization, payload);
            if (response.status === 200) {
                router.push({
                    pathname: '/organizations',
                });
            }
            yield put({
                type: 'createHandle',
                payload: response,
            });
        },
        *updateOrganization({ payload }, { call }) {
            return yield call(updateOrganization, payload);
        },
    },

    reducers: {
        createHandle(
            state,
            {
                payload: { status, msg },
            }
        ) {
            return {
                ...state,
                status,
                errorMessage: msg,
            };
        },
    },
};
