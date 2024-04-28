import React from "react";
import { useSelector } from "react-redux";
import { selectloggedInUserToken } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../User/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectloggedInUserToken);
  const userInfo = useSelector(selectUserInfo);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
