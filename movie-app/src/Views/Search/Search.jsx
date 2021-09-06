import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getFilmListThunk } from "../../Redux/Thunks/filmThunk";

const Search = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmListThunk);
  }, [dispatch]);

  const filmList = useSelector((state) => state.filmReducer.filmList);
  const keyWord = props.match.params.keyword;

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Hình ảnh",
      render: (text, record, index) => {
        return (
          <img
            src={record.hinhAnh}
            width="100"
            height="100"
            alt="Hình ảnh phim"
          ></img>
        );
      },
    },
    {
      title: "",
      render: (text, record, index) => {
        return (
          <button
            className="btn btn-success"
            onClick={() => {
              props.history.push(`/detail/${record.maPhim}`);
            }}
          >
            Đặt vé
          </button>
        );
      },
    },
  ];

  return (
    <div className="container mt-2">
      <Table
        dataSource={filmList.filter((film) =>
          film.tenPhim.toLowerCase().startsWith(keyWord)
        )}
        columns={columns}
        rowKey={"tenPhim"}
      />
    </div>
  );
};

export default Search;
