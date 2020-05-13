const defaultState = {
  movies: [],
  total: 0,
  page: 0,
  isFetching: false,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'INCREASED_PAGE':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'REQUESTED_MOVIES':
      return {
        ...state,
        isFetching: true,
      };
    case 'RECEIVED_MOVIES':
      return {
        ...state,
        movies: [...state.movies, ...action.response.results],
        // total: action.response.total_results,
        isFetching: false,
      };
    default:
      return state;
  }
}
