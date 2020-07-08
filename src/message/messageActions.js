import to from "await-to-js";

import {
  fetchItems,
  fetchItem,
  isTokenGoingToExpireSoon,
  refresh,
  isTokenExpired,
} from "../api";

function requestMessages(page) {
  return {
    type: "REQUESTED_MESSAGES",
    receivedAt: Date.now(),
    page,
  };
}

function requestMessage(id) {
  return {
    type: "REQUESTED_MESSAGE",
    receivedAt: Date.now(),
    id,
  };
}

function receiveMessages(response) {
  return {
    type: "RECEIVED_MESSAGES",
    response,
    receivedAt: Date.now(),
  };
}

function receiveMessage(response) {
  return {
    type: "RECEIVED_MESSAGE",
    response,
    receivedAt: Date.now(),
  };
}

function refreshedToken(response) {
  return {
    type: "REFRESHED_TOKEN",
    response,
    receivedAt: Date.now(),
  };
}

function handleError(err) {
  return (dispatch, getState) => {
    if (err.status === 401) {
      return dispatch(loginFailed(err.data));
    }
  };
}

function loginFailed(err) {
  return {
    type: "LOGIN_FAILED",
    err,
  };
}

function increasePage() {
  return {
    type: "INCREASED_PAGE",
  };
}

function shouldFetchMessages(state) {
  if (state.message.all.length === 0 && !state.message.isFetching) {
    return true;
  } else if (state.message.page > state.message.totalPages) {
    return false;
  } else {
    return true;
  }
}

export function getMessage(id) {
  return async (dispatch, getState) => {
    const expiresIn = getState().user.expiresIn;
    if (isTokenGoingToExpireSoon(expiresIn) && !isTokenExpired(expiresIn)) {
      dispatch(refreshToken());
    }
    let err, response;
    dispatch(requestMessage(id));
    [err, response] = await to(fetchItem(id));
    if (err) {
      return dispatch(handleError(err));
    }
    return dispatch(receiveMessage(response));
  };
}

function getMessages() {
  return async (dispatch, getState) => {
    const expiresIn = getState().user.expiresIn;
    if (isTokenGoingToExpireSoon(expiresIn) && !isTokenExpired(expiresIn)) {
      dispatch(refreshToken());
    }
    let err, response;
    dispatch(requestMessages(getState().message.page));
    [err, response] = await to(fetchItems(getState().message.page));
    if (err) {
      return dispatch(handleError(err));
    }
    dispatch(receiveMessages(response));
    return dispatch(increasePage());
  };
}

function refreshToken() {
  return async (dispatch, getState) => {
    let err, response;
    [err, response] = await to(
      refresh(getState().user.refreshToken, getState().user.email)
    );
    if (err) {
      return dispatch(handleError(err));
    }
    return dispatch(refreshedToken(response));
  };
}

export function getMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(getMessages());
    }
  };
}
