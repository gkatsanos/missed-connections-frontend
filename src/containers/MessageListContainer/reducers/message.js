const defaultState = {
  all: [],
  total: 0,
  page: 0,
  isFetching: false,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "INCREASED_PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    case "REQUESTED_MESSAGES":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVED_MESSAGES":
      return {
        ...state,
        all: [...state.all, ...action.response.results],
        // total: action.response.total_results,
        isFetching: false,
      };
    default:
      return state;
  }
};
