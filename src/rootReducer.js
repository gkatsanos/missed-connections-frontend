import { combineReducers } from "@reduxjs/toolkit";
import messageReducer from "./containers/MessageListContainer/reducers/message";
import userReducer from "./containers/MessageListContainer/reducers/user";

const rootReducer = combineReducers({
  message: messageReducer,
  user: userReducer,
});

export default rootReducer;
