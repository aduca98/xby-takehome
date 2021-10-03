import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user";

const reducer = combineReducers({
    user: userReducer,
});

export default reducer;
