import { actionTypes } from "../constants/actionTypes";

const initialState = {
  userLogin: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_USER_LOGIN:
      state.userLogin = payload;
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
