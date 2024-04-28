import React from "react";
import NavBar from "../Features/Navbar/Navbar";
import Home from "../Features/LandingPages/Home";
import {
  selectAllProducts,
  selectnavsearchTrue,
} from "../Features/Product/productSlice";
import { useSelector } from "react-redux";
import { ProductGrid } from "../Features/Product/Component/ProductList";
import Loding from "../Features/LandingPages/Loding";
import { selectUserChecked } from "../Features/Auth/authSlice";

const Homepage = () => {
  const userChecked = useSelector(selectUserChecked);
  const products = useSelector(selectAllProducts);
  const navsearch = useSelector(selectnavsearchTrue);
  return !userChecked && !products ? (
    <Loding></Loding>
  ) : (
    <NavBar>
      <Home></Home>
    </NavBar>
  );
};

export default Homepage;
