const defaultState = {
  all: [],
  totalItems: 0,
  page: 1,
  isFetching: false,
  totalPages: 1,
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "INCREASED_PAGE":
      return {
        ...state,
        page: state.page + 1,
        isFetching: false,
      };
    case "REQUESTED_MESSAGES":
      return {
        ...state,
        isFetching: true,
      };
    case "REQUESTED_MESSAGE":
      return {
        ...state,
        isFetching: true,
      };
    case "RECEIVED_MESSAGES":
      return {
        ...state,
        all: [...state.all, ...action.response.items],
        totalItems: action.response.totalDocs,
        totalPages: action.response.totalPages,
      };
    case "RECEIVED_MESSAGE":
      return {
        ...state,
        all: [
          ...state.all,
          action.response,
        ] /* @TODO bug when browsing list/detail page duplicate item added */,
        isFetching: false,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isFetching: false,
      };
    case "LOGOUT_SUCCEEDED":
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};
