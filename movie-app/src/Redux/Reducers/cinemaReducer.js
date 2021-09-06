import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  cinemaSystemList: [],
  cinemaList: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_SYSTEM_LIST:
      state.cinemaSystemList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_LIST:
      state.cinemaList = payload;
      return { ...state };

    default:
      return state;
  }
};
