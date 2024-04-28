import React from "react";

import NavBar from "../Features/Navbar/Navbar";
import AdminProductGrid from "../Features/AdminPanel/Component/AdminProductGrid";
const Homepage = () => {
  return (
    <NavBar>
      <AdminProductGrid></AdminProductGrid>
    </NavBar>
  );
};

export default Homepage;
