import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
} from "../types";

const initState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
};

export default function (state = initState, { type, payload }) {
  switch (type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initState;
    case SET_USER:
      return { authenticated: true, loading: false, ...payload };
    case LOADING_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
}
