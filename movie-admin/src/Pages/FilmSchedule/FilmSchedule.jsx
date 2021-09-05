import {
  Breadcrumb,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Space,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { useFormik } from "formik";
import * as dayjs from "dayjs";

const { Option } = Select;

const FilmSchedule = (props) => {
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_FILM_DETAIL_SAGA,
      filmId: props.match.params.id,
    });

    dispatch({
      type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    });
  }, [dispatch, props.match.params.id]);

  const filmDetail = useSelector((state) => state.filmReducer.filmDetail);
  const { cinemaSystemList, cinemaList } = useSelector(
    (state) => state.cinemaReducer
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maCumRap: "",
      // maRap: "",
      ngayChieu: "",
      gioChieu: "",
      maPhim: props.match.params.id,
      giaVe: "",
    },
  });

  // const renderSubCinema = useCallback(() => {
  //   const subCinemaList = cinemaList.filter(
  //     (cinema) => cinema.maCumRap === formik.values.maCumRap
  //   )[0];

  //   if (subCinemaList) {
  //     return subCinemaList.danhSachRap.map((subCinema) => {
  //       return (
  //         <Option value={subCinema.maRap} key={subCinema.maRap}>
  //           {subCinema.tenRap}
  //         </Option>
  //       );
  //     });
  //   }

  //   return <></>;
  // }, [formik]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { ngayChieu, gioChieu, giaVe, maPhim, maCumRap } = formik.values;
      if (
        maCumRap === "" ||
        ngayChieu === "Invalid Date" ||
        ngayChieu === "" ||
        gioChieu === "" ||
        giaVe === ""
      ) {
        setFormError("Vui lòng nhập dữ liệu đầy đủ và hợp lệ");
        return;
      }
      setFormError("");
      const submittingValues = {
        maRap: maCumRap,
        maPhim: maPhim,
        ngayChieuGioChieu: `${ngayChieu} ${gioChieu}`,
        giaVe: giaVe,
      };
      dispatch({
        type: sagaTypes.CREATE_SCHEDULE_SAGA,
        payload: submittingValues,
      });
    },
    [formik, dispatch]
  );

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/film">Quản lý phim</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thêm lịch chiếu</Breadcrumb.Item>
      </Breadcrumb>

      <div className="row mt-3">
        <div className="col-12 col-md-8">
          <h3 className="mb-5">Phim: {filmDetail.tenPhim}</h3>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item label="Hệ thống rạp">
              <Select
                placeholder="Chọn hệ thống rạp"
                showSearch
                onChange={(value) => {
                  dispatch({
                    type: sagaTypes.GET_CINEMA_LIST_SAGA,
                    payload: value,
                  });
                  formik.setFieldValue("maCumRap", "");
                }}
              >
                {cinemaSystemList.map((cinemaSystemList) => {
                  return (
                    <Option
                      value={cinemaSystemList.maHeThongRap}
                      key={cinemaSystemList.maHeThongRap}
                    >
                      {cinemaSystemList.tenHeThongRap}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Cụm rạp">
              <Select
                placeholder="Chọn cụm rạp"
                value={formik.values.maCumRap}
                onChange={(value) => {
                  formik.setFieldValue("maCumRap", value);
                  // formik.setFieldValue("maRap", "");
                }}
              >
                {cinemaList.map((cinemaList) => {
                  return (
                    <Option
                      value={cinemaList.maCumRap}
                      key={cinemaList.maCumRap}
                    >
                      {cinemaList.tenCumRap}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            {/* <Form.Item label="Rạp">
              <Select
                placeholder="Chọn rạp"
                value={formik.values.maRap}
                onChange={(value) => {
                  formik.setFieldValue("maRap", value);
                }}
              >
                {renderSubCinema()}
              </Select>
            </Form.Item> */}

            <Form.Item label="Lịch chiếu">
              <Space>
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày chiếu"
                  onChange={(value) => {
                    formik.setFieldValue(
                      "ngayChieu",
                      dayjs(value).format("DD/MM/YYYY")
                    );
                  }}
                />

                <TimePicker
                  placeholder="Chọn giờ chiếu"
                  onChange={(value) => {
                    formik.setFieldValue(
                      "gioChieu",
                      dayjs(value).format("hh:mm:ss")
                    );
                  }}
                ></TimePicker>
              </Space>
            </Form.Item>

            <Form.Item label="Giá vé">
              <Input
                placeholder="Nhập giá vé"
                name="giaVe"
                onChange={formik.handleChange}
              />
              <p className="text-danger">
                {isNaN(Number(formik.values.giaVe)) ? "Vui lòng nhập số" : ""}
              </p>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Tạo lịch chiếu
              </Button>
              <p className="text-danger">{formError}</p>
            </Form.Item>
          </Form>
        </div>
        <div className="col-12 col-md-4">
          <img
            style={{ width: "100%", height: "auto" }}
            src={filmDetail.hinhAnh}
            alt="Hình ảnh phim"
          />
        </div>
      </div>
    </div>
  );
};

export default FilmSchedule;
