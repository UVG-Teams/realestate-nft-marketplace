import * as http from '../utils/http'
import * as auth from '../reducers/auth'
import * as properties from '../reducers/properties'
import { takeEvery, put, select, call } from 'redux-saga/effects'

import { API_BASE_URL } from '../settings'

function* sync(action) {

    const token = yield select(auth.selectors.getGlobalAuthToken)

    const response = yield http.request(
        'POST',
        '/api/properties/sync.json',
        {
            "property": {
                "nft_id": action.payload.tokenId,
                "account": action.payload.owner,
                "location": action.payload.attributes?.filter(attr => attr.trait_type === 'Location')[0].value,
                "category": action.payload.attributes?.filter(attr => attr.trait_type === 'Typology')[0].value,
                "rooms": action.payload.attributes?.filter(attr => attr.trait_type === 'Rooms')[0].value,
                "bathrooms": action.payload.attributes?.filter(attr => attr.trait_type === 'Bathrooms')[0].value,
                "price": action.payload.price
            }
        },
        token
    )

    if (http.isSuccessful(response.httpStatus)) {
        yield put(properties.actions.finishSync())
    } else {
        yield put(properties.actions.finishSync(response.msg))
    }

}

export function* watchSyncStarted() {
    yield takeEvery(
        properties.types.SYNC_STARTED,
        sync,
    )
}



function* getData(action) {

    const token = yield select(auth.selectors.getGlobalAuthToken)

    const response = yield http.request(
        'GET',
        `/api/properties/data.json?nft_id=${action.payload.tokenId}`,
        null,
        token
    )

    if (http.isSuccessful(response.httpStatus)) {
        yield put(properties.actions.completedGetData(response))
    } else {
        yield put(properties.actions.failedGetData(response.msg))
    }

}

export function* watchGetDataStarted() {
    yield takeEvery(
        properties.types.GET_DATA_STARTED,
        getData,
    )
}



function* uploadFiles(action) {

    const token = yield select(auth.selectors.getGlobalAuthToken)

    // MultiFrom Data
    const formData = new FormData();
    formData.append("files", action.payload.files[0], action.payload.files[0].name);

    const response = yield call(
        fetch,
        `${API_BASE_URL}/api/properties/${action.payload.property_id}/upload_files.json`,
        {
            method: 'POST',
            body: formData,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': token ? `JWT ${token}` : '',
            },
        },
    )

    if (http.isSuccessful(response.status)) {
        yield put(properties.actions.finishSync())
    } else {
        yield put(properties.actions.finishSync(response.msg))
    }

}

export function* watchUploadFilesStarted() {
    yield takeEvery(
        properties.types.UPLOAD_FILES_STARTED,
        uploadFiles,
    )
}