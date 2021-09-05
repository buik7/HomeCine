import React from "react";

import { actionTypes } from "../constants/actionTypes";

const initialState = {
  title: "Modal",
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  okText: "Submit",
  cancelText: "Cancel",
  InnerComponent: <p>Default content</p>,
};

const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_MODAL:
      state.visible = true;
      return { ...state };

    case actionTypes.CLOSE_MODAL:
      state.visible = false;
      return { ...state };

    case actionTypes.SET_HANDLE_OK_MODAL:
      state.handleOk = payload;
      return { ...state };

    case actionTypes.OPEN_MODAL_CREATE_FILM:
      state.visible = true;
      state.InnerComponent = payload.InnerComponent;
      state.title = "Tạo phim";
      state.okText = "Tạo phim";
      state.cancelText = "Hủy";
      return { ...state };

    case actionTypes.OPEN_MODAL_EDIT_FILM:
      state.visible = true;
      state.InnerComponent = payload.InnerComponent;
      state.title = "Chỉnh sửa phim";
      state.okText = "Chỉnh sửa";
      state.cancelText = "Hủy";
      return { ...state };

    case actionTypes.OPEN_MODAL_CREATE_USER:
      state.visible = true;
      state.InnerComponent = payload.InnerComponent;
      state.title = "Thêm người dùng";
      state.okText = "Thêm người dùng";
      state.cancelText = "Hủy";
      return { ...state };

    case actionTypes.OPEN_MODAL_EDIT_USER:
      state.visible = true;
      state.InnerComponent = payload.InnerComponent;
      state.title = "Chỉnh sửa người dùng";
      state.okText = "Chỉnh sửa";
      state.cancelText = "Hủy";
      return { ...state };

    default:
      return state;
  }
};

export default modalReducer;
