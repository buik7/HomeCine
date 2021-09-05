import { put, call, takeLatest } from "redux-saga/effects";
import {
  createScheduleService,
  getCinemaService,
  getCinemaSystemService,
  getScheduleByCinemaService,
} from "../../Services/cinemaService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { openNotification } from "../../Util/notification";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getCinemaSystemListSaga() {
  try {
    const { data, status } = yield call(getCinemaSystemService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_SYSTEM_LIST,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getCinemaListSaga(action) {
  try {
    // console.log(action.payload);
    const { data, status } = yield call(getCinemaService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_LIST,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* createScheduleSaga(action) {
  try {
    const { data, status } = yield call(createScheduleService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      openNotification("success", "Thêm lịch chiếu thành công", "");
      // GỌI LẠI HÀM FETCH LỊCH CHIẾU
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

function* getScheduleByCinemaSaga(action) {
  try {
    const { data, status } = yield call(
      getScheduleByCinemaService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_SCHEDULE,
        payload: data.content,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetCinemaSystemListSaga() {
  yield takeLatest(
    sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    getCinemaSystemListSaga
  );
}

export function* watchGetCinemaListSaga() {
  yield takeLatest(sagaTypes.GET_CINEMA_LIST_SAGA, getCinemaListSaga);
}

export function* watchCreateScheduleSaga() {
  yield takeLatest(sagaTypes.CREATE_SCHEDULE_SAGA, createScheduleSaga);
}

export function* watchGetScheduleByCinemaSaga() {
  yield takeLatest(
    sagaTypes.GET_SCHEDULE_BY_CINEMA_SAGA,
    getScheduleByCinemaSaga
  );
}
