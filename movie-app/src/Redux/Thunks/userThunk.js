import { getUserLoginService } from "../../Services/userService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
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
