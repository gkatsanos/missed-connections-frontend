const defaultState = {
  all: [],
  totalItems: 0,
  page: 1,
  isFetching: false,
  totalPages: 0,
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
        all: [...state.all, ...action.response.items],
        totalItems: action.response.totalDocs,
        isFetching: false,
        totalPages: action.response.totalPages,
      };
    default:
      return state;
  }
};
