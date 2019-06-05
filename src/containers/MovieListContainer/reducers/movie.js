const defaultState = {
  movies: [],
  total: 0,
  page: 1,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RECEIVED_MOVIES':
      debugger;
      return {
        ...state,
        movies: [...state.movies, ...action.response.results],
        total: action.response.total_results,
        page: state.page + 1,
      };
    default:
      return state;
  }
}
