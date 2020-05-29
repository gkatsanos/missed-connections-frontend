import to from "await-to-js";
import api from "../api";

export let loginRequest = (data) => async (dispatch, getState) => {
  let err, response;
  [err, response] = await to(api.login(data));
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
