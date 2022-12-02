import { combineReducers } from 'redux';

export const types = {
    SYNC_STARTED: 'SYNC_STARTED',
    SYNC_FINISHED: 'SYNC_FINISHED',
    GET_DATA_STARTED: 'GET_DATA_STARTED',
    GET_DATA_COMPLETED: 'GET_DATA_COMPLETED',
    GET_DATA_FAILED: 'GET_DATA_FAILED',
    UPLOAD_FILES_STARTED: 'UPLOAD_FILES_STARTED',
    UPLOAD_FILES_COMPLETED: 'UPLOAD_FILES_COMPLETED',
    UPLOAD_FILES_FAILED: 'UPLOAD_FILES_FAILED',
    GET_FILES_STARTED: 'GET_FILES_STARTED',
    GET_FILES_COMPLETED: 'GET_FILES_COMPLETED',
    GET_FILES_FAILED: 'GET_FILES_FAILED',
}

export const actions = {
    startSync: payload => ({
        type: types.SYNC_STARTED,
        payload,
    }),
    finishSync: () => ({
        type: types.SYNC_FINISHED,
    }),
    startGetData: payload => ({
        type: types.GET_DATA_STARTED,
        payload,
    }),
    completedGetData: payload => ({
        type: types.GET_DATA_COMPLETED,
        payload,
    }),
    failedGetData: () => ({
        type: types.GET_DATA_FAILED,
    }),
    startUploadFiles: payload => ({
        type: types.UPLOAD_FILES_STARTED,
        payload,
    }),
    completedUploadFiles: () => ({
        type: types.UPLOAD_FILES_COMPLETED,
    }),
    failedUploadFiles: () => ({
        type: types.UPLOAD_FILES_FAILED,
    }),
    startGettingFiles: payload => ({
        type: types.GET_FILES_STARTED,
        payload,
    }),
    completedGettingFiles: payload => ({
        type: types.GET_FILES_COMPLETED,
        payload,
    }),
    failedGettingFiles: () => ({
        type: types.GET_FILES_FAILED,
    }),
}

// Reducers

const isSynchronizing = (state = false, action) => {
    switch(action.type) {
        case types.SYNC_STARTED: return true;
        case types.SYNC_FINISHED: return false;
        default: return state;
    }
};

const currentVestaData = (state = null, action) => {
    switch(action.type) {
        case types.GET_DATA_STARTED: return null;
        case types.GET_DATA_COMPLETED: return action.payload;
        case types.GET_DATA_FAILED: return null;
        default: return state;
    }
};

const currentVestaFiles = (state = null, action) => {
    switch(action.type) {
        case types.GET_FILES_STARTED: return null;
        case types.GET_FILES_COMPLETED: return action.payload;
        case types.GET_FILES_FAILED: return null;
        default: return state;
    }
};

export default combineReducers({
    isSynchronizing,
    currentVestaData,
    currentVestaFiles,
});


export const selectors = {
    getCurrentVestaData: state => state.currentVestaData,
    getCurrentVestaFiles: state => state.currentVestaFiles,
}
