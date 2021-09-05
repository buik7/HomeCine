import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../Redux/constants/actionTypes";

const ModalComponent = () => {
  const dispatch = useDispatch();

  const {
    title,
    visible,
    handleOk,
    handleCancel,
    okText,
    cancelText,
    InnerComponent,
  } = useSelector((state) => state.modalReducer);

  return (
    <>
      <Modal
        centered
        title={title}
        width="60%"
        visible={visible}
        onOk={() => {
          dispatch({
            type: actionTypes.CLOSE_MODAL,
          });
          handleOk();
        }}
        onCancel={() => {
          dispatch({
            type: actionTypes.CLOSE_MODAL,
          });
          handleCancel();
        }}
        okText={okText}
        cancelText={cancelText}
      >
        {InnerComponent}
      </Modal>
    </>
  );
};

export default ModalComponent;
