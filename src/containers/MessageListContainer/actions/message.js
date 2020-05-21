import to from "await-to-js";
import api from "../../../constants";

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

function throwError(err) {
  return {
    type: "ENCOUNTERED_ERROR",
    err,
    receivedAt: Date.now(),
  };
}

export function increasePage() {
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
export let getMessages = (page = 1) => async (dispatch, getState) => {
  let err, response;

  dispatch(requestMessages(page));
  [err, response] = await to(api.fetchItems(page, getState().user.accessToken));
  console.log("request done with page:", page);
  if (err) return dispatch(throwError(err));
  return dispatch(receiveMessages(response.data)); // somewhere here I want to trigger another action that increases the page...?
};

export function getMessagesIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), page)) {
      return dispatch(getMessages(page));
    }
  };
}
