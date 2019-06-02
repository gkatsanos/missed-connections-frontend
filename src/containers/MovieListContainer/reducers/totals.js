export default (state = 0, action) => {
  switch (action.type) {
    case 'RECEIVE_MOVIES':
      return action.movies.total_results;
    default:
      return state;
  }
}
