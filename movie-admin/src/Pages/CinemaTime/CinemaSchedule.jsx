import React, { useEffect } from "react";
import { Breadcrumb, Tag } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { Table } from "antd";

const parseDate = (dateString) => {
  const [date, time] = dateString.split("T");
  const [year, month, day] = date.split("-");
  const [hour, min, sec] = time.split(":");
  return `${day}/${month}/${year} - ${hour}:${min}:${sec}`;
};

const mapRapToColor = (rapString) => {
  const listColor = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",
  ];
  const numRap = Number(rapString.split(" ")[1]) - 1;
  return listColor[numRap];
};

const sortByRap = (item2, item1) => {
    const numRap1 = Number(item1.tenRap.split(" ")[1]);
    const numRap2 = Number(item2.tenRap.split(" ")[1]);
    if (numRap2 < numRap1){
        return -1
    } 
    
    return 1;
}

const CinemaSchedule = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_SCHEDULE_BY_CINEMA_SAGA,
      payload: props.match.params.id,
    });
  }, [props.match.params.id, dispatch]);

  const cinemaSchedule = useSelector(
    (state) => state.cinemaReducer.cinemaSchedule
  )[0];
  //   console.log(cinemaSchedule);

  const thongTinCumRap = cinemaSchedule?.lstCumRap.filter(
    (item) => item.maCumRap === props.match.params.maCumRap
  )[0];
  const listMovie = thongTinCumRap?.danhSachPhim;
  console.log(listMovie);

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Lịch chiếu",
      render: (text, record, index) => {
        return record.lstLichChieuTheoPhim.sort(sortByRap).map((lichChieu, index) => {
          return (
            <Tag
              key={lichChieu.maLichChieu}
              color={mapRapToColor(lichChieu.tenRap)}
              className="mb-1"
            >
              {lichChieu.tenRap} - {parseDate(lichChieu.ngayChieuGioChieu)}
            </Tag>
          );
        });
      },
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-5">
        <Breadcrumb.Item>
          <NavLink to="/cinema">Quản lý rạp</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to={`/cinema-detail/${props.match.params.id}`}>
            Thông tin cụm rạp
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin lịch chiếu</Breadcrumb.Item>
      </Breadcrumb>

      <h4>Lịch chiếu rạp {thongTinCumRap?.tenCumRap}</h4>

      <Table dataSource={listMovie} columns={columns} rowKey={"maPhim"}></Table>
    </div>
  );
};

export default CinemaSchedule;
