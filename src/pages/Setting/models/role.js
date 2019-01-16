import {
    fetchRoles,
    fetchRoleUsers,
    fetchRolePermissions,
    updateRole,
    deleteRole,
    deleteRoleUser,
    updatePermission,
    sendInvite,
} from '../../../services/role';

export default {
    namespace: 'role',

    state: {
        roles: [],
    },

    effects: {
        *fetchRoles({ payload }, { call, put }) {
            const response = yield call(fetchRoles, payload);

            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }

            return response;
        },
        *fetchRoleUsers({ payload }, { call }) {
            return yield call(fetchRoleUsers, payload);
        },
        *fetchPermissions({ payload }, { call }) {
            return yield call(fetchRolePermissions, payload);
        },
        *updateRole({ payload }, { call }) {
            return yield call(updateRole, payload);
        },
        *deleteRole({ payload }, { call }) {
            return yield call(deleteRole, payload);
        },
        *deleteRoleUser({ payload }, { call }) {
            return yield call(deleteRoleUser, payload);
        },
        *updatePermission({ payload }, { call }) {
            return yield call(updatePermission, payload);
        },
        *sendInvite({ payload }, { call }) {
            return yield call(sendInvite, payload);
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
