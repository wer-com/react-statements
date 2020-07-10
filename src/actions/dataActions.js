import {
  SET_STATEMENTS,
  LOADING_DATA,
  LIKE_STATEMENT,
  UNLIKE_STATEMENT,
  DELETE_STATEMENT,
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
