import axios from "axios";
import { localStorageKeys } from "./../Util/constants/systemConstant";

const request = ({ method, url, params, data }) => {
  const variables = {
    url,
    data,
    params,
    method,
    headers: {
      TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
    },
  };

  const token = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  if (token) {
    variables.headers.Authorization = "Bearer " + token;
  }

  return axios(variables);
};

export default request;
