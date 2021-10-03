import {
  getUserLoginService,
  updateUserService,
} from "../../Services/userService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { openNotification } from "../../Util/Notification/Notification";
import { actionTypes } from "../Constants/actionTypes";

export const getUserLoginThunk = (dispatch) => {
  try {
    getUserLoginService().then(({ data, status }) => {
      if (status === STATUS_CODE.SUCCESS) {
        dispatch({
          type: actionTypes.SAVE_USER_LOGIN,
          payload: data.content,
        });
      }
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

export const updateUserThunk = (data) => {
  return (dispatch) => {
    updateUserService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.SAVE_USER_LOGIN,
            payload: data.content,
          });
          openNotification(
            "success",
            "SUCCESS",
            "Your account information is updated!"
          );
        }
      })
      .catch((error) => {
        openNotification("error", "Error", "Update failed. Please try again");
        console.log(error.response.data);
      });
  };
};
