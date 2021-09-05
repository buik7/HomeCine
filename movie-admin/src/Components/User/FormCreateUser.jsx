import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { actionTypes } from "../../Redux/constants/actionTypes";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const validationSchema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
  hoTen: yup.string().required("Vui lòng nhập họ tên"),
  email: yup.string().required("Vui lòng nhập email"),
  soDt: yup
    .number()
    .required("Vui lòng nhập số điện thoại")
    .typeError("Vui lòng nhập số điện thoại đúng định dạng"),
});

const FormCreateUser = () => {
  const userTypeList = useSelector((state) => state.userReducer.userTypeList);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
      maLoaiNguoiDung: userTypeList[0]?.maLoaiNguoiDung,
      maNhom: "GP01",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const handleSubmit = useCallback(() => {
    if (formik.isValid) {
      dispatch({
        type: sagaTypes.ADD_USER_SAGA,
        payload: formik.values,
      });
    }
  }, [formik]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_HANDLE_OK_MODAL,
      payload: handleSubmit,
    });
  }, [formik]);

  return (
    <form>
      <div className="row">
        <div className="col-6 mb-3">
          <div className="from-group">
            <p>Tài khoản</p>
            <input
              className="form-control"
              name="taiKhoan"
              value={formik.values.taiKhoan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.taiKhoan ? formik.errors.taiKhoan : ""}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="from-group">
            <p>Mật khẩu</p>
            <input
              className="form-control"
              type="password"
              name="matKhau"
              value={formik.values.matKhau}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.matKhau ? formik.errors.matKhau : ""}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="from-group">
            <p>Họ tên</p>
            <input
              className="form-control"
              name="hoTen"
              value={formik.values.hoTen}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.hoTen ? formik.errors.hoTen : ""}
            </p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="from-group">
            <p>Số điện thoại</p>
            <input
              className="form-control"
              name="soDt"
              value={formik.values.soDt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.soDt ? formik.errors.soDt : ""}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="from-group">
            <p>Email</p>
            <input
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.email ? formik.errors.email : ""}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="from-group">
            <p>Mã loại người dùng</p>
            <select
              className="form-control"
              onChange={(e) => {
                formik.setFieldValue("maLoaiNguoiDung", e.target.value);
              }}
            >
              {userTypeList.map((userType, index) => {
                return (
                  <option value={userType.maLoaiNguoiDung} key={index}>
                    {userType.tenLoai}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCreateUser;
