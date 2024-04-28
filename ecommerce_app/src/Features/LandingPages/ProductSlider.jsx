import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTopProdutsAsync,
  fetchTopSearchAsync,
  selectTopSearch,
  selectfetchtopProduts,
} from "../AdminPanel/adminSlice";
import { Link } from "react-router-dom";

export default function ProductSlider() {
  const top10product = useSelector(selectfetchtopProduts);
  const top10proTittle = useSelector(selectTopSearch);
  const [topProductTittle, setTopProductTittle] = useState("");
  const dispatch = useDispatch();
  const topsea = useSelector(selectTopSearch);
  useEffect(() => {
    if (topsea && topsea[0] && topsea[0].topsearch !== undefined) {
      // console.log("Top 10 : ", topsea[0].topsearch);
      dispatch(fetchTopProdutsAsync(topsea[0].topsearch));
    }
    if (top10proTittle.length > 0) {
      switch (top10proTittle[0].topsearch) {
        case "topcostly":
          setTopProductTittle("Top Costly Products");
          break;
        case "toprated":
          setTopProductTittle("Top Rated Products");
          break;
        case "topcheapest":
          setTopProductTittle("Top Cheap Products");
          break;
        default:
          setTopProductTittle(""); // Handle default case
      }
    }
  }, [top10proTittle]);

  useEffect(() => {
    if (!top10product) {
      console.error("Highlights data is missing or undefined.");
      return;
    }

    if (!Array.isArray(top10product)) {
      console.error("Highlights is not an array:", top10product);
      return;
    }
    if (top10product.length === 0) {
      console.warn("Highlights array is empty.");
      return;
    }
    const slider = new Glide(".glide-01", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      // autoplay: 3000,
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
  }, [top10product]);

  return (
    // {/*<!-- Component: Carousel with controls inside  bg-black--> */}
    <div className="glide-01 z-0 m-2 relative">
      <h1 className="text-xl font-bold m-2">{topProductTittle}</h1>
      <div className="overflow-hidden" data-glide-el="track">
        <ul className="whitespace-no-wrap flex-no-wrap relative flex w-full overflow-hidden p-0">
          {/*    <!-- Slides --> */}
          {top10product.map((prod) => (
            <Link key={prod.id} to={`/productdetails/${prod.id}`}>
              <li key={prod.id}>
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  className="mx-auto w-64 h-64"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/path/to/fallback-image.jpg"; // Provide a fallback image path
                    e.target.onerror = null; // Prevent infinite loop in case fallback image also fails to load
                  }}
                />
                {/* {console.log(prod.title, prod.thumbnail)} */}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/*    <!-- Controls --> */}
      <div
        className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4"
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
      {/*<!-- End Carousel with controls inside --> */}
    </div>
  );
}
