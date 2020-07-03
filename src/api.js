import axios from "axios";
import moment from "moment";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://missed-connections-server.herokuapp.com/"
    : "http://localhost:3001/";

export const fetchItem = (id) =>
  axios(`message/${id}`, {
    withCredentials: true,
  })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response;
    });

export const fetchItems = (page) =>
  axios(`message/list/${page}`, {
    withCredentials: true,
  })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response;
    });

export const registerUser = (data) =>
  axios
    .post("auth/register", data)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response;
    });

export const login = (data) =>
  axios
    .post("auth/login", data, { withCredentials: true })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response;
    });

export const refresh = () => {
  const email = localStorage.getItem("missed_connections_email");
  const refreshToken = localStorage.getItem("refreshToken");
  return axios
    .post("auth/refresh", { refreshToken, email }, { withCredentials: true })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response;
    });
};

export const isTokenGoingToExpireSoon = () => {
  const loginTimeExpiration = localStorage.getItem("loginTimeExpiration");
  if (loginTimeExpiration) {
    if (moment().isAfter(moment(loginTimeExpiration).subtract(3, "minutes"))) {
      return true;
    }
  }
  return false;
};

export const isTokenExpired = () => {
  const loginTimeExpiration = localStorage.getItem("loginTimeExpiration");
  if (loginTimeExpiration) {
    if (moment().isAfter(moment(loginTimeExpiration))) {
      return true;
    }
  }
  return false;
};

/* @TODO user verification
export const authenticate = (activationId) =>
  axios(`auth/${activationId}`).then((response) => response.data);
*/
