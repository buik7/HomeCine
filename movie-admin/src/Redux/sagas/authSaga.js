import { put, call, takeLatest } from "redux-saga/effects";
import { getUserLoginService, signInService } from "../../Services/authService";
import {
  localStorageKeys,
  STATUS_CODE,
} from "../../Util/constants/systemConstant";
import { sagaTypes } from "./../constants/sagaTypes";
import { actionTypes } from "./../constants/actionTypes";

function* signInSaga(action) {
  try {
    const { data, status } = yield call(signInService(action.loginInInfo));
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(
        localStorageKeys.ACCESS_TOKEN,
        data.content.accessToken
      );

      yield put({
        type: actionTypes.SAVE_USER_LOGIN,
        payload: data.content,
      });

      action.callBack();
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getUserLoginSaga(action) {
  try {
    const { data, status } = yield call(getUserLoginService(action.token));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER_LOGIN,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchSignInSaga() {
  yield takeLatest(sagaTypes.SIGN_IN_SAGA, signInSaga);
}

export function* watchGetUserLoginSaga() {
  yield takeLatest(sagaTypes.GET_USER_LOGIN_SAGA, getUserLoginSaga);
}
