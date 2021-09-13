import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import { useFormik } from "formik";
import { getCinemaListThunk } from "../../Redux/Thunks/cinemaThunk";
import { useTranslation } from "react-i18next";

const renderDates = () => {
  const now = dayjs();

  const rows = [];
  for (let i = 0; i < 7; i++) {
    let newDay = now.add(i, "day");
    let day = newDay.date();
    let month = newDay.month() + 1;
    let year = newDay.year();
    rows.push(
      <option value={newDay} key={day}>
        {day}/{month}/{year}
      </option>
    );
  }
  return rows;
};

const HomeDatVe = () => {
  const dispatch = useDispatch();
  const filmList = useSelector((state) => state.filmReducer.filmList);
  const { cinemaSystemList, cinemaList } = useSelector(
    (state) => state.cinemaReducer
  );
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      maPhim: "disabled",
      ngayChieuGioChieu: "disabled",
      maCumRap: "disabled",
    },
  });

  const handleSubmit = useCallback(() => {}, [formik]);

  return (
    <div>
      <section id="buy__tickets">
        <h3 className="text-center">{t("book_ticket_now")}</h3>
        <form className="container">
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                formik.setFieldValue("maPhim", e.target.value);
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_film")}
              </option>
              {filmList.map((film) => {
                return (
                  <option value={film.maPhim} key={film.maPhim}>
                    {film.tenPhim}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                formik.setFieldValue("ngayChieuGioChieu", e.target.value);
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_date")}
              </option>
              {renderDates()}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                dispatch(getCinemaListThunk(e.target.value));
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_cinema_system")}
              </option>
              {cinemaSystemList.map((cinemaSystem) => {
                return (
                  <option
                    value={cinemaSystem.maHeThongRap}
                    key={cinemaSystem.maHeThongRap}
                  >
                    {cinemaSystem.tenHeThongRap}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                formik.setFieldValue("maCumRap", e.target.value);
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_cinema")}
              </option>
              {cinemaList.map((cinema) => {
                return (
                  <option value={cinema.maCumRap} key={cinema.maCumRap}>
                    {cinema.tenCumRap}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className="text-center buy__tickets__btn">
          <button className="btn" onClick={handleSubmit}>
            {t("book_tickets")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeDatVe;
