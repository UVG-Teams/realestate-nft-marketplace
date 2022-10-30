import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted, watchRegistrationStarted, watchRefreshTokenStarted } from './auth';

function* mainSaga(){
    yield all([
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
        fork(watchRegistrationStarted),
    ])
}

export default mainSaga;
