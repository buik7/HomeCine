import { Checkbox, Result } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PDF from "react-to-pdf";
import {
  bookSeatThunk,
  bookTicketThunk,
  getTicketDetailThunk,
} from "../../Redux/Thunks/ticketThunk";
import { UserOutlined } from "@ant-design/icons";
import "./DatVe.css";
import { actionTypes } from "../../Redux/Constants/actionTypes";
import { openNotification } from "./../../Util/Notification/Notification";
import dayjs from "dayjs";
import { connection } from "../..";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const DatVe = (props) => {
  const ref = React.createRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userLogin } = useSelector((state) => state.userReducer);
  const [page1, setPage1] = useState(true);
  const taiKhoan = localStorage.getItem("TAI_KHOAN");

  const { lichChieu, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(
    (state) => state.ticketReducer
  );
  const { thongTinPhim, danhSachGhe } = lichChieu;
  useEffect(() => {
    dispatch(getTicketDetailThunk(props.match.params.id));

    connection.on("datVeThanhCong", () => {
      dispatch(getTicketDetailThunk(props.match.params.id));
    });

    connection.invoke("loadDanhSachGhe", props.match.params.id);

    // Load seat list from server
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);
      //Bước 1: Loại mình ra khỏi danh sách
      // console.log(userLogin);
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== taiKhoan
      );
      //Bước 2 gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung

      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);

        return [...result, ...arrGhe];
      }, []);

      //Đưa dữ liệu ghế khách đặt cập nhật redux
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      //Đưa dữ liệu ghế khách đặt về redux
      dispatch({
        type: actionTypes.BOOK_SEAT,
        payload: arrGheKhachDat,
      });
    });

    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, []);

  const clearGhe = function (event) {
    connection.invoke("huyDat", taiKhoan, props.match.params.id);
  };

  const renderSeats = () => {
    if (!danhSachGhe) return <></>;
    return danhSachGhe.map((seat, index) => {
      let classGheVip = seat.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = seat.daDat ? "gheDaDat" : "";
      let classGheDangDat = "";
      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (ghe) => ghe.maGhe === seat.maGhe
      );
      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }

      let classGheDaDuocDat = "";
      if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      let classGheKhachDat = "";
      let indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (ghe) => ghe.maGhe === seat.maGhe
      );
      if (indexGheKhachDat !== -1) {
        classGheKhachDat = "gheKhachDat";
      }
      if (seat.daDat) {
        classGheKhachDat = "";
      }

      return (
        <Fragment key={index}>
          <button
            disabled={seat.daDat || classGheKhachDat !== ""}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDat}`}
            onClick={() => {
              const action = bookSeatThunk(seat, props.match.params.id);
              dispatch(action);
            }}
          >
            {seat.daDat ? <UserOutlined className="mb-1" /> : seat.stt}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div>
      {page1 ? (
        <div
          style={{
            height: "100%",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-9 mt-3">
                <div className="mx-auto" style={{ width: "80%" }}>
                  <div className="bg-dark w-100">&nbsp;</div>
                  <div className="trapezoid mx-auto text-center">
                    <h3 className="font-weight-bold p-1">
                      {t("datve_screen")}
                    </h3>
                  </div>
                  <div className="p-3 ml-4">{renderSeats()}</div>
                </div>
                <div className="mx-auto text-center" style={{ width: "80%" }}>
                  <div className="row">
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe">01</button>
                      <p>{t("datve_available")}</p>
                    </div>
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe gheVip">01</button>
                      <p>VIP</p>
                    </div>
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe gheDangDat"></button>
                      <p>{t("datve_selected_by_me")}</p>
                    </div>
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe gheDaDat">
                        <UserOutlined />
                      </button>
                      <button className="ghe gheVip gheDaDat">
                        <UserOutlined />
                      </button>
                      <p>{t("datve_booked")}</p>
                    </div>
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe gheDaDuocDat">
                        <UserOutlined />
                      </button>
                      <p>{t("datve_booked_by_me")}</p>
                    </div>
                    <div className="col-6 col-md-2 mx-auto">
                      <button className="ghe gheKhachDat">
                        {/* <UserOutlined /> */}
                      </button>
                      <p>{t("datve_currently_selected_by_others")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-3 shadow-lg p-3 bg-white rounded"
                style={{
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="top">
                  <h4 className="text-center" style={{ color: "green" }}>
                    {t("datve_film")}: {thongTinPhim?.tenPhim}
                  </h4>
                  <hr />
                  <h6>{thongTinPhim?.tenCumRap}</h6>
                  <h6>
                    {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu} -
                    {t("datve_cinema")} {thongTinPhim?.tenRap.split(" ")[1]}
                  </h6>
                  <hr />
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <h5 style={{ color: "red" }}>
                        {t("datve_booked_seats")}
                      </h5>
                    </div>
                    <div>
                      <span
                        className="font-weight-bold"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                          return (tongTien += ghe.giaVe);
                        }, 0)}{" "}
                        VND
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    {danhSachGheDangDat
                      .sort((item2, item1) => {
                        if (item2.loaiGhe > item1.loaiGhe) {
                          return -1;
                        } else if (item2.loaiGhe < item1.loaiGhe) {
                          return 1;
                        } else {
                          return parseInt(item2.stt) > parseInt(item1.stt)
                            ? 1
                            : -1;
                        }
                      })
                      .map((seat) => {
                        let classSeat =
                          seat.loaiGhe === "Thuong" ? "seatThuong" : "seatVip";
                        return (
                          <div
                            className="d-flex justify-content-between"
                            key={seat.maGhe}
                          >
                            <div className={classSeat}>{seat.stt}</div>
                            <div>{seat.giaVe} VND</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="bottom">
                  <div className="container-fluid" style={{ padding: 0 }}>
                    <p>
                      {t("datve_eticket_first")}&nbsp;
                      <b>{userLogin?.email}</b> {t("datve_eticket_second")}.
                    </p>
                    <p>
                      <Checkbox /> &nbsp; {t("datve_send_sms")} (
                      {userLogin?.soDT})
                    </p>
                    <button
                      style={{ width: "100%" }}
                      className="btn btn-success"
                      onClick={() => {
                        const ticketData = {
                          maLichChieu: props.match.params.id,
                          danhSachVe: danhSachGheDangDat,
                        };
                        if (danhSachGheDangDat.length === 0) {
                          openNotification(
                            "error",
                            "Booking error",
                            "Please choose a seat!"
                          );
                          return;
                        }
                        dispatch(bookTicketThunk(ticketData));
                        setPage1(false);
                      }}
                    >
                      {t("datve_purchase")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img
            src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/530/5882468530_85690e2b-cad3-4b22-af20-b5ded179944f.png?cb=1629727349"
            style={{ position: "fixed", left: 10 }}
          />
          <Result
            status="success"
            title={t("datve_success_msg")}
            subTitle={t("datve_ticket")}
          />
          <hr />
          <div className="mx-auto" style={{ width: "40%" }} ref={ref}>
            <h3 className="text-center">{t("datve_ticket_summary")}</h3>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_fullname")}</div>
              <div>{userLogin?.hoTen}</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_film")}</div>
              <div>{thongTinPhim?.tenPhim}</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_cinema")}</div>
              <div>
                {thongTinPhim?.tenCumRap} - {t("datve_cinema")}{" "}
                {thongTinPhim.tenRap.split(" ")[1]}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_showing_time")}</div>
              <div>
                {thongTinPhim?.ngayChieu} - {thongTinPhim?.gioChieu}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_booking_date")}</div>
              <div>{dayjs().format("YYYY-MM-DD")}</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_seats")}</div>
              <div>{danhSachGheDangDat.map((seat) => seat.stt + " ")}</div>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <div className="font-weight-bold">{t("datve_total_price")}</div>
              <div>
                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)}{" "}
                VND
              </div>
            </div>
          </div>
          <div className="mx-auto mt-5" style={{ width: "40%" }}>
            <div className="d-flex justify-content-between mt-2">
              <PDF targetRef={ref} fileName="ticket.pdf">
                {({ toPdf }) => (
                  <button className="btn-success btn" onClick={toPdf}>
                    {t("datve_print_ticket")}
                  </button>
                )}
              </PDF>
              <button
                className="btn-primary btn ml-5"
                onClick={() => {
                  props.history.push("/profile");
                }}
              >
                {t("datve_go_to_my_profile")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatVe;
