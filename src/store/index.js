import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSagas from './rootSagas';
import {persistStore} from 'redux-persist';
import persistedReducers from './persistor';

const sagaMidleware = createSagaMiddleware();

const store = createStore(
    persistedReducers(rootReducer), 
    applyMiddleware(sagaMidleware)
    )

sagaMidleware.run(rootSagas)

export const persistor = persistStore(store);

export default store;