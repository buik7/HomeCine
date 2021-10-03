import React from "react";
import { Redirect, Route } from "react-router-dom";
import { localStorageKeys } from "../Util/constants/systemConstant";

const AuthTemplate = (propsRoute) => {
  const { Component, ...restRoute } = propsRoute;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        if (localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
          return <Redirect to="/" />;
        }
        return (
          <div className="container-fluid" style={{ height: "100vh" }}>
            <div className="row">
              <div
                className="col-12 col-md-6"
                style={{
                  paddingLeft: 0,
                  display: window.innerWidth < 800 ? "none" : "flex",
                }}
              >
                <img
                  src="https://i.picsum.photos/id/1056/3988/2720.jpg?hmac=qX6hO_75zxeYI7C-1TOspJ0_bRDbYInBwYeoy_z_h08"
                  alt=""
                  style={{ width: "100%", height: "100vh" }}
                />
              </div>
              <div className="col-12 col-md-6">
                <Component {...propsRoute} />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default AuthTemplate;
