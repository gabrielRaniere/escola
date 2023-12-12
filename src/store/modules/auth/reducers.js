import * as types from '../../types';

const initialState =  {
    isLogged: false,
    Loading: false,
    user: {
        token: '',
        data: {}
    }
}

export default function authReducer(state=initialState, action) {
    const newState = {...state}
    switch(action.type){
        case types.SET_LOAD: {
            newState.Loading = !newState.Loading;
            return newState;
        }

        case types.LOGIN_REQUEST: {
            console.log('fazendo requizição');
            return state;
        }

        case types.LOGIN_FAILURE: {
            return initialState;
        }

        case types.LOGIN_SUCCESS: {
            newState.isLogged = true;
            newState.user.token = action.payload.token;
            newState.user.data = {...action.payload.user}

            return  newState;
        }

        default: {
            return state
        }
    }
}