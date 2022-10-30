import { combineReducers } from 'redux';
import jwtDecode from 'jwt-decode';

export const types = {
    AUTHENTICATION_STARTED: 'AUTHENTICATION_STARTED',
    AUTHENTICATION_COMPLETED: 'AUTHENTICATION_COMPLETED',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
    REGISTRATION_STARTED: 'REGISTRATION_STARTED',
    REGISTRATION_COMPLETED: 'REGISTRATION_COMPLETED',
    REGISTRATION_FAILED: 'REGISTRATION_FAILED',
    AUTHENTICATION_IDENTITY_CLEARED: 'AUTHENTICATION_IDENTITY_CLEARED',
    TOKEN_REFRESH_STARTED: 'TOKEN_REFRESH_STARTED',
    TOKEN_REFRESH_COMPLETED: 'TOKEN_REFRESH_COMPLETED',
    TOKEN_REFRESH_FAILED: 'TOKEN_REFRESH_FAILED',
}

export const actions = {
    startLogin: payload => ({
        type: types.AUTHENTICATION_STARTED,
        payload,
    }),
    completeLogin: token => ({
        type: types.AUTHENTICATION_COMPLETED,
        payload: { token },
    }),
    failLogin: error => ({
        type: types.AUTHENTICATION_FAILED,
        payload: { error },
    }),
    startRegistration: payload => ({
        type: types.REGISTRATION_STARTED,
        payload,
    }),
    completeRegistration: token => ({
        type: types.REGISTRATION_COMPLETED,
        payload: { token },
    }),
    failRegistration: error => ({
        type: types.REGISTRATION_FAILED,
        payload: { error },
    }),
    logout: () => ({
        type: types.AUTHENTICATION_IDENTITY_CLEARED,
    }),
    startTokenRefresh: () => ({
        type: types.TOKEN_REFRESH_STARTED,
    }),
    completeTokenRefresh: token => ({
        type: types.TOKEN_REFRESH_COMPLETED,
        payload: { token },
    }),
    failTokenRefresh: error => ({
        type: types.TOKEN_REFRESH_FAILED,
        payload: { error },
    })
}

// Reducers

const token = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: return null;
        case types.AUTHENTICATION_COMPLETED: return action.payload.token;
        case types.TOKEN_REFRESH_COMPLETED: return action.payload.token;
        case types.AUTHENTICATION_FAILED: return null;
        case types.AUTHENTICATION_IDENTITY_CLEARED: return null;
        case types.REGISTRATION_STARTED: return null;
        case types.REGISTRATION_COMPLETED: return action.payload.token;
        case types.REGISTRATION_FAILED: return null;
        default: return state;
    }
};

const decoded = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: return null;
        case types.AUTHENTICATION_COMPLETED: return jwtDecode(action.payload.token);
        case types.TOKEN_REFRESH_COMPLETED: return jwtDecode(action.payload.token);
        case types.AUTHENTICATION_FAILED: return null;
        case types.AUTHENTICATION_IDENTITY_CLEARED: return null;
        case types.REGISTRATION_STARTED: return null;
        case types.REGISTRATION_COMPLETED: return jwtDecode(action.payload.token);
        case types.REGISTRATION_FAILED: return null;
        default: return state;
    }
};

const isAuthenticating = (state = false, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: return true;
        case types.AUTHENTICATION_COMPLETED: return false;
        case types.AUTHENTICATION_FAILED: return false;
        case types.REGISTRATION_STARTED: return true;
        case types.REGISTRATION_COMPLETED: return false;
        case types.REGISTRATION_FAILED: return false;
        default: return state;
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.AUTHENTICATION_STARTED: return null;
        case types.AUTHENTICATION_COMPLETED: return null;
        case types.AUTHENTICATION_FAILED: return action.payload.error;
        case types.REGISTRATION_STARTED: return null;
        case types.REGISTRATION_COMPLETED: return null;
        case types.REGISTRATION_FAILED: return action.payload.error;
        default: return state;
    }
};

const isRefreshing = (state = false, action) => {
    switch(action.type) {
        case types.TOKEN_REFRESH_STARTED: return true;
        case types.TOKEN_REFRESH_COMPLETED: return false;
        case types.TOKEN_REFRESH_FAILED: return false;
        default: return state;
    }
};

const refreshingError = (state = null, action) => {
    switch(action.type) {
        case types.TOKEN_REFRESH_STARTED: return null;
        case types.TOKEN_REFRESH_COMPLETED: return null;
        case types.TOKEN_REFRESH_FAILED: return action.payload.error;
        default: return state;
    }
};

export default combineReducers({
    token,
    decoded,
    isAuthenticating,
    error,
    isRefreshing,
    refreshingError,
});


export const selectors = {
    getAuthToken: state => state.token,
    getIsAuthenticating: state => state.isAuthenticating,
    getAuthenticatingError: state => state.error,
    getAuthUserID: state => state.decoded ? state.decoded.sub : null,
    getAuthExpiration: state => state.decoded ? state.decoded.exp : null,
    getIsRefreshingToken: state => state.isRefreshing,
    getRefreshingError: state => state.refreshingError,
}
