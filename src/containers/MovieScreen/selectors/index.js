import { createSelector } from 'reselect'

export const getMovieById = (state, id) => state.movies.filter((movie) => movie.id === id);
