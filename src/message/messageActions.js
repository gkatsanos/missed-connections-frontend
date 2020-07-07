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
      return dispatch(loginFailed());
    }
  };
}

function loginFailed(response) {
  return {
    type: "LOGIN_FAILED",
    response,
  };
}

function increasePage() {
  return {
    type: "INCREASED_PAGE",
  };
}

function shouldFetchMessages(state, page) {
  if (state.message.isFetching) {
    return false;
  } else if (!state.message.all.length) {
    return true;
  } else {
    return state.message.all;
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

function getMessages(page = 1) {
  return async (dispatch, getState) => {
    const expiresIn = getState().user.expiresIn;
    if (isTokenGoingToExpireSoon(expiresIn) && !isTokenExpired(expiresIn)) {
      dispatch(refreshToken());
    }
    let err, response;
    dispatch(requestMessages(page));
    [err, response] = await to(fetchItems(page));
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

export function getMessagesIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), page)) {
      return dispatch(getMessages(page));
    }
  };
}
