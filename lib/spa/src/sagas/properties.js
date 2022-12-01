import * as http from '../utils/http'
import * as auth from '../reducers/auth'
import * as properties from '../reducers/properties'
import { takeEvery, put, select } from 'redux-saga/effects'


function* sync(action) {

    const token = yield select(auth.selectors.getGlobalAuthToken)

    const response = yield http.request(
        'POST',
        '/api/properties/sync.json',
        {
            "property": {
                "nft_id": action.payload.tokenId,
                "account": action.payload.owner,
                "location": action.payload.attributes.filter(attr => attr.trait_type === 'Location')[0].value,
                "category": action.payload.attributes.filter(attr => attr.trait_type === 'Typology')[0].value,
                "rooms": action.payload.attributes.filter(attr => attr.trait_type === 'Rooms')[0].value,
                "bathrooms": action.payload.attributes.filter(attr => attr.trait_type === 'Bathrooms')[0].value,
            }
        },
        token
    )

    if (http.isSuccessful(response.status)) {
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
