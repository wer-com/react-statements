import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS } from "../types";

const initState = {
  lodaing: false,
  errors: {},
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case SET_ERRORS:
      return { ...state, loading: false, errors: payload.data };
    case CLEAR_ERRORS:
      return { ...state, loading: false, errors: {} };
    case LOADING_UI:
      return { ...state, loading: true };
    default:
      return state;
  }
}
