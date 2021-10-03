import React, { useEffect } from "react";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getFilmListThunk } from "../../Redux/Thunks/filmThunk";
import { useTranslation } from "react-i18next";

const Search = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilmListThunk);
  }, [dispatch]);

  const filmList = useSelector((state) => state.filmReducer.filmList);
  const keyWord = props.match.params.keyword.toLowerCase();
  const { t } = useTranslation();

  const columns = [
    {
      title: t("search_film_name"),
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: t("search_film_img"),
      render: (text, record, index) => {
        return (
          <img
            src={record.hinhAnh}
            width="100"
            height="100"
            alt="Film imgg"
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
            {t("book_tickets")}
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
        rowKey={"maPhim"}
      />
    </div>
  );
};

export default Search;
