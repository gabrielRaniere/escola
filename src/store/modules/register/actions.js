import * as types from '../../types';

export function registerUser(payload) {
    return {
        type: types.SEND_REGISTER,
        payload
    }
}