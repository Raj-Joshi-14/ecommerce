import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync } from "../OrderSlice";

const Order = () => {
  const orders = useSelector();
  const dispatch = useDispatch();
  return <div></div>;
};

export default Order;
