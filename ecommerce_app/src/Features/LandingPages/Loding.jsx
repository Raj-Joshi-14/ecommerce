import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
import "./Loading.css";
const Loding = () => {
  return (
    <div className="containter">
      <div className="spinnerbow">
        <CirclesWithBar
          height="150"
          width="150"
          color="#fed8b1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel="circles-with-bar-loading"
        />
      </div>
    </div>
  );
};

export default Loding;
