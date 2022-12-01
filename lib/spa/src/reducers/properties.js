import { combineReducers } from 'redux';

export const types = {
    SYNC_STARTED: 'SYNC_STARTED',
    SYNC_FINISHED: 'SYNC_FINISHED',
}

export const actions = {
    startSync: payload => ({
        type: types.SYNC_STARTED,
        payload,
    }),
    finishSync: () => ({
        type: types.SYNC_FINISHED,
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

export default combineReducers({
    isSynchronizing,
});


export const selectors = {}
