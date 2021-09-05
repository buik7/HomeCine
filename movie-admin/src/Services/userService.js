import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

export const getUserTypeListService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`,
  });
};

export const getUserListService = () => {
  return request({
    method: "GET",
    url: `${DOMAIN}/QuanLyNguoiDung/LayDanhSachNguoiDung`,
  });
};

export const addUserService = (userInfo) => {
  return () => {
    return request({
      method: "POST",
      url: `${DOMAIN}/QuanLyNguoiDung/ThemNguoiDung`,
      data: userInfo,
    });
  };
};

export const editUserService = (userInfo) => {
  return () => {
    return request({
      method: "PUT",
      url: `${DOMAIN}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data: userInfo,
    });
  };
};

export const deleteUserService = (taiKhoan) => {
  return () => {
    return request({
      method: "DELETE",
      url: `${DOMAIN}/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`,
    });
  };
};

export const getUserDetailService = (taiKhoan) => {
  return () => {
    return request({
      method: "POST",
      url: `${DOMAIN}/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    })
  }
}