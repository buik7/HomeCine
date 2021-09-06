import { getCinemaSystemService } from "../../Services/cinemaService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { actionTypes } from "../Constants/actionTypes";

// Lấy thông tin hệ thống rạp
export const getCinemaSystemThunk = (dispatch) => {
  try {
    getCinemaSystemService().then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_CINEMA_SYSTEM_LIST,
          payload: data.content,
        });
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

// Lấy thông tin rạp
export const getCinemaListThunk = (cinemaSystemId) => {
  return (dispatch) => {
    try {
      getCinemaService(cinemaSystemId).then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_CINEMA_LIST,
            payload: data.content,
          });
        }
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
