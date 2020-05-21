const defaultState = {
  isAuthenticated: false,
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
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.response.accessToken,
      };
    default:
      return state;
  }
};
