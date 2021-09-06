import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  userLogin: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_USER_LOGIN:
      state.userLogin = payload;
      return { ...state };

    default:
      return state;
  }
};

export default userReducer;
