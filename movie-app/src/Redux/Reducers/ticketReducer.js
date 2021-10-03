import { actionTypes } from "../Constants/actionTypes";

const initialState = {
  // lichChieu: {
  //   maLichChieu: "44552",
  //   maRap: "476",
  //   tenRap: "Rạp 6",
  //   ngayChieuGioChieu: "2021-09-12T05:53:34",
  //   giaVe: 150000,
  //   thoiLuong: 120,
  // },
  lichChieu: "",
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
};

const ticketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.BOOK_TICKET:
      state.lichChieu = payload;
      return { ...state };

    case actionTypes.BOOK_SEAT:
      state.danhSachGheKhachDat = payload;
      return { ...state };

    case actionTypes.DELETE_MY_SEATS:
      state.danhSachGheDangDat = [];
      return { ...state };

    case actionTypes.SAVE_TICKET_SEATS:
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (seat) => seat.maGhe === payload.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(payload);
      }

      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };

    default:
      return state;
  }
};

export default ticketReducer;
