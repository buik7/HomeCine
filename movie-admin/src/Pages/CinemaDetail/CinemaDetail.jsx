import React, { useEffect } from "react";
import { Table } from "antd";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { CalendarOutlined } from "@ant-design/icons";

const CinemaDetail = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_CINEMA_LIST_SAGA,
      payload: props.match.params.id,
    });
  }, [dispatch]);

  const cinemaList = useSelector((state) => state.cinemaReducer.cinemaList).map(
    (item, index) => {
      return { ...item, index: index + 1 };
    }
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên cụm rạp",
      dataIndex: "tenCumRap",
      key: "tenCumRap",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Số lượng rạp",
      render: (text, record, index) => {
        return record.danhSachRap.length;
      },
    },
    {
      title: "Lịch chiếu của rạp",
      render: (text, record, index) => {
        return (
          <NavLink
            to={`/cinema-detail/${props.match.params.id}/${record.maCumRap}`}
          >
            <CalendarOutlined />
          </NavLink>
        );
      },
    },
  ];

  return (
    <div>
      <Breadcrumb className="mb-2">
        <Breadcrumb.Item>
          <NavLink to="/cinema">Quản lý rạp</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin cụm rạp</Breadcrumb.Item>
      </Breadcrumb>

      <h4 className="mb-4">Hệ thống rạp {props.match.params.id}</h4>

      <Table dataSource={cinemaList} columns={columns} rowKey />
    </div>
  );
};

export default CinemaDetail;
