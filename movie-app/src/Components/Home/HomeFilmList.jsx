import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { useTranslation } from "react-i18next";

const printDate = (dateString) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
};

const renderStars = (numStars) => {
  let rows = [];
  let rating = parseInt(Number(numStars) / 2);
  if (rating > 5) rating = 5;
  for (let i = 0; i < rating; i++) {
    rows.push(<i className="fas fa-star active" key={i} />);
  }
  if (rating < 5) {
    for (let i = rating; i < 5; i++) {
      rows.push(<i className="fas fa-star" key={i} />);
    }
  }
  return rows;
};

const HomeFilmList = (props) => {
  const filmList = useSelector((state) => state.filmReducer.filmList);
  const { t } = useTranslation();

  return (
    <section id="new-in" className="container">
      <div id="time">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#dangchieu">
              {t("now_showing")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#sapchieu">
              {t("coming_soon")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#hot">
              {t("hot")}
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        <div className="tab-pane container active" id="dangchieu">
          <div className="row listMovie" id="dangchieu">
            {filmList
              .filter((film) => film.dangChieu)
              .map((film, index) => {
                if (index > 7) return <div key={index}></div>;
                return (
                  <div className="col-sm-3 mb-4" key={film.maPhim}>
                    <div
                      className="movie__content"
                      style={{ backgroundImage: `url(${film.hinhAnh})` }}
                    >
                      <div className="movie__hover">
                        <a
                          className="venobox btn btn-trailer"
                          data-vbtype="video"
                          href={film.trailer}
                        >
                          <i className="fas fa-play" />
                        </a>
                        <h2
                          onClick={() => {
                            props.history.push(`/detail/${film.maPhim}`);
                          }}
                        >
                          {t("book_tickets")}
                        </h2>
                        <p>
                          {t("in_cinema")}: {printDate(film.ngayKhoiChieu)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>{film.tenPhim}</h3>
                      <div className="rating">{renderStars(film.danhGia)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="tab-pane container" id="sapchieu">
          <div className="row listMovie" id="sapchieu">
            {filmList
              .filter((film) => film.sapChieu)
              .map((film, index) => {
                if (index > 7) return <div key={index}></div>;
                return (
                  <div className="col-sm-3 mb-4" key={film.maPhim}>
                    <div
                      className="movie__content"
                      style={{ backgroundImage: `url(${film.hinhAnh})` }}
                    >
                      <div className="movie__hover">
                        <a
                          className="venobox btn btn-trailer"
                          data-vbtype="video"
                          href={film.trailer}
                        >
                          <i className="fas fa-play" />
                        </a>
                        <h2
                          onClick={() => {
                            props.history.push(`/detail/${film.maPhim}`);
                          }}
                        >
                          {t("book_tickets")}
                        </h2>
                        <p>
                          {t("in_cinema")}: {printDate(film.ngayKhoiChieu)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>{film.tenPhim}</h3>
                      <div className="rating">{renderStars(film.danhGia)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="tab-pane container" id="hot">
          <div className="row listMovie" id="hot">
            {filmList
              .filter((film) => film.hot)
              .map((film, index) => {
                if (index > 7) return <div key={index}></div>;
                return (
                  <div className="col-sm-3 mb-4" key={film.maPhim}>
                    <div
                      className="movie__content"
                      style={{ backgroundImage: `url(${film.hinhAnh})` }}
                    >
                      <div className="movie__hover">
                        <a
                          className="venobox btn btn-trailer"
                          data-vbtype="video"
                          href={film.trailer}
                        >
                          <i className="fas fa-play" />
                        </a>
                        <h2
                          onClick={() => {
                            props.history.push(`/detail/${film.maPhim}`);
                          }}
                        >
                          {t("book_tickets")}
                        </h2>
                        <p>
                          {t("in_cinema")}: {printDate(film.ngayKhoiChieu)}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>{film.tenPhim}</h3>
                      <div className="rating">{renderStars(film.danhGia)}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="text-right">
        <button id="btnXemThem" onClick={() => props.history.push("/film")}>
          {t("view_more")} &nbsp; <b>→</b>
        </button>
      </div>
    </section>
  );
};

export default withRouter(HomeFilmList);
