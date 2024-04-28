import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CartPage from "./Pages/CartPage";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import CheckOutPage from "./Pages/CheckOutPage";
import ProductDeatilsPage from "./Pages/ProductDetailsPages";
import Protected from "./Features/Auth/Components/Protected";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "./Pages/Error404";
import OrderSucessPage from "./Pages/OrderSucessPage";
import UserOrderPage from "./Pages/UserOrderPage";
import UserProfilePage from "./Pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./Features/User/userSlice";
import Logout from "./Features/Auth/Components/Logout";
import ForgotpassWordPage from "./Pages/ForgotPasswordPage";
import ProtectedAdmin from "./Features/Auth/Components/ProtectedAdmin";
import AdminProductDetailsPages from "./Pages/AdminProductDetailsPages";
import AdminHome from "./Pages/AdminHome";
import AdminProductFormPages from "./Pages/AdminProductFormPage";
import AdminOrderPages from "./Pages/AdminOrderPage";
import {
  checkAuthAsync,
  selectUserChecked,
  selectloggedInUserToken,
} from "./Features/Auth/authSlice";
import { fetchItemsByUserIdAsync } from "./Features/Cart/CartSlice";
import StripeCheckout from "./Pages/StripCheckOut";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import HomePageEditAdmin from "./Pages/HomePageEditAdmin";
import {
  fetchHighlightsAsync,
  fetchTopProdutsAsync,
  fetchTopSearchAsync,
  selectTopSearch,
} from "./Features/AdminPanel/adminSlice";
import ProductPageBySearch from "./Pages/ProductPageBySearch";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Homepage></Homepage>
      </Protected>
    ),
  },

  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/masterpage",
    element: (
      <ProtectedAdmin>
        <HomePageEditAdmin></HomePageEditAdmin>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cartpage",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkoutpage",
    element: (
      <Protected>
        <CheckOutPage></CheckOutPage>
      </Protected>
    ),
  },
  {
    path: "/ProductPageBySearch?",
    element: (
      <Protected>
        <ProductPageBySearch></ProductPageBySearch>
      </Protected>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <Protected>
        <ProductDeatilsPage></ProductDeatilsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/productdetails/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPages></AdminProductDetailsPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPages></AdminProductFormPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/productform/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPages></AdminProductFormPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/order",
    element: (
      <ProtectedAdmin>
        <AdminOrderPages></AdminOrderPages>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/ordersucess/:id",
    element: (
      <Protected>
        <OrderSucessPage></OrderSucessPage>
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrderPage></UserOrderPage>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkOut",
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: "/proflie",
    element: (
      <Protected>
        <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
  {
    path: "/forgotpassword",
    element: <ForgotpassWordPage></ForgotpassWordPage>,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: "*",
    element: <Error404></Error404>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUserToken);
  const userChecked = useSelector(selectUserChecked);
  const topsea = useSelector(selectTopSearch);
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(fetchTopSearchAsync());

      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchHighlightsAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  if (topsea && topsea[0] && topsea[0].topsearch !== undefined) {
    // console.log("Top 10 : ", topsea[0].topsearch);
    dispatch(fetchTopProdutsAsync(topsea[0].topsearch));
  }

  return (
    <>
      <div className="App">
        {userChecked && <RouterProvider router={router} />}
      </div>
    </>
  );
}

export default App;
