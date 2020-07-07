import to from "await-to-js";
import { login } from "../api";
import { persistor } from "../store";

export let loginRequest = (data) => async (dispatch, getState) => {
  let err, response;
  [err, response] = await to(login(data));
  if (err) return dispatch(loginFailed(err));
  return dispatch(loginSucceed(response));
};

function loginFailed(err) {
  return {
    type: "LOGIN_FAILED",
    err,
    receivedAt: Date.now(),
  };
}

function loginSucceed(response) {
  return {
    type: "LOGIN_SUCCEEDED",
    response,
    receivedAt: Date.now(),
  };
}

export let logout = () => async (dispatch) => {
  try {
    dispatch(logoutSucceed());
    await persistor.purge();
  } catch {
    dispatch(logoutFailed());
  }
};

function logoutSucceed() {
  return {
    type: "LOGOUT_SUCCEEDED",
    receivedAt: Date.now(),
  };
}

function logoutFailed(err) {
  return {
    type: "LOGOUT_FAILED",
    err,
    receivedAt: Date.now(),
  };
}
