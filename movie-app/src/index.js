import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./Redux/configStore";
import App from "./App";
import * as signalR from "@aspnet/signalr";

// Import multiple languages
import "./i18n";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`https://movienew.cybersoft.edu.vn/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection
  .start()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  })
  .catch((errors) => {
    console.log(errors);
  });
