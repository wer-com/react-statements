import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducers from "./reducers/userReducer";
import dataReducers from "./reducers/dataReducer";
import uiReducers from "./reducers/uiReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const initState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducers,
  data: dataReducers,
  UI: uiReducers,
});

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
