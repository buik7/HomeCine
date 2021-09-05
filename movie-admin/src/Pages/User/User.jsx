import React, { useCallback, useState, useEffect } from "react";
import { Table, Space, Popconfirm, Button, Input, Tooltip, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { sagaTypes } from "../../Redux/constants/sagaTypes";
import { actionTypes } from "../../Redux/constants/actionTypes";
import FormCreateUser from "../../Components/User/FormCreateUser";
import FormEditUser from "../../Components/User/FormEditUser";

const stringCompare = (string2, string1, comparingField) => {
  if (
    string2[comparingField].trim().toLowerCase() <
    string1[comparingField].trim().toLowerCase()
  ) {
    return -1; // swap
  }
  return 1; // positions stay same
};

const User = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch({
      type: sagaTypes.GET_USER_LIST_SAGA,
    });
    dispatch({
      type: sagaTypes.GET_USER_TYPE_LIST_SAGA,
    });
  }, [dispatch]);

  const createUser = useCallback(() => {
    dispatch({
      type: actionTypes.OPEN_MODAL_CREATE_USER,
      payload: {
        InnerComponent: <FormCreateUser />,
      },
    });
  }, [dispatch]);

  const editUser = useCallback((taiKhoan) => {
    return () => {
      dispatch({
        type: actionTypes.OPEN_MODAL_EDIT_USER,
        payload: {
          InnerComponent: <FormEditUser />,
        },
      });

      dispatch({
        type: sagaTypes.GET_USER_DETAIL_SAGA,
        payload: taiKhoan,
      })
    };
  }, [dispatch]);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "taiKhoan");
      },
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "matKhau",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "matKhau");
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "hoTen");
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "email");
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "soDt");
      },
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      sorter: (item2, item1) => {
        return stringCompare(item2, item1, "maLoaiNguoiDung");
      },
      render: (text, record, index) => {
        if (text.toLowerCase().trim() === "quantri") {
          return <Tag color="magenta">{text}</Tag>;
        }
        return <Tag color="green">{text}</Tag>;
      },
    },

    {
      title: "Hành động",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Tooltip title="Chỉnh sửa người dùng">
              <span
                style={{ color: "gray", cursor: "pointer" }}
                onClick={editUser(record.taiKhoan)}
              >
                <EditOutlined />
              </span>
            </Tooltip>
            <Popconfirm
              title={`Bạn có chắc chắn muốn xóa người dùng ${record.taiKhoan}?`}
              onConfirm={() => {
                dispatch({
                  type: sagaTypes.DELETE_USER_SAGA,
                  payload: record.taiKhoan,
                });
                // message.success("Xóa thành công");
              }}
              // onCancel
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Tooltip title="Xóa người dùng">
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
      <h4>Quản lý người dùng</h4>

      <div className="d-flex">
        <div className="mr-3">
          <Button type="primary" className=" mb-4" onClick={createUser}>
            <i className="fa fa-plus" aria-hidden="true"></i> &nbsp; Thêm người
            dùng
          </Button>
        </div>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm kiếm người dùng..."
          className="mb-3"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userList.filter(
          (item) =>
            item.hoTen.toLowerCase().startsWith(searchKeyword) ||
            item.taiKhoan.toLowerCase().startsWith(searchKeyword)
        )}
        rowKey={"taiKhoan"}
      />
    </div>
  );
};

export default User;
