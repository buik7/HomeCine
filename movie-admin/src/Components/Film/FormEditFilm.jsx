import { Switch } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { actionTypes } from "../../Redux/constants/actionTypes";
import * as dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";

const validationSchema = yup.object().shape({
  maPhim: yup
    .number()
    .typeError("Vui lòng nhập mã phim là một số")
    .required("Vui lòng nhập mã phim"),
  tenPhim: yup.string().required("Vui lòng nhập tên phim"),
  trailer: yup
    .string()
    .required("Vui lòng nhập đường dẫn trailer của phim")
    .url("Vui lòng nhập đường dẫn đúng định dạng"),
  moTa: yup.string().required("Vui lòng nhập mô tả"),
  ngayKhoiChieu: yup.date().required("Vui lòng nhập ngày"),
  danhGia: yup
    .number()
    .typeError("Vui lòng nhập đánh giá là một số")
    .required("Vui lòng nhập đánh giá")
    .positive()
    .max(10),
});

const FormEditFilm = () => {
  const dispatch = useDispatch();

  const filmDetail = useSelector((state) => state.filmReducer.filmDetail);

  const formik = useFormik({
    initialValues: {
      maPhim: "",
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: "",
      hinhAnh: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    formik.setValues(filmDetail);
  }, [filmDetail]);

  const editorRef = useRef(null);

  const handleSubmit = () => {
    if (formik.isValid) {
      const submittingValues = {
        ...formik.values,
        ngayKhoiChieu: dayjs(formik.values.ngayKhoiChieu).format("DD/MM/YYYY"),
      };

      const formData = new FormData();
      for (let key in submittingValues) {
        formData.append(key, submittingValues[key]);
      }

      dispatch({
        type: sagaTypes.EDIT_FILM_SAGA,
        filmInfo: formData,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_HANDLE_OK_MODAL,
      payload: handleSubmit,
    });
  }, [formik]);

  return (
    <form>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <p>Mã phim</p>
            <input
              name="maPhim"
              className="form-control"
              value={formik.values.maPhim}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.maPhim ? formik.errors.maPhim : ""}
            </p>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <p>Ngày khởi chiếu</p>
            <input
              type="date"
              className="form-control"
              name="ngayKhoiChieu"
              value={formik.values.ngayKhoiChieu?.slice(0, 10)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="text-danger">
              {formik.touched.ngayKhoiChieu ? formik.errors.ngayKhoiChieu : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="form-group">
        <p>Tên phim</p>
        <input
          name="tenPhim"
          className="form-control"
          value={formik.values.tenPhim}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="text-danger">
          {formik.touched.tenPhim ? formik.errors.tenPhim : ""}
        </p>
      </div>
      <div className="form-group">
        <p>Trailer URL</p>
        <input
          name="trailer"
          className="form-control"
          value={formik.values.trailer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="text-danger">
          {formik.touched.trailer ? formik.errors.trailer : ""}
        </p>
      </div>

      <div className="form-group">
        <p>Mô tả</p>
        <Editor
          name="moTa"
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={(e) => {
            formik.handleChange({
              target: { name: "moTa", value: e },
            });
          }}
          initialValue={filmDetail.moTa}
          init={{
            height: 300,
            menubar: false,

            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
          }}
        />
      </div>

      <div className="row">
        <div className="col-6">
          <p>
            Sắp chiếu: &nbsp;
            <Switch
              name="sapChieu"
              checked={formik.values.sapChieu}
              onChange={(value) => {
                formik.setFieldValue("sapChieu", value);
              }}
            />
          </p>
          <p>
            Đang chiếu: &nbsp;
            <Switch
              name="dangChieu"
              checked={formik.values.dangChieu}
              onChange={(value) => {
                formik.setFieldValue("dangChieu", value);
              }}
            />
          </p>
          <p>
            Phim hot: &nbsp;
            <Switch
              name="hot"
              checked={formik.values.hot}
              onChange={(value) => {
                formik.setFieldValue("hot", value);
              }}
            ></Switch>
          </p>
        </div>
        <div className="col-6">
          <p>Đánh giá trên thang 10</p>
          <input
            name="danhGia"
            className="form-control"
            value={formik.values.danhGia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            Hình ảnh: &nbsp;
            <img src={formik.values.hinhAnh} alt="" width="100" height="100" />
          </div>
          <div className="col-6">
            <p>
              Chỉnh sửa hình ảnh: <br />
              <input
                type="file"
                name="hinhAnh"
                onChange={(e) => {
                  formik.setFieldValue("hinhAnh", e.target.files[0]);
                  console.log(formik.values.hinhAnh);
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormEditFilm;
