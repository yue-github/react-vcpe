import router from 'umi/router';
import { notification } from 'antd';
import { resetPassword, sendForgetPasswordSmsCode } from '../../../services/user';

export default {
    namespace: 'forgetPassword',

    state: {
        status: undefined,
        errorMessage: undefined,
    },

    effects: {
        *submit({ payload }, { call, put }) {
            const response = yield call(resetPassword, payload);
            if (response.status === 200) {
                notification.success({
                    message: '重置密码成功！',
                    description: '正在跳转到登录页面。',
                });
                setTimeout(() => {
                    router.push({
                        pathname: '/user/login',
                        state: {},
                    });
                }, 1500);
            }
            yield put({
                type: 'registerHandle',
                payload: response,
            });
        },
        *sendForgetPasswordSmsCode({ payload }, { call }) {
            return yield call(sendForgetPasswordSmsCode, payload);
        },
    },

    reducers: {
        registerHandle(
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
