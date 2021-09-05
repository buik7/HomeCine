import { actionTypes } from "../constants/actionTypes";

const initialState = {
  userList: [],
  userDetail: {},
  userTypeList: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_USER_TYPE_LIST:
      state.userTypeList = payload;
      return { ...state };

    case actionTypes.SAVE_USER_LIST:
      state.userList = payload;
      return { ...state };

    case actionTypes.SAVE_USER_DETAIL:
      state.userDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default userReducer;
