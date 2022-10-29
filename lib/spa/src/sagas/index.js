import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted, watchRefreshTokenStarted } from './auth';

function* mainSaga(){
    yield all([
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
    ])
}

export default mainSaga;
