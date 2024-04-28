import Glide from "@glidejs/glide";
import React, { useState } from "react";
import { useEffect } from "react";
import { selectAllProducts } from "../../Product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { selectfetchtopProduts, updateTopSearchAsync } from "../adminSlice";
const categories = [
  { id: "1", name: "Top Rated Products", query: "toprated" },
  { id: "2", name: "Top Costly Products", query: "topcostly" },
  { id: "3", name: "Top Cheap Products", query: "topcheapest" },
  // { id: "1", name: "Top Tech Products" },
  // { id: "1", name: "Top Brands Products" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const TopProductEdit = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectfetchtopProduts);
  const [selectedCategories, setSelectedCategories] = useState();
  const [selectedQuery, setSelectedQuery] = useState();
  useEffect(() => {
    const slider = new Glide(".glide-03", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      //   autoplay: 3000,
      animationDuration: 700,
      gap: 15,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, [products]);

  return (
    // Top Most Rated Product or most view product etc ------------------------------------------------------------------------------------
    <>
      {/*<!-- Component: Carousel with indicators & controls inside --> */}

      <div className="glide-03 relative w-10/12 ml-7 md:ml-24 lg:ml-32 mt-10 mb-20">
        <p className="mb-6 sm:text-lg lg:text-2xl">
          <b>Top Product</b>
        </p>
        <Menu as="div" className="relative text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {selectedCategories
                ? selectedCategories
                : "Select For Top Categories"}
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {categories.map((cate) => (
                  <Menu.Item key={cate.id}>
                    {({ active }) => (
                      <div
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategories(cate.name);
                          setSelectedQuery(cate.query);
                          const data = {
                            topsearch: cate.query,
                          };
                          // console.log(data);
                          dispatch(updateTopSearchAsync(data));
                          // console.log(cate.query);
                        }}
                      >
                        {cate.name}
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {products.map((product) => (
              <li key={product.id}>
                <img src={product.thumbnail} className="mx-auto w-64 h-64" />
              </li>
            ))}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default TopProductEdit;
