import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";
import {
  selectAllProducts,
  selectTotalItems,
  fetchByProductsFiltersAsync,
  selectBrands,
  selectCategories,
  fetchBrandsAsync,
  fetchCategoriesAsync,
  selectProductListStatus,
  selectnavsearchTrue,
  navsearchFalse,
  selectPage,
  handlePages,
} from "../productSlice";
import { ITEMS_PER_PAGE } from "../../../../store/constants";
import { Grid } from "react-loader-spinner";
import Pagination from "../../Common/Pagination";
import {
  // keyWordMain,
  useCustomSorts,
  useCustomState,
  // filter,
} from "../../Common/UseCustomHook";
import { toast } from "react-toastify";
const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];
{
  /* Discount Price CalCulated Manullay Not Edited in whole data base */
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
/**
 *
 * Loading Animation is added on line no 200 use
 * in various places in application
 *
 *
 */
export function ProductGrid() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // console.log(products);
  // Using Custom Hook
  const [filter, setFilter] = useCustomState();
  // console.log("Filter From Product List : ", filterss);
  const [sort, setSort] = useCustomSorts();

  const pages = useSelector(selectPage);
  const statusused = useSelector(selectProductListStatus);
  const navsearch = useSelector(selectnavsearchTrue);
  // console.log("From Product List", navsearch);
  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brands",
      options: brands,
    },
  ];
  //My Code // Using Custom Hook
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    // console.log(newFilter);
    if (e.currentTarget.checked) {
      // console.log(e.currentTarget.checked);
      // dispatch(navsearchFalse());
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };
  ///// Search Matter @@@@@@@@@@@@@@@@@@@
  const location = useLocation();

  // You can access query parameters from the location object
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("key");
  const sectionid = queryParams.get("sectionid");
  const option = queryParams.get("option");
  // console.log("sectionid", sectionid);
  // console.log("option", option);

  // Using Custom Hook
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (pagea) => {
    // console.log("Page form handle page function : ", pagea);
    dispatch(handlePages(pagea));
  };
  useEffect(() => {
    if (sectionid) {
      const newFilter = { ...filter };
      // console.log(newFilter);
      if (sectionid && option) {
        // console.log(e.currentTarget.checked);
        // dispatch(navsearchFalse());
        if (newFilter[sectionid]) {
          newFilter[sectionid].push(option);
        } else {
          newFilter[sectionid] = [option];
        }
      } else {
        const index = newFilter[sectionid].findIndex((el) => el === option);
        newFilter[sectionid].splice(index, 1);
      }
      setFilter(newFilter);
    }
  }, [sectionid, option, filter.category]);
  // console.log(filter.category);
  useEffect(() => {
    const pagination = { _page: pages, _limit: ITEMS_PER_PAGE };
    // console.log("useEffect : ", keyword);
    // console.log("useEffect Category filter : ", filter);
    dispatch(
      fetchByProductsFiltersAsync({ filter, keyword, sort, pagination })
    );
  }, [dispatch, filter, keyword, pages, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <>
      <div>
        {products.length > 0 ? (
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              <MobileFilter
                handleFilter={handleFilter}
                mobileFiltersOpen={mobileFiltersOpen}
                filters={filters}
                setMobileFiltersOpen={setMobileFiltersOpen}
              ></MobileFilter>
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-15">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                    All Product
                  </h1>

                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                          Sort
                          <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {sortOptions.map((option) => (
                              <Menu.Item key={option.name}>
                                {({ active }) => (
                                  <p
                                    onClick={(e) => {
                                      handleSort(e, option);
                                    }}
                                    className={classNames(
                                      option.current
                                        ? "font-medium text-gray-900"
                                        : "text-gray-500",
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {option.name}
                                  </p>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <button
                      type="button"
                      className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                    >
                      <span className="sr-only">View grid</span>
                      <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filters</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/*  DesktopFilter*/}
                    <DesktopFilter
                      filters={filters}
                      handleFilter={handleFilter}
                    ></DesktopFilter>
                    {/* Product grid */}
                    <div className="lg:col-span-3">
                      <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 -py-10 sm:px-6 sm:-py-10 lg:max-w-5xl lg:px-5">
                          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {/* Loading Animation is added  */}
                            {statusused === "pending" ? (
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

                            {products.map((product) => (
                              <Link
                                key={product.id}
                                to={`/productdetails/${product.id}`}
                              >
                                {/* {console.log(product.id)} */}
                                <div className="group relative border-solid border-2 p-2 border-gray-200">
                                  <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center lg:h-60 lg:w-full"
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0"
                                        />
                                        {product.title}
                                      </h3>
                                      <p className="mt-1 text-sm text-gray-500">
                                        <StarIcon className="w-6 h-6 inline"></StarIcon>
                                        <span className="align-bottom">
                                          {product.rating}
                                        </span>
                                      </p>
                                    </div>
                                    {/* Discount Price CalCulated Manullay Not Edited in whole data base */}
                                    <div>
                                      <p className="text-sm font-medium  block text-gray-900">
                                        &#8377;
                                        {Math.round(
                                          product.price *
                                            (1 -
                                              product.discountPercentage / 100)
                                        )}
                                      </p>
                                      <p className="text-sm line-through font-medium block  text-gray-400 ">
                                        &#8377;{product.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Product Grid Section End ************************************************************************************************** */}

                <Pagination
                  page={pages}
                  // setPage={setPage}
                  filters={filter}
                  handlePage={handlePage}
                  totalItems={totalItems}
                ></Pagination>
              </main>
            </div>
          </div>
        ) : (
          <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div>
              <MdSearchOff size={45}></MdSearchOff>
            </div>
            <div className="text-center">
              <p className="mt-6 text-base lg:text-2xl leading-7 text-gray-900">
                Sorry, we couldn’t find the results you’re looking for.
              </p>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

function MobileFilter({
  handleFilter,
  filters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

function DesktopFilter({ handleFilter, filters }) {
  return (
    <div>
      <form className="hidden lg:block">
        <h3 className="sr-only">Categories</h3>
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilter(e, section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </div>
  );
}
