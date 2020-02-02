import * as types from "../actions/types";

const INIT = {
    username: null,
    displayName: null,
    isSignedIn: false,
    loading: true,
    error: null,
};

export default (state = INIT, {type, payload}) => {
    switch (type) {
        case types.USER_INFO_RETRIEVE_START:
            return {
                ...state,
                loading: true,
            };
            break;
        case types.USER_INFO_RETRIEVE_COMPLETE:
            if (payload.err) {
                return {
                    ...state,
                    loading: false,
                    error:
                        payload.err.message ||
                        (typeof payload.err === "string" && payload.err) ||
                        "Unknown error",
                };
            }

            return {
                username: payload.isSignedIn ? payload.username : null,
                displayName: payload.isSignedIn ? payload.displayName : null,
                isSignedIn,
            };
        default:
            return state;
            break;
    }
};
