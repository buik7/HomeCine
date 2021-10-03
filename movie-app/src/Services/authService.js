import request from "./request";
import { DOMAIN, localStorageKeys } from "./../Util/constants/systemConstant";

export const signInService = ({ taiKhoan, matKhau }) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/QuanLyNguoiDung/DangNhap`,
    data: { taiKhoan, matKhau },
  });
};

export const signUpService = (data) => {
  return request({
    method: "POST",
    url: `${DOMAIN}/QuanLyNguoiDung/DangKy`,
    data: data,
  });
};
