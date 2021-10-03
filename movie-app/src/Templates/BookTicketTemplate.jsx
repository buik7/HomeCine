import React from "react";
import { Route, Redirect } from "react-router-dom";
import { localStorageKeys } from "../Util/constants/systemConstant";

const BookTicketTemplate = (props) => {
  const { Component, ...restProps } = props;
  if (!localStorage.getItem(localStorageKeys.ACCESS_TOKEN)) {
    return <Redirect to="/signin" />;
  }
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div>
            <Component {...propsRoute} />
          </div>
        );
      }}
    />
  );
};

export default BookTicketTemplate;
