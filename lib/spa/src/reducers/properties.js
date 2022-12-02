import { combineReducers } from 'redux';

export const types = {
    SYNC_STARTED: 'SYNC_STARTED',
    SYNC_FINISHED: 'SYNC_FINISHED',
    GET_DATA_STARTED: 'GET_DATA_STARTED',
    GET_DATA_COMPLETED: 'GET_DATA_COMPLETED',
    GET_DATA_FAILED: 'GET_DATA_FAILED',
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

export default combineReducers({
    isSynchronizing,
    currentVestaData,
});


export const selectors = {
    getCurrentVestaData: state => state.currentVestaData,
}
