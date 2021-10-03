import { signInService, signUpService } from "../../Services/authService";
import {
  localStorageKeys,
  STATUS_CODE,
} from "../../Util/constants/systemConstant";
import { openNotification } from "../../Util/Notification/Notification";
import { actionTypes } from "../Constants/actionTypes";

export const signInThunk = (data, callback) => {
  return (dispatch) => {
    signInService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_USER_LOGIN,
            payload: data.content,
          });
          localStorage.setItem(
            localStorageKeys.ACCESS_TOKEN,
            data.content.accessToken
          );
          localStorage.setItem("TAI_KHOAN", data.content.taiKhoan);

          callback();
        }
      })
      .catch((error) => {
        console.log(error);
        openNotification(
          "error",
          "Login Error",
          "Your username or password is incorrect. Please try again"
        );
      });
  };
};

export const signUpThunk = (data, callback) => {
  return (dispatch) => {
    signUpService(data)
      .then(({ status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          callback();
          openNotification(
            "success",
            "SUCCESS",
            "Your account has been created!"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
