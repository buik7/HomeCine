import { put, call, takeLatest } from "redux-saga/effects";
import {
  addUserService,
  deleteUserService,
  editUserService,
  getUserDetailService,
  getUserListService,
  getUserTypeListService,
} from "../../Services/userService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getUserTypeListSaga() {
  try {
    const { data, status } = yield call(getUserTypeListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER_TYPE_LIST,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getUserListSaga() {
  try {
    const { data, status } = yield call(getUserListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER_LIST,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* addUserSaga(action) {
  try {
    const { data, status } = yield call(addUserService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* editUserSaga(action) {
  try {
    const { data, status } = yield call(editUserService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* deleteUserSaga(action) {
  try {
    const { data, status } = yield call(deleteUserService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getUserDetailSaga(action){
  try {
    const {data, status} = yield call(getUserDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS){
      yield put({
        type: actionTypes.SAVE_USER_DETAIL,
        payload: data.content,
      })
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetUserTypeListSaga() {
  yield takeLatest(sagaTypes.GET_USER_TYPE_LIST_SAGA, getUserTypeListSaga);
}

export function* watchGetUserListSaga() {
  yield takeLatest(sagaTypes.GET_USER_LIST_SAGA, getUserListSaga);
}

export function* watchAddUserSaga() {
  yield takeLatest(sagaTypes.ADD_USER_SAGA, addUserSaga);
}

export function* watchEditUserSaga() {
  yield takeLatest(sagaTypes.EDIT_USER_SAGA, editUserSaga);
}

export function* watchDeleteUserSaga() {
  yield takeLatest(sagaTypes.DELETE_USER_SAGA, deleteUserSaga);
}

export function * watchGetUserDetailSaga(){
  yield takeLatest(sagaTypes.GET_USER_DETAIL_SAGA, getUserDetailSaga);
}
