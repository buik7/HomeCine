import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  lichChieu: {
    maLichChieu: "44552",
    maRap: "476",
    tenRap: "Rạp 6",
    ngayChieuGioChieu: "2021-09-12T05:53:34",
    giaVe: 150000,
    thoiLuong: 120,
  },
  maCumRap: "",
};

const ticketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.BOOK_TICKET:
      state.lichChieu = JSON.parse(payload.lichChieu);
      state.maCumRap = payload.maCumRap;
      return { ...state };
    default:
      return state;
  }
};

export default ticketReducer;
