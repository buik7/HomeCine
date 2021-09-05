import { all } from "redux-saga/effects";
import { watchGetUserLoginSaga, watchSignInSaga } from "./authSaga";
import {
  watchCreateScheduleSaga,
  watchGetCinemaListSaga,
  watchGetCinemaSystemListSaga,
  watchGetScheduleByCinemaSaga,
} from "./cinemaSaga";
import {
  watchCreateFilmSaga,
  watchDeleteFilmSaga,
  watchEditFilmSaga,
  watchGetFilmDetailSaga,
  watchGetFilmListSaga,
} from "./filmSaga";
import {
  watchAddUserSaga,
  watchDeleteUserSaga,
  watchEditUserSaga,
  watchGetUserDetailSaga,
  watchGetUserListSaga,
  watchGetUserTypeListSaga,
} from "./userSaga";

export function* rootSaga() {
  yield all([
    watchSignInSaga(),
    watchGetUserLoginSaga(),
    watchGetFilmListSaga(),
    watchCreateFilmSaga(),
    watchDeleteFilmSaga(),
    watchGetFilmDetailSaga(),
    watchEditFilmSaga(),
    watchGetCinemaListSaga(),
    watchGetCinemaSystemListSaga(),
    watchCreateScheduleSaga(),
    watchAddUserSaga(),
    watchDeleteUserSaga(),
    watchEditUserSaga(),
    watchGetUserListSaga(),
    watchGetUserTypeListSaga(),
    watchGetUserDetailSaga(),
    watchGetScheduleByCinemaSaga(),
  ]);
}
