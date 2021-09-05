import { put, call, takeLatest } from "redux-saga/effects";
import {
  createFilmService,
  deleteFilmService,
  editFilmService,
  getFilmDetailService,
  getFilmListService,
} from "../../Services/filmService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getFilmListSaga() {
  try {
    const { data, status } = yield call(getFilmListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_FILM_LIST,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* createFilmSaga(action) {
  try {
    const { data, status } = yield call(createFilmService(action.filmInfo));
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: sagaTypes.GET_FILM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* deleteFilmSaga(action) {
  try {
    const { data, status } = yield call(deleteFilmService(action.filmId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_FILM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getFilmDetailSaga(action) {
  try {
    const { data, status } = yield call(getFilmDetailService(action.filmId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_FILM_DETAIL,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* editFilmSaga(action) {
  try {
    const { data, status } = yield call(editFilmService(action.filmInfo));
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_FILM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetFilmListSaga() {
  yield takeLatest(sagaTypes.GET_FILM_LIST_SAGA, getFilmListSaga);
}

export function* watchCreateFilmSaga() {
  yield takeLatest(sagaTypes.CREATE_FILM_SAGA, createFilmSaga);
}

export function* watchDeleteFilmSaga() {
  yield takeLatest(sagaTypes.DELETE_FILM_SAGA, deleteFilmSaga);
}

export function* watchGetFilmDetailSaga() {
  yield takeLatest(sagaTypes.GET_FILM_DETAIL_SAGA, getFilmDetailSaga);
}

export function* watchEditFilmSaga() {
  yield takeLatest(sagaTypes.EDIT_FILM_SAGA, editFilmSaga);
}
