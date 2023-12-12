import { all } from 'redux-saga/effects';

//sagas
import registerSagas from './modules/register/sagas';
import authSagas from './modules/auth/sagas';

export default function* rootSagas() {
    return yield all([      
        registerSagas,
        authSagas
    ])
}