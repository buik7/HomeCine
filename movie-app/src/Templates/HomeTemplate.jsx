import React, { useCallback } from "react";
import { Route, Redirect, NavLink } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

const HomeTemplate = (props) => {
  const { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <div>
              <Component {...propsRoute} />
            </div>
            <Footer />
          </>
        );
      }}
    />
  );
};

export default HomeTemplate;
