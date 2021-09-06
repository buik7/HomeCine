import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

export const getFilmListService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyPhim/LayDanhSachPhim`,
  });
};

export const getFilmDetailService = (filmId) => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`,
  });
};
