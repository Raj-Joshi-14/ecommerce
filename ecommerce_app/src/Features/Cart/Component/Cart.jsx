import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
  selectCartLoaded,
} from "../CartSlice";
import { toast } from "react-toastify";
import Modal from "../../Common/Modal";
const Cart = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  let Totaldiscountprice;
  {
    items.map(
      (item) =>
        (Totaldiscountprice = Math.round(
          item.product.price * (1 - item.product.discountPercentage / 100)
        ))
    );
  }
  // console.log(Totaldiscountprice);
  const totalAmount = items.reduce(
    (amount, item) =>
      item.product.discountPrice
        ? item.product.discountPrice * item.quantity + amount
        : Totaldiscountprice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  // console.log("totalAmount :", totalAmount);
  // items.map((item) =>
  //   console.log(
  //     "items.product.discountPrice || Totaldiscountprice",
  //     item.product.discountPrice
  //       ? item.product.discountPrice * item.quantity
  //       : Totaldiscountprice * item.quantity
  //   )
  // );

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                  (1 - item.product.discountPercentage / 100)
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
                        <Modal
                          title={`Delete ${item.product.title}`}
                          message="Are you sure you want to delete this Cart item ?"
                          dangerOption="Delete"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={() => setOpenModal(null)}
                          showModal={openModal === item.id}
                        ></Modal>
                        <button
                          type="button"
                          onClick={(e) => {
                            setOpenModal(item.id);
                          }}
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
            <Link
              to="/checkoutpage"
              className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpenModal(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
