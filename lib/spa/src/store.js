import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import mainSaga from './sagas';
import reducer from './reducers';

export const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        )
    );

    sagaMiddleware.run(mainSaga);

    return { store };
}
