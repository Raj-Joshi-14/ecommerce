import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";

import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../Cart/CartSlice";
import { selectUserInfo } from "../User/userSlice";
import {
  fetchByProductsFiltersAsync,
  fetchCategoriesAsync,
  fetchKeyWordAsync,
  handleMainKeyword,
  navsearchFalse,
  navsearchTrue,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectPage,
  selectProductListStatus,
  selectTotalItems,
  selectkeywords,
  selectnavsearchTrue,
} from "../Product/productSlice";
import { ITEMS_PER_PAGE } from "../../../store/constants";
import Pagination from "../Common/Pagination";
import Footer from "../Common/Footer";
import { toast } from "react-toastify";
import {
  // keyWordMain,
  useCustomSorts,
  useCustomState,
  // useCustomkeyWord,
} from "../Common/UseCustomHook";
import { ProductGrid } from "../Product/Component/ProductList";
const navigation = [
  { name: "Products", link: "/ProductPageBySearch", user: true },
  { name: "Listed Products", link: "/", admin: true },
  { name: "Edit Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/order", admin: true },
  { name: "Edit Home", link: "/admin/masterpage", admin: true },
];
const userNavigation = [
  { name: "My Profile", link: "/proflie" },
  { name: "My Orders", link: "/my-orders" },
  { name: "Sign out", link: "/logout" },
];

