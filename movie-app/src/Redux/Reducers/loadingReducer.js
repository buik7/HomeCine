import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.DISPLAY_LOADING:
      state.isLoading = true;
      return { ...state };

    case actionTypes.HIDE_LOADING:
      state.isLoading = false;
      return { ...state };

    default:
      return state;
  }
};

export default loadingReducer;
