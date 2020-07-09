import {
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((result) => {
      setAuthorizationHeader(result.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", userData)
    .then((result) => {
      setAuthorizationHeader(result.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};
