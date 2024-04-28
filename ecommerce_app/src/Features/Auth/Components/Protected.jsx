import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectloggedInUserToken } from "../authSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectloggedInUserToken);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
};

export default Protected;
