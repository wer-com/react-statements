import {
  SET_STATEMENTS,
  LOADING_DATA,
  LIKE_STATEMENT,
  UNLIKE_STATEMENT,
} from "../types";

const initState = {
  statements: [],
  statement: {},
  loading: false,
};

export default function (state = initState, { payload, type }) {
  switch (type) {
    case LOADING_DATA:
      return { ...state, loading: true };
    case SET_STATEMENTS:
      return { ...state, statements: payload, loading: false };
    case LIKE_STATEMENT:
    case UNLIKE_STATEMENT:
      let index = state.statements.findIndex(
        (statement) => statement.statementId === payload.statement.statementId
      );
      state.statements[index] = payload;
      return { ...state };
    default:
      return state;
  }
}
