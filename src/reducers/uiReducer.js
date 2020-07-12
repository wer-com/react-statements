import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS, STOP_LOADING } from "../types";

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
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}
