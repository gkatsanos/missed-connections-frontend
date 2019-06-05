import { createSelector } from 'reselect'

const selectMovies = (state) => state.movie.movies;

const getParamId = (state, props) => Number(props.match.params.id);

export const selectMovieById = createSelector(
  [ selectMovies, getParamId ],
  (movies, currentId) => {
    return movies.find((movie) => movie.id === currentId);
  });
