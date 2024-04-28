import React from "react";
import UserOrder from "../Features/User/Component/UserOrders";
import NavBar from "../Features/Navbar/Navbar";
const UserOrderPage = () => {
  return (
    <div>
      <NavBar>
        <UserOrder></UserOrder>
      </NavBar>
    </div>
  );
};

export default UserOrderPage;
