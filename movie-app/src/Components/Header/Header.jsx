import React, { useState, useEffect, useCallback } from "react";
import "./Header.css";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../Redux/Constants/actionTypes";
import { localStorageKeys } from "../../Util/constants/systemConstant";

const Header = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userReducer.userLogin);
  const [searchKeyword, setSearchKeyWord] = useState("");

  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  const logOut = useCallback(() => {
    dispatch({
      type: actionTypes.SAVE_USER_LOGIN,
      payload: null,
    });
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
  }, [dispatch]);

  return (
    <div>
      {width > 700 ? (
        <header id="header__pc">
          <div className="header__top">
            <div className="header__logo">
              <img
                src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/530/5882468530_85690e2b-cad3-4b22-af20-b5ded179944f.png?cb=1629727349"
                alt="Logo"
              />
            </div>
            <div className="header__search__bar">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm phim, diễn viên, ..."
                  onChange={(e) => setSearchKeyWord(e.target.value)}
                />
                <i
                  className="fas fa-search"
                  onClick={() => {
                    props.history.push(`/search/${searchKeyword}`);
                  }}
                />
              </div>
            </div>
            {userLogin ? (
              <div className="header__user">
                <div
                  className="drop-down-toggle"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <i className="far fa-user mr-1" /> {userLogin.hoTen}
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <NavLink className="dropdown-item" id="linking" to="/profile">
                    Thông tin tài khoản
                  </NavLink>
                  <a className="dropdown-item" href="#" onClick={logOut}>
                    Đăng xuất
                  </a>
                </div>
              </div>
            ) : (
              <div className="header__login">
                <a href="#">
                  <i className="far fa-user mr-1" /> Đăng nhập
                </a>
              </div>
            )}
          </div>
          <div className="header__bottom">
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeStyle={{ color: "black" }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  TRANG CHỦ
                </NavLink>
              </li>
              <li>|</li>
              <li>
                <NavLink
                  to="/film"
                  activeStyle={{ color: "black" }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  PHIM
                </NavLink>
              </li>
              <li>|</li>
              <li>
                <NavLink
                  to="/event"
                  activeStyle={{ color: "black" }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  SỰ KIỆN
                </NavLink>
              </li>
              <li>|</li>
              <li>
                <NavLink
                  to="/contact"
                  activeStyle={{ color: "black" }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  HỖ TRỢ
                </NavLink>
              </li>
              <li>|</li>
              <li>
                <NavLink
                  to="/profile"
                  activeStyle={{ color: "black" }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  THÔNG TIN TÀI KHOẢN
                </NavLink>
              </li>
            </ul>
          </div>
        </header>
      ) : (
        <header id="header__mobile">
          <div className="header__mobile__content">
            <div className="header__mobile__left">
              <img
                src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/530/5882468530_85690e2b-cad3-4b22-af20-b5ded179944f.png?cb=1629727349"
                alt="Logo"
              />
              <a href="#">
                <i className="far fa-user mr-1" /> Đăng nhập
              </a>
            </div>
            <div className="header__mobile__right">
              <a
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-bars" />
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="dropdown-item">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm phim, diễn viên, ..."
                    />
                    <i className="fas fa-search" />
                  </div>
                </div>
                <NavLink className="dropdown-item" to="/" exact>
                  TRANG CHỦ
                </NavLink>
                <NavLink className="dropdown-item" to="/film">
                  PHIM
                </NavLink>
                <NavLink className="dropdown-item" to="/event">
                  SỰ KIỆN
                </NavLink>
                <NavLink className="dropdown-item" to="/profile">
                  THÔNG TIN TÀI KHOẢN
                </NavLink>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
};

export default withRouter(Header);
