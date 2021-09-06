import { DOMAIN } from "../Util/constants/systemConstant";
import request from "./request";

// Lấy thông tin người dùng
export const getUserLoginService = () => {
  return request({
    method: "POST",
    url: `${DOMAIN}/QuanLyNguoiDung/ThongTinTaiKhoan`,
  });
};
