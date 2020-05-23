import { combineReducers } from "@reduxjs/toolkit";
import messageReducer from "./message/messageReducers";
import userReducer from "./user/userReducers";

const rootReducer = combineReducers({
  message: messageReducer,
  user: userReducer,
});

export default rootReducer;
