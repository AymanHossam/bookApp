import { SIGN, LOG_OUT } from '../actions/Auth';

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGN:
            return {
                token: action.token,
                userId: action.userId
            };
        case LOG_OUT:
            return initialState

        default:
            return state;
    }
};
