import { fetchFiles, deleteFile, updateDir, uploadFile, createDir } from '../../../services/files';

export default {
    namespace: 'filesList',

    state: {
        files: [],
        isSystem: false,
        isOperation: false,
        prevParentid: 0,
    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const response = yield call(fetchFiles, payload);
            if (response) {
                yield put({
                    type: 'save',
                    payload: response,
                });
            }
        },
        *createDir({ payload }, { call }) {
            return yield call(createDir, payload);
        },
        *deleteFile({ payload }, { call }) {
            return yield call(deleteFile, payload);
        },
        *updateDir({ payload }, { call }) {
            return yield call(updateDir, payload);
        },
        *uploadFile({ payload }, { call }) {
            return yield call(uploadFile, payload);
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
