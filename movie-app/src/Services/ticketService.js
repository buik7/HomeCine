import request from "./request";
import { DOMAIN } from "../Util/constants/systemConstant";

export const getTicketDetailService = (ticketId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${ticketId}`,
  });
};

export const bookTicketService = (data) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/QuanLyDatVe/DatVe`,
    data,
  });
};
