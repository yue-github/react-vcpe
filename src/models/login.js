import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, logout, setLoginUser, sendRegisterSmsCode } from '../services/user';
import { getPageQuery } from '../utils/utils';
import { reloadAuthorized } from '../utils/Authorized';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            console.log(response);
            
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.status === 200) {
                reloadAuthorized();

                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                if (redirect) {
                    console.log(1);
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        *getCaptcha({ payload }, { call }) {
            yield call(sendRegisterSmsCode, payload);
        },

        *logout(_, { put }) {
            logout();
            reloadAuthorized();
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(
            state,
            {
                payload: { status, type, user, token },
            }
        ) {
            setLoginUser(user, token);
            return {
                ...state,
                status,
                type,
            };
        },
    },
};
