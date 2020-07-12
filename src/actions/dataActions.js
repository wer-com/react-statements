import {
  SET_STATEMENTS,
  LOADING_DATA,
  LIKE_STATEMENT,
  UNLIKE_STATEMENT,
  DELETE_STATEMENT,
  CLEAR_ERRORS,
  POST_STATEMENT,
  LOADING_UI,
  SET_ERRORS,
  SET_STATEMENT,
  STOP_LOADING,
} from "../types";
import axios from "axios";

export const getStatements = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/statements")
    .then((res) => {
      dispatch({ type: SET_STATEMENTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_STATEMENTS, payload: [] });
    });
};

export const likeStatement = (statementId) => (dispatch) => {
  axios
    .get(`/statement/${statementId}/like`)
    .then((res) => dispatch({ type: LIKE_STATEMENT, payload: res.data }))
    .catch((err) => console.log(err));
};

export const unlikeStatement = (statementId) => (dispatch) => {
  axios
    .get(`/statement/${statementId}/unlike`)
    .then((res) => dispatch({ type: UNLIKE_STATEMENT, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteStatement = (statementId) => (dispatch) => {
  axios
    .delete(`/statement/${statementId}`)
    .then(() => dispatch({ type: DELETE_STATEMENT, payload: statementId }))
    .catch((err) => console.log(err));
};

export const postStatement = (newStatement) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/statement", newStatement)
    .then((res) => {
      dispatch({ type: POST_STATEMENT, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => dispatch({ type: SET_ERRORS, payload: err.response }));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getStatement = (statementId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/statement/${statementId}`)
    .then((res) => {
      dispatch({ type: SET_STATEMENT, payload: res.data });
      dispatch({ type: STOP_LOADING });
    })
    .catch((err) => console.log(err));
};
