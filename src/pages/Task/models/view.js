import {
    fetchTask,
    fetchUsers,
    deleteFollower,
    deleteTask,
    addFollower,
    addComment,
    updateTask,
} from '../../../services/task';

export default {
    namespace: 'taskView',

    state: {
        task: {},
        follows: [],
        comments: [],
        users: [],
    },

    effects: {
        *fetchTask({ payload }, { call, put }) {
            const response = yield call(fetchTask, payload);

            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *fetchUsers({ payload }, { call, put }) {
            const response = yield call(fetchUsers, payload);

            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *updateTask({ payload }, { call }) {
            return yield call(updateTask, payload);
        },
        *deleteFollower({ payload }, { call }) {
            return yield call(deleteFollower, payload);
        },
        *deleteTask({ payload }, { call }) {
            return yield call(deleteTask, payload);
        },
        *addFollower({ payload }, { call }) {
            return yield call(addFollower, payload);
        },
        *addComment({ payload }, { call }) {
            return yield call(addComment, payload);
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
