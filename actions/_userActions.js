import * as types from "../actions/types";
import {axios} from "../tools";

export const getUserInfo = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.USER_INFO_RETRIEVE_START,
        });

        axios
            .get("/user/info")
            .then(res => {
                dispatch({
                    type: types.USER_INFO_RETRIEVE_COMPLETE,
                    payload: {
                        isSignedIn: res.data.isSignedIn,
                        username: res.data.user.username,
                        displayName: res.data.user.display_name,
                    },
                });
            })
            .catch(err => {
                dispatch({
                    type: types.USER_INFO_RETRIEVE_COMPLETE,
                    payload: {err},
                });
            });
    };
};
