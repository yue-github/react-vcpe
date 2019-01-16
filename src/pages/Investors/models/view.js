import { fetchBasic, updateBasic, fetchFiles, fetchTasks } from '../../../services/investor';

export default {
    namespace: 'investorView',

    state: {
        basic: {},
        files: {
            id: 0,
            list: [],
        },
        tasks: [],
    },

    effects: {
        *fetchBasic({ payload }, { call, put }) {
            const response = yield call(fetchBasic, payload);
            yield put({
                type: 'saveBasic',
                payload: response,
            });
        },
        *updateBasic({ payload }, { call }) {
            yield call(updateBasic, payload);
        },
        *fetchFiles({ payload }, { call, put }) {
            const response = yield call(fetchFiles, payload);
            if (response) {
                yield put({
                    type: 'saveFiles',
                    payload: {
                        id: response.id,
                        list: response.files,
                    },
                });
            }
        },
        *fetchTasks({ payload }, { call, put }) {
            const response = yield call(fetchTasks, payload);
            if (response) {
                yield put({
                    type: 'saveTasks',
                    payload: response.tasks,
                });
            }
        },
    },

    reducers: {
        saveBasic(state, { payload }) {
            return {
                ...state,
                basic: payload,
            };
        },
        saveFiles(state, { payload }) {
            return {
                ...state,
                files: payload,
            };
        },
        saveTasks(state, { payload }) {
            return {
                ...state,
                tasks: payload,
            };
        },
    },
};
