import {combineReducers} from "redux";
import _userReducer from "./_userReducer";

export default combineReducers({
    user: _userReducer,
});
