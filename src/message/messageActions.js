import to from "await-to-js";
import api from "../api";

function requestMessages(page) {
  return {
    type: "REQUESTED_MESSAGES",
    receivedAt: Date.now(),
    page,
  };
}

function receiveMessages(response) {
  return {
    type: "RECEIVED_MESSAGES",
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
  if (!state.message.all.length) {
    return true;
  } else if (state.message.isFetching) {
    return false;
  } else {
    return state.message.all;
  }
}

let getMessages = (page = 1) => async (dispatch, getState) => {
  let err, response;

  dispatch(requestMessages(page));
  [err, response] = await to(api.fetchItems(page, getState().user.accessToken));
  console.log("request done with page:", page);
  if (err) {
    return dispatch(handleError(err));
  }
  dispatch(receiveMessages(response));
  return dispatch(increasePage());
};

export function getMessagesIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), page)) {
      return dispatch(getMessages(page));
    }
  };
}
