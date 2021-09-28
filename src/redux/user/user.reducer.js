import UserActionTypes from './user.types';

const INITIAL_STATE = { // used as default param. value if no state is passed in 
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
        case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null // clear any errors
            };
        case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
        case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;