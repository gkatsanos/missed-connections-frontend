import to from "await-to-js";
import { login } from "../api";

export let loginRequest = (data) => async (dispatch, getState) => {
  let err, response;
  [err, response] = await to(login(data));
  if (err) return dispatch(loginFailed(err));
  localStorage.setItem("loginTimeExpiration", response.token.expiresIn);
  localStorage.setItem("refreshToken", response.token.refreshToken);
  localStorage.setItem("missed_connections_email", response.user.email);
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
