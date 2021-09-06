import request from "./request";
import { DOMAIN } from "../Util/constants/systemConstant";

// Lấy hệ thống rạp
export const getCinemaSystemService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyRap/LayThongTinHeThongRap`,
  });
};

// Lấy Thông tin cụm rạp theo hệ thống rạp
export const getCinemaService = (cinemaSystemId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystemId}`,
  });
};

export const getScheduleByCinemaService = (cinemaId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaId}&maNhom=GP01`,
  });
};

export const getFilmScheduleService = (filmId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmId}`,
  });
};
