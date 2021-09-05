import React, { useCallback, useState } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BarChartOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { localStorageKeys } from "../Util/constants/systemConstant";
import { actionTypes } from "../Redux/constants/actionTypes";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (propsRoute) => {
  const userLogin = useSelector((state) => state.authReducer.userLogin);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const logOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    dispatch({
      type: actionTypes.SAVE_USER_LOGIN,
      payload: {},
    });
  }, [dispatch]);

  const { Component, ...restRoute } = propsRoute;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        if (!localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
          return <Redirect to="/signin" />;
        }
        return (
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="50px"
              collapsible
              collapsed={collapsed}
              onCollapse={() => setCollapsed(!collapsed)}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <div className="logo" />
              <Menu theme="dark" mode="inline">
                <div className="p-3">
                  <NavLink to="/">
                    <div className="bg-white p-1">
                      <img
                        src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/530/5882468530_85690e2b-cad3-4b22-af20-b5ded179944f.png?cb=1629727349"
                        alt="Logo"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </NavLink>
                </div>

                <SubMenu
                  key="sub1"
                  icon={<UserOutlined />}
                  title={userLogin?.hoTen}
                >
                  <Menu.Item key="123" onClick={logOut}>
                    Đăng xuất
                  </Menu.Item>
                </SubMenu>

                <NavLink
                  to="/film"
                  className="d-flex ant-menu-item"
                  style={{ paddingLeft: 24 }}
                  activeClassName="ant-menu-item-selected"
                >
                  <VideoCameraOutlined /> &nbsp;&nbsp; Quản lý phim
                </NavLink>

                <NavLink
                  to="/user"
                  className="d-flex ant-menu-item"
                  style={{ paddingLeft: 24 }}
                  activeClassName="ant-menu-item-selected"
                >
                  <UserAddOutlined /> &nbsp;&nbsp; Quản lý người dùng
                </NavLink>

                <NavLink
                  to="/cinema"
                  className="d-flex ant-menu-item"
                  style={{ paddingLeft: 24 }}
                  activeClassName="ant-menu-item-selected"
                >
                  <BarChartOutlined /> &nbsp;&nbsp; Quản lý rạp
                </NavLink>
              </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <Component {...propsRoute} />
              </Content>
              <Footer style={{ textAlign: "center" }}>HomeCine ©2021</Footer>
            </Layout>
          </Layout>
        );
      }}
    />
  );
};

export default AdminTemplate;
