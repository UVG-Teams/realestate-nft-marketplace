import * as http from '../utils/http'
import * as auth from '../reducers/auth'
import { validTimePercentage } from '../settings'
import { takeEvery, put, select } from 'redux-saga/effects'


function* login(action) {

    const response = yield http.request(
        'POST',
        '/api/users/sessions.json',
        action.payload,
    )

    if (http.isSuccessful(response.status)) {
        yield put(auth.actions.completeLogin(response.token))
    } else {
        yield put(auth.actions.failLogin(response.msg))
    }

}

export function* watchLoginStarted() {
    yield takeEvery(
        auth.types.AUTHENTICATION_STARTED,
        login,
    )
}

function* refreshToken(action) {

    // const expiration = yield select(auth.selectors.getAuthExpiration)
    // const now =  parseInt(new Date().getTime() / 1000)
    // const usedTimePercentage = now/expiration

    // if (usedTimePercentage < validTimePercentage) {
    //     yield put(auth.actions.failTokenRefresh('Token Expired'))
    // }

    // const token = yield select(auth.selectors.getAuthToken)

    // const response = yield http.request(
    //     'POST',
    //     '/token-refresh.json',
    //     { token },
    // )

    // if (http.isSuccessful(response.status)) {
    //     yield put(auth.actions.completeTokenRefresh(response.token))
    // } else {
    //     yield put(auth.actions.failTokenRefresh(response.msg))
    // }

}

export function* watchRefreshTokenStarted() {
    yield takeEvery(
        auth.types.TOKEN_REFRESH_STARTED,
        refreshToken,
    )
}
