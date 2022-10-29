import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';

import * as auth from '../reducers/auth';
import * as http from '../utils/http';
import { API_BASE_URL, validTimePercentage } from '../settings';


function* login(action) {
    try {
        const response = yield call(
            fetch,
            `${API_BASE_URL}/api/users/sessions.json`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers:{
                    'Content-Type': 'application/json',
                },
            },
        );

        console.log(response)

        if (http.isSuccessful(response.status)) {
            const { token } = yield response.json();
            yield put(auth.actions.completeLogin(token));
        } else {
            const { msg } = yield response.json();
            yield put(auth.actions.failLogin(msg));
        }

    } catch (error) {
        yield put(auth.actions.failLogin('Connection failed!'));
    }
}

export function* watchLoginStarted() {
    yield takeEvery(
        auth.types.AUTHENTICATION_STARTED,
        login,
    );
}

function* refreshToken(action) {
    const expiration = yield select(auth.selectors.getAuthExpiration);
    const now =  parseInt(new Date().getTime() / 1000);
    const usedTimePercentage = now/expiration;

    if (usedTimePercentage > validTimePercentage) {
        try {
            const token = yield select(auth.selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/token-refresh/`,
                {
                    method: 'POST',
                    body: JSON.stringify({ token }),
                    headers:{
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (http.isSuccessful(response.status)) {
                const jsonResult = yield response.json();
                yield put(auth.actions.completeTokenRefresh(jsonResult.token));
            } else {
                const { msg } = yield response.json();
                yield put(auth.actions.failTokenRefresh(msg));
            }
        } catch (error) {
            yield put(auth.actions.failTokenRefresh('Connection failed!'));
        }
    }
}

export function* watchRefreshTokenStarted() {
    yield takeEvery(
        auth.types.TOKEN_REFRESH_STARTED,
        refreshToken,
    );
}
