import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { localStorageKeys } from "../../Util/constants/systemConstant";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserLoginThunk,
  updateUserThunk,
} from "../../Redux/Thunks/userThunk";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Tag, Table } from "antd";
import * as dayjs from "dayjs";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  soDt: yup
    .string()
    .required("Please enter your phone number")
    .typeError("Please enter a valid number"),
  hoTen: yup.string().required("Please enter your name"),
});

const Profile = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorPasswordForm, setErrorPasswordForm] = useState("");

  const handleChangePassword = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    if (!token) {
      props.history.push("/signin");
    }
    dispatch(getUserLoginThunk);
  }, [dispatch, props.history]);

  const userLogin = useSelector((state) => state.userReducer.userLogin);

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (currentPassword !== userLogin.matKhau) {
      setErrorPasswordForm(
        "Your current password is incorrect. Please try again"
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorPasswordForm(
        "Your password and confirmation do not match. Please try again"
      );
      return;
    }
    if (newPassword === "") {
      setErrorPasswordForm("Your password cannot be empty.");
      return;
    }
    const newUserInfo = {
      ...userLogin,
      matKhau: newPassword,
      maLoaiNguoiDung: "QuanTri",
    };
    dispatch(updateUserThunk(newUserInfo));
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hoTen: userLogin?.hoTen,
      email: userLogin?.email,
      soDt: userLogin?.soDT,
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const setAllTouched = useCallback(() => {
    Object.keys(formik.values).forEach((key) => {
      formik.setFieldTouched(key);
    });
  }, [formik]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllTouched();
    if (formik.isValid) {
      const { hoTen, soDt, email } = formik.values;
      const newInfo = {
        ...userLogin,
        hoTen,
        soDt,
        email,
        maLoaiNguoiDung: "QuanTri",
      };
      console.log(newInfo);
      dispatch(updateUserThunk(newInfo));
    }
  };

  const columns = [
    {
      title: t("profile_film_name"),
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: t("profile_book_date"),
      render: (text, record, index) => {
        return dayjs(record.ngayDat).format("DD/MM/YYYY");
      },
    },
    {
      title: t("profile_cinema"),
      render: (text, record, index) => {
        return (
          <span>
            {record.danhSachGhe[0]?.tenHeThongRap} - Cinema{" "}
            {record.danhSachGhe[0]?.tenCumRap.split(" ")[1]}{" "}
          </span>
        );
      },
    },
    {
      title: t("profile_seats"),
      render: (text, record, index) => {
        return record.danhSachGhe?.map((seat) => {
          return <Tag color="cyan">{seat.tenGhe}</Tag>;
        });
      },
    },
  ];

  return (
    <div>
      <section id="new-in" className="container">
        <div id="time">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#profileinfo"
              >
                {t("profile_account_info")}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#profileticket">
                {t("profile_purchase_history")}
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#profile_change_password"
              >
                {t("profile_change_password")}
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          <div className="tab-pane container active" id="profileinfo">
            <div id="dangchieu">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div className="form-group">
                      <p>{t("profile_username")}</p>
                      <input
                        className="form-control"
                        disabled
                        value={userLogin?.taiKhoan}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="form-group">
                      <p>{t("profile_fullname")}</p>
                      <input
                        className="form-control"
                        name="hoTen"
                        value={formik.values.hoTen}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="text-danger mt-1 text-left w-50">
                      {formik.touched.hoTen ? formik.errors.hoTen : ""}
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mt-2">
                    <div className="form-group">
                      <p>{t("profile_email")}</p>
                      <input
                        name="email"
                        className="form-control"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="text-danger mt-1 text-left w-50">
                        {formik.touched.email ? formik.errors.email : ""}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mt-2">
                    <div className="form-group">
                      <p>{t("profile_soDt")}</p>
                      <input
                        name="soDt"
                        className="form-control"
                        value={formik.values.soDt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="text-danger mt-1 text-left w-50">
                        {formik.touched.soDt ? formik.errors.soDt : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-success">
                    {t("profile_save_info")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="tab-pane container" id="profileticket">
            <Table
              dataSource={userLogin?.thongTinDatVe}
              columns={columns}
              rowKey={"maVe"}
            />
          </div>
          <div className="tab-pane container" id="profile_change_password">
            <form className="row mt-2">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <p>{t("profile_current_password")}</p>
                  <Input.Password
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    autoComplete="on"
                    value={passwordForm.currentPassword}
                    onChange={handleChangePassword}
                  />
                </div>
                <div className="form-group">
                  <p>{t("profile_new_password")}</p>
                  <Input.Password
                    type="password"
                    className="form-control"
                    name="newPassword"
                    autoComplete="on"
                    value={passwordForm.newPassword}
                    onChange={handleChangePassword}
                  />
                </div>
                <div className="form-group">
                  <p>{t("profile_confirm_password")}</p>
                  <Input.Password
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    autoComplete="on"
                    onChange={handleChangePassword}
                  />
                </div>
                <p className="text-danger">{errorPasswordForm}</p>
                <button
                  className="btn btn-success"
                  onClick={handleSubmitPassword}
                >
                  {t("profile_change_password")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
