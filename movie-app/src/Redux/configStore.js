import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./Reducers/userReducer";
import filmReducer from "./Reducers/filmReducer";
import cinemaReducer from "./Reducers/cinemaReducer";
import languageReducer from "./Reducers/languageReducer";
import ticketReducer from "./Reducers/ticketReducer";
import loadingReducer from "./Reducers/loadingReducer";

const rootReducer = combineReducers({
  userReducer,
  filmReducer,
  cinemaReducer,
  languageReducer,
  ticketReducer,
  loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
