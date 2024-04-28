import { configureStore, createReducer } from "@reduxjs/toolkit";
import authReducer from "../src/Features/Auth/authSlice";
import cartReducer from "../src/Features/Cart/CartSlice";
import orderReducer from "../src/Features/Order/OrderSlice";
import userReducer from "../src/Features/User/userSlice";
import productReducer from "../src/Features/Product/productSlice";
import highlightReducer from "../src/Features/AdminPanel/adminSlice";
const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    flex: highlightReducer,
  },
});

export default store;
