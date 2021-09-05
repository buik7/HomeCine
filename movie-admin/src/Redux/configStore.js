import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/rootSaga";
import authReducer from "./reducers/authReducer";
import filmReducer from "./reducers/filmReducer";
import modalReducer from "./reducers/modalReducer";
import userReducer from "./reducers/userReducer";
import cinemaReducer from "./reducers/cinemaReducer";

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  authReducer,
  filmReducer,
  modalReducer,
  userReducer,
  cinemaReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleWareSaga))
);

middleWareSaga.run(rootSaga);

export default store;
