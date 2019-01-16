import router from 'umi/router';
import { register, sendRegisterSmsCode, setLoginUser } from '../../../services/user';
import { reloadAuthorized } from '../../../utils/Authorized';

export default {
    namespace: 'register',

    state: {},

    effects: {
        *submit({ payload }, { call }) {

            const response = yield call(register, payload);
            if (response.status === 200) {
                setLoginUser(response.user, response.token);
                reloadAuthorized();
                try{
                    router.push({
                        pathname: '/dashboard',
                        state: {},
                    });
                }catch(warn){}
            }
        },
        *sendRegisterSmsCode({ payload }, { call }) {
            return yield call(sendRegisterSmsCode, payload);
        },
    },
};
