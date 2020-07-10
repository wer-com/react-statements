import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LIKE_STATEMENT,
  UNLIKE_STATEMENT,
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
    case LIKE_STATEMENT:
      return {
        ...state,
        likes: [
          ...state.likes,
          { userHandle: state.credentials.handle, statementId: payload },
        ],
      };
    case UNLIKE_STATEMENT:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.statementId !== payload.statementId
        ),
      };
    default:
      return state;
  }
}