const catagories = [
  { name: "Smart Phone", id: "1" },
  { name: "Home Appliance", id: "2" },
  { name: "Laptop", id: "3" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const word = "fucker";
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const navsearch = useSelector(selectnavsearchTrue);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const keywords = useSelector(selectkeywords);
  // console.log(keywords);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  /// Filter
  const [filter, setFilter] = useCustomState();
  // console.log("##### Data Filter", filter);
  const [sort, setSort] = useCustomSorts();
  // const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState(null);
  const [stringtitle, setStringtitle] = useState(null);
  const statusused = useSelector(selectProductListStatus);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const handleFilter = (e, section, option) => {
    // console.log(section);
    // console.log(option);
    const newFilter = { ...filter };
    if (e.currentTarget.value) {
      dispatch(navsearchTrue());
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      // Check if newFilter[section.id] exists before calling findIndex
      if (newFilter[section.id]) {
        const index = newFilter[section.id].findIndex(
          (el) => el === option.value
        );
        if (index !== -1) {
          newFilter[section.id].splice(index, 1);
        }
      }
    }
    console.log({ newFilter });
    setFilter(newFilter);
  };
  const handlePage = (page) => {
    setPage(page);
    // console.log("Page", page);
  };
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className=" flex mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      {/* Start of search bar */}
                      <div className="ml-auto lg:ml-20 mt-4 items-baseline">
                        <div className="flex">
                          {/* Choose Categerios */}
                          <div className=" flex-col mr-5 lg:mr-10">
                            {" "}
                            {filters.map((section) => (
                              <Menu
                                key={section.id}
                                as="div"
                                className=" lg:ml:50 sm:ml-0  relative inline-block text-left"
                              >
                                {/* focus:ring-4  focus:outline-none  focus:ring-gray-100*/}
                                <div>
                                  <Menu.Button
                                    className="flex-shrink-0  
                                  w-20
                                  lg:w-40                                 
                                  h-full
                                  font-bold
                                 z-10 inline-flex items-center py-2.5 px-2
                                  text-sm  text-center
                                   text-gray-900 bg-gray-100 border
                                    border-gray-300  rounded-2xl
                                     hover:bg-gray-200                               
                                       dark:bg-gray-700
                                        dark:hover:bg-gray-600
                                         dark:focus:ring-gray-700
                                          dark:text-white dark:border-gray-600"
                                  >
                                    {/* <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"> */}
                                    {selectedCategories !== null
                                      ? selectedCategories
                                      : "All"}
                                    <ChevronDownIcon
                                      className="-mr-1 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  {/* Drop Down Option to select categories */}
                                  <Menu.Items className="absolute  right--5 z-10 mt-2 w-64 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {section.options &&
                                      section.options.map(
                                        (option, optionIdx) => (
                                          <button
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            key={option.value}
                                            value={option.label}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              setSelectedCategories(
                                                e.currentTarget.value
                                              );
                                              navigate(
                                                `/ProductPageBySearch?sectionid=${section.id}&option=${option.value}`
                                              );
                                              console.log(
                                                e.currentTarget.value
                                              );
                                              // console.log(
                                              //   "From Button Log 1",
                                              //   section.name
                                              // );
                                              // console.log(
                                              //   "From Button Log 2",
                                              //   option.value
                                              // );
                                              handleFilter(e, section, option);
                                            }}
                                          >
                                            <Menu.Item>
                                              {({ active }) => (
                                                <p
                                                  className={classNames(
                                                    active ? "bg-gray-100" : "",
                                                    "block px-4 py-2 text-sm text-gray-700"
                                                  )}
                                                >
                                                  {option.label}
                                                </p>
                                              )}
                                            </Menu.Item>
                                          </button>
                                        )
                                      )}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            ))}
                          </div>
                          <div className="flex-col">
                            {/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Work in progress 09-09-2023 */}
                            <div className="flex">
                              <form
                                onSubmit={handleSubmit((data, e) => {
                                  e.preventDefault();
                                  setKeyword(data.searchbarkeyword);
                                  // console.log(data.searchbarkeyword);
                                  navigate(
                                    `/ProductPageBySearch?key=${data.searchbarkeyword}`
                                  );
                                  dispatch(navsearchTrue());
                                  // console.log(keyword);
                                  reset();
                                })}
                              >
                                <label
                                  htmlFor="default-search"
                                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                  Search
                                </label>
                                <div className="relative w-full">
                                  {/* ------------########################## Search Bar Input ########################################------------- */}
                                  {/* ############################################ Work in progress 09-09-2023 */}
                                  <input
                                    {...register("searchbarkeyword", {
                                      onChange: (e) => {
                                        e.preventDefault();
                                        dispatch(navsearchFalse());
                                        console.log(e.currentTarget.value);
                                        let wc = e.currentTarget.value;
                                        // console.log("Word : ", wc);
                                        dispatch(fetchKeyWordAsync(wc));
                                      },
                                      onBlur: (e) => {},
                                    })}
                                    type="text"
                                    id="searchbarkeyword"
                                    name="searchbarkeyword"
                                    className="block  w-full h-10 lg:w-96 mr-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    // KeyDada
                                    placeholder={
                                      keyword ? keyword : "Search Products"
                                    }
                                  />
                                  <button
                                    type="submit"
                                    className="absolute w-12 inset-y-0 right-10 flex items-center pl-3 "
                                  >
                                    <svg
                                      className="w-4 h-4 text-gray-950 dark:text-gray-800"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                      />
                                    </svg>
                                  </button>
                                </div>

                                {/* 
                                    <Link
                                              
                                              // to={`/ProductPageBySearch`}
                                            >
                                              {/* first:rounded-t-lg first:mt-0 last:rounded-b-lg */}
                                {/* </Link> */}
                                {/* Search Results */}
                                {/* Search Result MAnipulation #########%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
                                {getValues("searchbarkeyword")
                                  ? navsearch === false && keywords
                                    ? Array.isArray(keywords) &&
                                      keywords.length > 0 && (
                                        <div className="absolute z-10 w-80">
                                          <div>
                                            <ul className="rounded-lg w-2/3 lg:w-96">
                                              {keywords.map((key, index) => (
                                                <li
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(navsearchTrue());
                                                    navigate(
                                                      `/ProductPageBySearch?key=${key.keyword}`
                                                    );
                                                  }}
                                                  key={index}
                                                  className="flex-row items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                                >
                                                  {key.keyword}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                      )
                                    : null
                                  : null}
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
                {/* End of search bar */}
                <div className="lg:ml-20 md:ml-15 sm:mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  {/* Ecom Logo ------------------------ */}
                  <div className="flex h-16 items-center justify-between">
                    <Link to="/">
                      <div
                        className="flex"
                        onClick={(e) => {
                          dispatch(navsearchFalse());
                          reset();
                        }}
                      >
                        {/* ----------------------------- Ecom Logo Photo--------------------------- */}
                        <div>
                          <img
                            className="h-8 w-8"
                            src="/ecomlogo.svg"
                            alt="Your Company"
                          />
                        </div>
                        {navsearch === false ? (
                          <div>
                            <b className="ml-5 lg:text-lg md:text-sm  text-white">
                              My Shop
                            </b>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(navsearchFalse());
                                setKeyword(null);
                                navigate("/");
                                reset();
                                // toast.success("Back Sucessfully");
                              }}
                              className="ml-5 lg:text-lg md:text-sm  text-white"
                            >
                              Go Back To Home
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-start">
                      <div className="hidden md:inline-block">
                        <div className="ml-2 flex items-start space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/cartpage">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              {/* ----------------------------- Profile Photo--------------------------- */}
                              <img
                                className="h-8 w-8 rounded-full"
                                src={userInfo.profileimages}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) =>
                      item[userInfo.role] ? (
                        <Link key={item.name} to={item.link}>
                          <Disclosure.Button
                            // as="a"
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ) : null
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        {/* ----------------------------- Profile Photo--------------------------- */}
                        <img
                          className="h-10 w-10 rounded-full"
                          src={userInfo.profileimages}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {/* this should come from userInfo */}
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/cartpage">
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Link
                          key={item.name}
                          // as="a"
                          to={item.link}
                        >
                          <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                E-Commerce
              </h1>
            </div> */}
          </header>

          <main>
            <div className="mx-1   py- sm:px-0 lg:px-0">{children}</div>
            {/* {navsearch === false && keyword === null ? (
              <div className="mx-1   py- sm:px-0 lg:px-0">{children}</div>
            ) : (
              <ProductGrid name={keyword} />
            )} */}

            <Footer></Footer>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
