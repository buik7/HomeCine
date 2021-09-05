import { Button, Input } from "antd";
import React, { useCallback } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const validationSchema = yup.object().shape({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const { values, touched, errors, handleChange, handleBlur } = formik;

  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const goToHome = useCallback(() => {
    props.history.push("/");
  }, [props]);

  const handleSubmit = () => {
    setAllTouched();
    if (formik.isValid) {
      dispatch({
        type: sagaTypes.SIGN_IN_SAGA,
        loginInInfo: formik.values,
        callBack: goToHome,
      });
    }
  };

  return (
    <div className="container">
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3>Login to HomeCine</h3>
        <Input
          name="taiKhoan"
          size="large"
          placeholder="Tài khoản"
          prefix={<UserOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.taiKhoan}
        />
        <div className="text-danger mt-1">
          {touched.taiKhoan ? errors.taiKhoan : ""}
        </div>
        <Input
          name="matKhau"
          size="large"
          placeholder="Mật khẩu"
          type="password"
          prefix={<LockOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.matKhau}
          autoComplete="on"
        />
        <div className="text-danger mt-1">
          {touched.matKhau ? errors.matKhau : ""}
        </div>
        <Button type="primary" className="mt-4" onClick={handleSubmit}>
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
