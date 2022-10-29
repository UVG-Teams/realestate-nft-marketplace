import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';

export default combineReducers({
    auth,
});
