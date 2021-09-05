import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

export const getFilmListService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyPhim/LayDanhSachPhim`,
  });
};

export const createFilmService = (filmInfo) => {
  return () => {
    return request({
      method: "POST",
      url: `${DOMAIN}/QuanLyPhim/ThemPhimUploadHinh`,
      data: filmInfo,
    });
  };
};

export const deleteFilmService = (filmId) => {
  return () => {
    return request({
      method: "DELETE",
      url: `${DOMAIN}/QuanLyPhim/XoaPhim?MaPhim=${filmId}`,
    });
  };
};

export const getFilmDetailService = (filmId) => {
  return () => {
    return request({
      method: "GET",
      url: `${DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${filmId}`,
    });
  };
};

export const editFilmService = (filmInfo) => {
  return () => {
    return request({
      method: "POST",
      url: `${DOMAIN}/QuanLyPhim/CapNhatPhimUpload`,
      data: filmInfo,
    });
  };
};
