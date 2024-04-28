import React from "react";
import UserProfile from "../Features/User/Component/UserProfile";
import NavBar from "../Features/Navbar/Navbar";
const UserOrderPage = () => {
  return (
    <div>
      <NavBar>
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
};

export default UserOrderPage;
