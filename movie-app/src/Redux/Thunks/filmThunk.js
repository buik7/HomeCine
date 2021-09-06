import { getFilmScheduleService } from "../../Services/cinemaService";
import {
  getFilmDetailService,
  getFilmListService,
} from "../../Services/filmService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { actionTypes } from "../Constants/actionTypes";

export const getFilmListThunk = (dispatch) => {
  try {
    getFilmListService().then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_FILM_LIST,
          payload: data.content,
        });
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getFilmDetailThunk = (filmId) => {
  return (dispatch) => {
    try {
      getFilmDetailService(filmId).then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_FILM_DETAIL,
            payload: data.content,
          });
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getFilmScheduleThunk = (filmId) => {
  return (dispatch) => {
    try {
      getFilmScheduleService(filmId).then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_FILM_SCHEDULE,
            payload: data.content,
          });
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
