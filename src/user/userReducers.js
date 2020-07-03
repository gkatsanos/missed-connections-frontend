const defaultState = {
  isAuthenticated: true,
  createdAt: "",
  email: "",
  firstName: "",
  id: "",
  lastName: "",
  accessToken: "",
  expiresIn: "",
  refreshToken: "",
  tokenType: "",
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCEEDED":
      return {
        ...state,
        accessToken: action.response.token.accessToken,
        firstName: action.response.user.firstName,
        lastName: action.response.user.lastName,
        email: action.response.user.email,
        createdAt: action.response.user.createdAt,
        isAuthenticated: true,
        refreshToken: action.response.token.refreshToken,
        expiresIn: action.response.token.expiresIn,
      };
    case "REFRESHED_TOKEN":
      return {
        ...state,
        refreshToken: action.response.token.refreshToken,
        expiresIn: action.response.token.expiresIn,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
