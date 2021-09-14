import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCinemaSystemThunk } from "../../Redux/Thunks/cinemaThunk";
import {
  getFilmDetailThunk,
  getFilmScheduleThunk,
} from "../../Redux/Thunks/filmThunk";
import "./Detail.css";
import * as dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { actionTypes } from "../../Redux/Constants/actionTypes";
import { localStorageKeys } from "../../Util/constants/systemConstant";

const printDate = (dateString) => {
  if (!dateString) return "TBD";
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const mapWeekDayToId = (weekday) => {
  switch (weekday) {
    case 0:
      return "sun";
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    case 5:
      return "fri";
    default:
      return "sat";
  }
};

const getChosenDate = (list) => {
  return list.find((item) => item.active);
};

const formatNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};

const Detail = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getFilmDetailThunk(props.match.params.id));
    dispatch(getCinemaSystemThunk);
    dispatch(getFilmScheduleThunk(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const { filmDetail, filmSchedule } = useSelector(
    (state) => state.filmReducer
  );
  const cinemaSystemList = useSelector(
    (state) => state.cinemaReducer.cinemaSystemList
  );

  const mapWeekDayToName = (weekday) => {
    switch (weekday) {
      case 0:
        return t("sunday").toUpperCase();
      case 1:
        return t("monday").toUpperCase();
      case 2:
        return t("tuesday").toUpperCase();
      case 3:
        return t("wednesday").toUpperCase();
      case 4:
        return t("thursday").toUpperCase();
      case 5:
        return t("friday").toUpperCase();
      default:
        return t("saturday").toUpperCase();
    }
  };

  const getToday = () => {
    const dates = [];
    const today = dayjs();

    for (let i = 0; i < 7; i++) {
      let newDay = today.add(i, "day");
      dates.push({
        id: mapWeekDayToId(newDay.day()),
        name: mapWeekDayToName(newDay.day()),
        active: false,
        date: newDay,
      });
    }

    dates[0].active = true;
    return dates;
  };

  // Hệ thống rạp
  const [system, setSystem] = useState("");
  const [date, setDate] = useState(getToday());

  useEffect(() => {
    if (cinemaSystemList.length > 0) {
      setSystem(cinemaSystemList[0].maHeThongRap);
    }
  }, [cinemaSystemList]);

  return (
    <div>
      <section id="detail">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 detail__left">
              <img src={filmDetail.hinhAnh} alt="film" />
            </div>
            <div className="col-12 col-sm-6 col-md-8 detail__right">
              <h2 className="detail__right__title">{filmDetail.tenPhim}</h2>
              <p className="detail__right__rating">
                <i className="fas fa-star"></i> <b>{filmDetail.danhGia}</b> / 10
              </p>
              <p className="detail__right__dates">
                {t("in_cinema")}:{" "}
                <b>
                  {filmDetail.ngayKhoiChieu &&
                    printDate(filmDetail.ngayKhoiChieu)}
                </b>
              </p>
              <div className="detail__right__description">
                <p className="description__title">{t("description")}</p>
                <p>{filmDetail.moTa}</p>
              </div>

              <div className="detail__right__button">
                <button className="btn btn__trailer">
                  <a href={filmDetail.trailer} target="_blank" rel="noreferrer">
                    {t("watch_trailer")}
                  </a>
                </button>
                <button className="btn btn__buy">{t("book_tickets")}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-1 d-flex flex-column" style={{ paddingTop: 50 }}>
            {cinemaSystemList.map((cinemaSystem) => {
              return (
                <img
                  src={cinemaSystem.logo}
                  style={{
                    cursor: "pointer",
                    opacity: system === cinemaSystem.maHeThongRap ? 1 : 0.3,
                    border:
                      system === cinemaSystem.maHeThongRap
                        ? "2px solid black"
                        : "none",
                  }}
                  alt="cinema"
                  width="100"
                  className="d-block mb-2"
                  onClick={() => {
                    setSystem(cinemaSystem.maHeThongRap);
                  }}
                ></img>
              );
            })}
          </div>
          <div className="col-9">
            <section id="time" className="mt-5">
              <ul
                className="navs"
                style={{ borderBottom: "1px solid #dee2e6" }}
              >
                {date.map((weekday, index) => {
                  return (
                    <li
                      className="nav-item"
                      onClick={() => {
                        const newDate = [...date];

                        for (let i = 0; i < 7; i++) {
                          if (i === index) {
                            newDate[i].active = true;
                          } else {
                            newDate[i].active = false;
                          }
                        }
                        setDate(newDate);
                      }}
                    >
                      <a
                        className={`nav-link text-center ${
                          weekday.active ? "active" : ""
                        }`}
                        // data-toggle="tab"
                      >
                        {weekday.name} <br />
                        {`${weekday.date.date()}/${weekday.date.month() + 1}`}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-contents">
                <div className="tab-pane container active" id="mon">
                  <div className="container">
                    {filmSchedule.heThongRapChieu
                      ?.filter(
                        (cinemaSystem) => cinemaSystem.maHeThongRap === system
                      )[0]
                      ?.cumRapChieu?.map((cumRap) => {
                        return (
                          <div className="row">
                            <div className="col-sm-2 time__item__left">
                              <img
                                src={
                                  cinemaSystemList.filter(
                                    (cinemaSystem) =>
                                      cinemaSystem.maHeThongRap === system
                                  )[0].logo
                                }
                                alt="Film"
                              />
                            </div>
                            <div className="col-sm-10 time__item__right">
                              <h2>{cumRap.tenCumRap}</h2>
                              <h6>{cumRap.diaChi}</h6>
                              <br />
                              <h5 className="mt-2">
                                <div className="text__left">
                                  <i className="far fa-clock" />
                                  {t("time").toUpperCase()} &nbsp;
                                  {cumRap.lichChieuPhim
                                    .filter((lichChieu) => {
                                      const today = getChosenDate(date).date;
                                      const lichChieuDate = dayjs(
                                        lichChieu.ngayChieuGioChieu
                                      );

                                      return (
                                        today.date() === lichChieuDate.date() &&
                                        today.month() === lichChieuDate.month()
                                      );
                                    })
                                    .map((item) => {
                                      return (
                                        <span
                                          className="time-yes"
                                          onClick={() => {
                                            dispatch({
                                              type: actionTypes.BOOK_TICKET,
                                              payload: {
                                                lichChieu: JSON.stringify(item),
                                                maCumRap: cumRap.maCumRap,
                                              },
                                            });
                                            localStorage.setItem(
                                              localStorageKeys.TICKET_DETAIL,
                                              JSON.stringify(item)
                                            );
                                            props.history.push("/datve");
                                          }}
                                        >
                                          {`${formatNumber(
                                            dayjs(item.ngayChieuGioChieu).hour()
                                          )}:${formatNumber(
                                            dayjs(
                                              item.ngayChieuGioChieu
                                            ).minute()
                                          )}`}
                                        </span>
                                      );
                                    })}
                                </div>
                                <div className="text__right">
                                  <p>
                                    120 {t("minutes").toUpperCase()}
                                    <span>PG</span>
                                  </p>
                                </div>
                                <div style={{ clear: "both" }} />
                              </h5>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
