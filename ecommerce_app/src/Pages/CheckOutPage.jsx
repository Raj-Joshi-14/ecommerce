import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../Features/Cart/CartSlice";
import { useForm } from "react-hook-form";
// import { updateUserAsync } from "../Features/Auth/authSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus,
} from "../Features/Order/OrderSlice";
import {
  selectUserInfo,
  updateUserAsync,
  selectUserInfoStatus,
} from "../Features/User/userSlice";
import { toast } from "react-toastify";

import { Grid } from "react-loader-spinner";
const CheckOutPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const status = useSelector(selectUserInfoStatus);
  const Orderstatus = useSelector(selectOrderStatus);
  const items = useSelector(selectItems);
  let Totaldiscountprice;
  {
    items.map(
      (item) =>
        (Totaldiscountprice = Math.round(
          item.product.price * (1 - item.product.discountPercentage / 100)
        ))
    );
  }
  const totalAmount = items.reduce(
    (amount, item) =>
      item.product.discountPrice
        ? item.product.discountPrice * item.quantity + amount
        : Totaldiscountprice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  // e.target.value means we select the option
  // that event is handled that chosses that select option value
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const currentOrder = useSelector(selectCurrentOrder);
  const userInfo = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handleAddress = (e) => {
    setSelectedAddress(userInfo.addresses[e.target.value]);
    // console.log(selectedAddress);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
    // console.log(paymentMethod);
  };

  const handleOrder = (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: userInfo.id,
      paymentMethod,
      selectedAddress,
      status: "pending", // other status can be delivered, received
    };
    if (selectedAddress === null) {
      toast.error("Address Is Not Selected");
    } else {
      dispatch(createOrderAsync(order));
    }
    //TODO : redirect to order-sucess page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  };

  return (
    <>
      {/* {!items.length && (
        <Navigate to="/" replace={true}></Navigate>
      )} */}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/ordersucess/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkOut`} replace={true}></Navigate>
      )}
      {status === "loading" ? (
        <div className="mx-6  my-6">
          <Grid
            height="150"
            width="150"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      {userInfo && userInfo.addresses && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3 mt-10">
              <form
                className="bg-white px-5 py-8"
                noValidate
                onSubmit={handleSubmit((data) => {
                  // console.log(data);
                  dispatch(
                    updateUserAsync({
                      ...userInfo,
                      addresses: [...userInfo.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Full Name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone No
                        </label>
                        <div className="mt-2">
                          <input
                            type="tel"
                            {...register("phone", {
                              required: "phone no is required",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Region
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "region is required",
                            })}
                            id="region"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                      }}
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from Existing address
                    </p>
                    <ul role="list" className="divide-y divide-gray-100">
                      {userInfo.addresses.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex gap-x-4">
                            <input
                              id="addressid"
                              name="address"
                              onChange={handleAddress}
                              value={index}
                              type="radio"
                              className="h-4 w-4 ml-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm leading-6 text-gray-900">
                                {address.state}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                {address.street}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden mr-5 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-x  leading-5 text-gray-500">
                              {address.phone}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose One
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payments"
                              onChange={handlePayment}
                              checked={paymentMethod === "cash"}
                              value="cash"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              name="payments"
                              onChange={handlePayment}
                              value="card"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* My Cart */}
            <div className="lg:col-span-2 mt-">
              <div className="mx-auto mt-12 max-w-7xl px-2 sm:px-2 lg:px-4">
                <div className="border-t border-gray-200 px-4 -py-1 sm:px-6">
                  <h2 className="text-2xl my-8 font-bold tracking-tight text-gray-900">
                    My Cart
                  </h2>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={item.product.href}>
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">
                                  &#8377;
                                  {item.product.discountPrice
                                    ? item.product.discountPrice
                                    : Math.round(
                                        item.product.price *
                                          (1 -
                                            item.product.discountPercentage /
                                              100)
                                      )}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline text-sm mr-3 font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={(e) => handleRemove(e, item.id)}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>&#8377; {totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                    <p>Total Count</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      Order Now
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOutPage;
