import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

// Lấy hệ thống rạp
export const getCinemaSystemService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyRap/LayThongTinHeThongRap`,
  });
};

// Lấy Thông tin cụm rạp theo hệ thống rạp
export const getCinemaService = (cinemaSystemId) => {
  return () => {
    return request({
      method: "GET",
      url: `${DOMAIN}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaSystemId}`,
    });
  };
};

export const createScheduleService = (scheduleInfo) => {
  return () => {
    return request({
      method: "POST",
      url: `${DOMAIN}/QuanLyDatVe/TaoLichChieu`,
      data: scheduleInfo,
    });
  };
};

export const getScheduleByCinemaService = (cinemaId) => {
  return () => {
    return request({
      method: "GET",
      url: `${DOMAIN}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaId}&maNhom=GP01`
    })
  }
}
