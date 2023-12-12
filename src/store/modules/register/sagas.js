import {all, put, call, takeLatest} from 'redux-saga/effects';
import * as types from '../../types';
import axios from '../../../services/axios';
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import customHistory from '../../../services/history';

function* setRegister({payload}) {
    let flag = true;

    const {nome, email, password} = payload;

    if(nome.length < 5 || nome.length > 12) {
        toast.error('nome deve ser maior que 5 e menor que 12 caracteres');
        flag = false;
    }
    if(password.length < 6 || password.length > 12) {
        toast.error('senha deve conter entre 6 a 18 caracteres');
        flag = false;
    }
    if(!isEmail(email)) {
        toast.error('formato de email invalido');
        flag = false;
    }

    if(!flag) return;

    try{
        yield put({type: types.SET_LOAD})
        yield call(axios.post, '/users/', payload)
        toast.success('cadastro feito com sucesso !')
        customHistory.push('/login')
    }catch(e) {
        e.response.data.erros.map(err => toast.error(err))
    }
    finally{
        yield put({type: types.SET_LOAD})
    }
}

export default all([takeLatest(types.SEND_REGISTER, setRegister)]);