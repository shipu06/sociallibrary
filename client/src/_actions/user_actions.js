import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  LOAD_USER,
} from "./types";
import { USER_SERVER } from "../components/Config.js";

export function registerUser(dataToSubmit) {
  return (dispatch) => {
    axios
      .post(`/api/users/register`, dataToSubmit)
      .then((res) => {
        const { username, password } = dataToSubmit;
        dispatch(loginUser({ username, password }));
      })
      .catch((error) => {
        alert("Sign Up Error: Wrong username or password");
      });
  };
}

export function loginUser(dataToSubmit) {
  return (dispatch) => {
    axios
      .post(`/api/users/login`, dataToSubmit)
      .then((res) => {
        dispatch({
          type: LOGIN_USER,
          payload: res.data,
        });
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((error) => {
        alert("Sign In Error: Wrong username or password");
      });
  };
}
export function loadSessionData() {
  const data = JSON.parse(localStorage.getItem("user"));
  return {
    type: LOAD_USER,
    payload: data,
  };
}

export function auth() {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
