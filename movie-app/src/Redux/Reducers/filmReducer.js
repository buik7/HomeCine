import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  filmList: [],
  filmDetail: {},
  filmSchedule: [],
};

const filmReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_FILM_LIST:
      state.filmList = payload;
      return { ...state };

    case actionTypes.SAVE_FILM_DETAIL:
      state.filmDetail = payload;
      return { ...state };

    case actionTypes.SAVE_FILM_SCHEDULE:
      state.filmSchedule = payload;
      return { ...state };

    default:
      return state;
  }
};

export default filmReducer;
