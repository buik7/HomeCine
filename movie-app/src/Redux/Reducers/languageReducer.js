import { actionTypes } from "../Constants/actionTypes";

const initialState = "en";

const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE_LANGUAGE:
      return payload;

    default:
      return state;
  }
};

export default languageReducer;
