import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as dayjs from "dayjs";
import { useFormik } from "formik";
import { getCinemaListThunk } from "../../Redux/Thunks/cinemaThunk";
import { useTranslation } from "react-i18next";
import { getFilmScheduleThunk } from "../../Redux/Thunks/filmThunk";
import { actionTypes } from "../../Redux/Constants/actionTypes";
import { localStorageKeys } from "../../Util/constants/systemConstant";

const formatNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const renderDates = () => {
  const now = dayjs();

  const rows = [];
  for (let i = 0; i < 7; i++) {
    let newDay = now.add(i, "day");
    let day = newDay.date();
    let month = newDay.month() + 1;
    let year = newDay.year();
    rows.push(
      <option value={`${day}:${month}`} key={day}>
        {day}/{month}/{year}
      </option>
    );
  }
  return rows;
};

const HomeDatVe = (props) => {
  const dispatch = useDispatch();
  const { filmList, filmSchedule } = useSelector((state) => state.filmReducer);
  const { cinemaSystemList, cinemaList } = useSelector(
    (state) => state.cinemaReducer
  );
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      maHeThongRap: "disabled",
      maPhim: "disabled",
      ngayChieu: "disabled",
      maCumRap: "disabled",
      gioChieu: "disabled",
    },
  });

  const fetchSchedule = useCallback(() => {
    const { maHeThongRap, maPhim, ngayChieu, maCumRap, gioChieu } =
      formik.values;
    if (
      maPhim === "disabled" ||
      ngayChieu === "disabled" ||
      maCumRap === "disabled" ||
      maHeThongRap === "disabled"
    ) {
      return [];
    }

    return filmSchedule.heThongRapChieu
      ?.filter((cinemaSystem) => cinemaSystem.maHeThongRap === maHeThongRap)[0]
      .cumRapChieu?.map((cumRap) => {
        if (cumRap.maCumRap === maCumRap) {
          return cumRap?.lichChieuPhim
            .filter((lichChieu) => {
              const [ngayChieuDate, ngayChieuMonth] = ngayChieu.split(":");
              const lichChieuDate = dayjs(lichChieu.ngayChieuGioChieu);
              return (
                parseInt(ngayChieuDate) === lichChieuDate.date() &&
                parseInt(ngayChieuMonth) === lichChieuDate.month() + 1
              );
            })
            .map((item, index) => {
              const schedule = dayjs(item.ngayChieuGioChieu);
              return (
                <option value={JSON.stringify(item)} key={index}>
                  {`
                  ${formatNumber(schedule.hour())}:
                  ${formatNumber(schedule.minute())}
                `}
                </option>
              );
            });
        }
      });
  }, [formik, filmSchedule]);

  const handleSubmit = useCallback(() => {
    const { maHeThongRap, maPhim, ngayChieu, maCumRap, gioChieu } =
      formik.values;
    if (
      maPhim === "disabled" ||
      ngayChieu === "disabled" ||
      maCumRap === "disabled" ||
      maHeThongRap === "disabled" ||
      gioChieu === "disabled"
    ) {
      alert(t("alert_book_ticket"));
      return;
    }
    // dispatch({
    //   type: actionTypes.BOOK_TICKET,
    //   payload: {
    //     lichChieu: gioChieu,
    //     maCumRap: maCumRap,
    //     maPhim: maPhim,
    //   },
    // });
    localStorage.setItem(localStorageKeys.TICKET_DETAIL, gioChieu);
    const maLichChieu = JSON.parse(gioChieu).maLichChieu;
    props.history.push(`/datve/${maLichChieu}`);
  }, [formik]);

  return (
    <div>
      <section id="buy__tickets">
        <h3 className="text-center">{t("book_ticket_now")}</h3>
        <form className="container">
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                dispatch(getFilmScheduleThunk(e.target.value));
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
                formik.setFieldValue("ngayChieu", e.target.value);
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
                formik.setFieldValue("maHeThongRap", e.target.value);
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
          <div className="form-group">
            <select
              className="form-control"
              onChange={(e) => {
                formik.setFieldValue("gioChieu", e.target.value);
              }}
            >
              <option disabled selected value="disabled">
                {t("choose_time")}
              </option>
              {fetchSchedule()}
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
