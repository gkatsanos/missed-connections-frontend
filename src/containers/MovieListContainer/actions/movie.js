import axios from 'axios'
import to from 'await-to-js';
import { apiUrls } from '../../../constants';

function requestMovies(page) {
  return {
    type: 'REQUESTED_MOVIES',
    receivedAt: Date.now(),
    page,
  }
}

function receiveMovies(response) {
  return {
    type: 'RECEIVED_MOVIES',
    response,
    receivedAt: Date.now(),
  }
}

function throwError(err) {
  return {
    type: 'ENCOUNTERED_ERROR',
    err,
    receivedAt: Date.now(),
  }
}

function shouldFetchMovies(state, page) {
  if (!state.movie.movies.length) {
    return true;
  } else if (state.movie.isFetching) {
    return false;
  } else {
    return state.movie.movies;
  }
}

export function getMoviesIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchMovies(getState(), page)) {
      return dispatch(getMovies(page));
    }
  }
}

export function increasePage() {
  return {
    type: 'INCREASED_PAGE',
  }
}

export let getMovies = (page = 1) => async dispatch => {
  let err, response;

  dispatch(requestMovies(page));
  [err, response] = await to(axios.get(`${apiUrls.base}/${apiUrls.theaters}`, {
    params: {
      page,
      api_key: '36081eca9a2ced64d616c59681881626',
    }
  }));
  console.log('request done with page:', page);
  if (err) return dispatch(throwError(err));
  debugger;
  return dispatch(receiveMovies(response.data));// somewhere here I want to trigger another action that increases the page...?
};
