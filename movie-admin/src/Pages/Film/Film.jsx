import React, { useEffect, useCallback, useState } from "react";
import { Table, Space, Popconfirm, Button, Input, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { actionTypes } from "../../Redux/constants/actionTypes";
import FormCreateFilm from "../../Components/Film/FormCreateFilm";
import FormEditFilm from "../../Components/Film/FormEditFilm";
import { NavLink } from "react-router-dom";

const Film = () => {
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_FILM_LIST_SAGA,
    });
  }, [dispatch]);

  const filmList = useSelector((state) => state.filmReducer.filmList);

  const createFilm = useCallback(() => {
    dispatch({
      type: actionTypes.OPEN_MODAL_CREATE_FILM,
      payload: {
        InnerComponent: <FormCreateFilm />,
      },
    });
  }, [dispatch]);

  const editFilm = useCallback(
    (filmId) => {
      return () => {
        dispatch({
          type: actionTypes.OPEN_MODAL_EDIT_FILM,
          payload: {
            InnerComponent: <FormEditFilm />,
          },
        });

        dispatch({
          type: sagaTypes.GET_FILM_DETAIL_SAGA,
          filmId: filmId,
        });
      };
    },
    [dispatch]
  );

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (item2, item1) => {
        return item2.maPhim - item1.maPhim;
      },
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: (item2, item1) => {
        if (
          item2.tenPhim.trim().toLowerCase() <
          item1.tenPhim.trim().toLowerCase()
        ) {
          return -1; // swap
        }
        return 1; // positions stay same
      },
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      render: (text, record, index) => {
        const date = text.slice(0, 10).split("-");
        return `${date[2]}/${date[1]}/${date[0]}`;
      },
      sorter: (item2, item1) => {
        const [year2, month2, day2] = item2.ngayKhoiChieu
          .slice(0, 10)
          .split("-")
          .map((item) => Number(item)); // [ 2002, 18, 10 ]
        const [year1, month1, day1] = item1.ngayKhoiChieu
          .slice(0, 10)
          .split("-")
          .map((item) => Number(item)); // [ 2001, 19, 10 ]
        if (
          year2 < year1 ||
          (year2 === year1 && month2 < month1) ||
          (year2 === year1 && month2 === month1 && day2 < day1)
        ) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Tooltip title="Chỉnh sửa phim">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={editFilm(record.maPhim)}
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Tooltip title="Tạo lịch chiếu cho phim">
              <NavLink to={`/add-schedule/${record.maPhim}`}>
                <span>
                  <CalendarOutlined />
                </span>
              </NavLink>
            </Tooltip>
            <Popconfirm
              title={`Bạn có chắc chắn muốn xóa phim ${record.tenPhim}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_FILM_SAGA,
                  filmId: record.maPhim,
                });
                // message.success("Xóa thành công");
              }}
              // onCancel
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Xóa phim">
                <span style={{ color: "red", cursor: "pointer" }}>
                  <DeleteOutlined />
                </span>
              </Tooltip>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <h4>Quản lý phim</h4>

      <div className="d-flex">
        <div className="mr-3">
          <Button type="primary" className=" mb-4" onClick={createFilm}>
            <i className="fa fa-plus" aria-hidden="true"></i> &nbsp; Tạo phim
          </Button>
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm phim..."
          className="mb-3"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filmList.filter((item) =>
          item.tenPhim.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"maPhim"}
      />
    </div>
  );
};

export default Film;
