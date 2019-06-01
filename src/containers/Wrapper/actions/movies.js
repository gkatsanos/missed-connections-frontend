// import fetch from 'cross-fetch'
import movies from './mock';

function requestMovies() {
  return {
    type: 'REQUEST_MOVIES',
    receivedAt: Date.now(),
  }
}

function receiveMovies(movies) {
  return {
    type: 'RECEIVE_MOVIES',
    movies,
    receivedAt: Date.now(),
  }
}

export let getMovies = () => async dispatch => {
  dispatch(requestMovies());
  const result = movies;
  dispatch(receiveMovies(result));
};
