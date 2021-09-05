import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

export const signInService = (loginInfo) => {
  return () => {
    return request({
      url: `${DOMAIN}/QuanLyNguoiDung/DangNhap`,
      method: "POST",
      data: loginInfo,
    });
  };
};

export const getUserLoginService = (token) => {
  return () => {
    return request({
      url: `${DOMAIN}/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      data: token,
    });
  };
};
