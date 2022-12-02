import { fork, all } from 'redux-saga/effects';

import {
    watchLoginStarted,
    watchRegistrationStarted,
    watchRefreshTokenStarted
} from './auth';

import {
    watchSyncStarted,
    watchGetDataStarted,
    watchUploadFilesStarted,
} from './properties';

function* mainSaga(){
    yield all([
        fork(watchLoginStarted),
        fork(watchRefreshTokenStarted),
        fork(watchRegistrationStarted),
        fork(watchSyncStarted),
        fork(watchGetDataStarted),
        fork(watchUploadFilesStarted),
    ])
}

export default mainSaga;
