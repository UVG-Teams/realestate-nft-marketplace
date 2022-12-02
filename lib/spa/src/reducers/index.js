import { combineReducers } from 'redux';

import auth, * as authSelectors from './auth';
import properties, * as propertiesSelectors from './properties';

export default combineReducers({
    auth,
    properties,
});
