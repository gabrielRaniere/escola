import * as types from '../../types';

const initialState = {

}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case types.SEND_REGISTER: {
            return state
        }

        default : {
            return state
        }
    }
}