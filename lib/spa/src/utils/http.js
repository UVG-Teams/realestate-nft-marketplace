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

export const request = function* (method, path, body=null, token=null) {

    let response;

    try {
        response = yield call(
            fetch,
            `${API_BASE_URL}${path}`,
            {
                method: method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `JWT ${token}` : '',
                },
            },
        )

        const status = response.status
        response = yield response.json()

        if (response.httpStatus === undefined) {
            response.httpStatus = status
        }

        if (response.msg === undefined) {
            response.msg = "Something went wrong!"
        }

    } catch {

        response = {
            httpStatus: 500,
            msg: "Connection failed!"
        }

    }

    return response

}
