import { Button, Input } from "antd";
import React, { useCallback } from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { signUpThunk } from "../../Redux/Thunks/authThunk";
import { useTranslation } from "react-i18next";

const validationSchema = yup.object().shape({
  taiKhoan: yup.string().required("Please enter your username"),
  matKhau: yup.string().required("Please enter your password"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  soDt: yup.string().required("Please enter your phone number"),
  hoTen: yup.string().required("Please enter your name"),
});

const SignUp = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
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

  const goToSignIn = useCallback(() => {
    props.history.push("/signin");
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTouched();
    if (formik.isValid) {
      dispatch(signUpThunk(formik.values, goToSignIn));
    }
  };

  return (
    <div className="container">
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3>{t("signup_create_account")}</h3>
        <Input
          name="taiKhoan"
          size="large"
          placeholder={t("profile_username")}
          prefix={<UserOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.taiKhoan}
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.taiKhoan ? errors.taiKhoan : ""}
        </div>
        <Input.Password
          name="matKhau"
          size="large"
          placeholder={t("signup_password")}
          // type="password"
          prefix={<LockOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.matKhau}
          autoComplete="on"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.matKhau ? errors.matKhau : ""}
        </div>
        <Input
          name="hoTen"
          size="large"
          placeholder={t("profile_fullname")}
          type="text"
          prefix={<UserOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.hoTen}
          autoComplete="on"
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.hoTen ? errors.hoTen : ""}
        </div>

        <Input
          name="email"
          size="large"
          placeholder={t("profile_email")}
          type="email"
          prefix={<MailOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          autoComplete="on"
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.email ? errors.email : ""}
        </div>

        <Input
          name="soDt"
          size="large"
          placeholder={t("profile_soDt")}
          type="text"
          prefix={<PhoneOutlined className="mr-3" />}
          className="mt-3 w-50"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.soDt}
          autoComplete="on"
        />
        <div className="text-danger mt-1 text-left w-50">
          {touched.soDt ? errors.soDt : ""}
        </div>

        <Button
          type="primary"
          className="mt-4 w-50 btnSignIn"
          onClick={handleSubmit}
        >
          {t("signup")}
        </Button>
        <p className="text-left mt-5 w-50">
          {t("signup_already_have_an_account")}?{" "}
          <NavLink to="/signin">{t("signin")}</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
