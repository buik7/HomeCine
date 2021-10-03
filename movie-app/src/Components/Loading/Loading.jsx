import React from "react";
import loadingGIF from "./../../Assets/img/Spinner-1s-200px.gif";
import styleLoading from "./LoadingComponent.module.css";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.loadingReducer.isLoading);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={loadingGIF} alt="Loading GIF"></img>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Loading;
