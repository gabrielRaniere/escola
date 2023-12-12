import {combineReducers} from 'redux';

//reducers
import authReducer from './modules/auth/reducers';
import RegisterReducer from './modules/register/reducer';

export default combineReducers({
    authReducer,
    RegisterReducer
})