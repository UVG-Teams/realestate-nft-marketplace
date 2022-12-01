import {
    call,
    // race,
    // delay,
} from 'redux-saga/effects'

import { API_BASE_URL } from '../settings'


export const isSuccessful = statusCode => {
    return statusCode >= 200 && statusCode < 300
}

export const isError = statusCode => {
    return statusCode >= 400 && statusCode < 600
}

export const request = function* (method, path, body, token=null) {

    let response;

    try {
        response = yield call(
            fetch,
            `${API_BASE_URL}${path}`,
            {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `JWT ${token}` : '',
                },
            },
        )

        const status = response.status
        response = yield response.json()

        if (response.status === undefined) {
            response.status = status
        }

        if (response.msg === undefined) {
            response.msg = "Something went wrong!"
        }

    } catch {

        response = {
            status: 500,
            msg: "Connection failed!"
        }

    }

    return response

}
