import {put, call, takeLatest, all} from 'redux-saga/effects';
import * as types from '../../types';
import axios from '../../../services/axios';
import * as actions from './actions';
import customHistory from '../../../services/history';
import isEmail from 'validator/lib/isEmail';
import {toast} from 'react-toastify';
import { get } from 'lodash';

function* verifyLogin({ payload }) {
    try{
        let flag = true;
        if(payload.password.length < 6 || payload.password.length > 12) {
            toast.error('senha deve conter entre 6 a 18 caracteres');
            flag = false;
        }
        if(!isEmail(payload.email)) {
            toast.error('formato de email invalido');
            flag = false;
        }
    
        if(!flag) return;

        yield put({type: types.SET_LOAD});

        const response = yield call(axios.post, 'tokens/', payload);

        yield put(actions.loginSuccess(response.data));
        toast.success('Bem vindo !')
        customHistory.push('/');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
    }catch(e) {
        console.log(e)
    }finally{
        yield put({type: types.SET_LOAD});
    }
}

function* updateUser({ payload }) {
    try{
        const response = yield call(axios.put, `users/${payload.id}`, payload);
        
        yield put(actions.loginRequest(response.data))
    }catch(e) {
        console.log(e);
        yield put(actions.loginFailure());
        toast.error('algo deu errado');
    }finally{

    }
}

function setHeaderOnRefresh({payload : {authReducer}}) {
    const token = get(authReducer, 'user.token', null);

    if(token.length > 0) {
        axios.defaults.headers.Authorization = `Bearer ${token}`
    }
}

function removeAuthorization() {
    axios.defaults.headers.Authorization = '';
}

export default all(
    [
        takeLatest(types.LOGIN_REQUEST, verifyLogin),
        takeLatest(types.UPDATE_REQUEST, updateUser),
        takeLatest('persist/REHYDRATE', setHeaderOnRefresh),
        takeLatest(types.LOGIN_FAILURE, removeAuthorization)
])