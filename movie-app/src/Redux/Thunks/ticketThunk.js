import { connection } from "../..";
import {
  bookTicketService,
  getTicketDetailService,
} from "../../Services/ticketService";
import { STATUS_CODE } from "../../Util/constants/systemConstant";
import { actionTypes } from "../Constants/actionTypes";

export const getTicketDetailThunk = (ticketId) => {
  return (dispatch) => {
    getTicketDetailService(ticketId)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          dispatch({
            type: actionTypes.BOOK_TICKET,
            payload: data.content,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const bookTicketThunk = (data) => {
  return async (dispatch, getState) => {
    const taiKhoan = localStorage.getItem("taiKhoan");
    dispatch({ type: actionTypes.DISPLAY_LOADING });
    await bookTicketService(data)
      .then(({ data, status }) => {
        if (status === STATUS_CODE.SUCCESS) {
          console.log(data);
          dispatch({ type: actionTypes.HIDE_LOADING });
          // dispatch({ type: actionTypes.DELETE_MY_SEATS });
          // connection.invoke("datGheThanhCong", taiKhoan, data.maLichChieu);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.HIDE_LOADING });
      });
  };
};

export const bookSeatThunk = (seat, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: actionTypes.SAVE_TICKET_SEATS,
      payload: seat,
    });

    let danhSachGheDangDat = getState().ticketReducer.danhSachGheDangDat;
    let taiKhoan = getState().userReducer.userLogin.taiKhoan;

    console.log(taiKhoan);
    connection.invoke(
      "datGhe",
      taiKhoan,
      JSON.stringify(danhSachGheDangDat),
      maLichChieu
    );
  };
};
