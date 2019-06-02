const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_MOVIES':
      return [...state, ...action.movies.results];
    default:
      return state;
  }
}
