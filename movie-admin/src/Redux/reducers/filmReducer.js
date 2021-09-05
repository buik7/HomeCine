import { actionTypes } from "../constants/actionTypes";

const initialState = {
  filmList: [],
  filmDetail: {},
};

const filmReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_FILM_LIST:
      state.filmList = payload;
      return { ...state };

    case actionTypes.SAVE_FILM_DETAIL:
      state.filmDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default filmReducer;
