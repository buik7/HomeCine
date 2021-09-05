import { actionTypes } from "../constants/actionTypes";

const initialState = {
  cinemaSystemList: [], // Hệ thống rạp
  cinemaList: [], // Cụm rạp
  cinemaSchedule: [],
};

const cinemaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_SYSTEM_LIST:
      state.cinemaSystemList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_LIST:
      state.cinemaList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_SCHEDULE:
      state.cinemaSchedule = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cinemaReducer;
