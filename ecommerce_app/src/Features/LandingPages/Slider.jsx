import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { selectHighlight } from "../AdminPanel/adminSlice";
import { useSelector } from "react-redux";

export default function SliderCard() {
  const highlights = useSelector(selectHighlight);

  useEffect(() => {
    if (!highlights) {
      console.error("Highlights data is missing or undefined.");
      return;
    }

    if (!Array.isArray(highlights)) {
      console.error("Highlights is not an array:", highlights);
      return;
    }

    if (highlights.length === 0) {
      console.warn("Highlights array is empty.");
      return;
    }

    const slider = new Glide(".glide-06", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 15,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, [highlights]);

  return (
    // {/*<!-- Component: Card Slider --> md:h-60 lg:h-96/}
    <div className="bg-black relative w-full h-96 sm:h-30 overflow-hidden rounded shadow-xl glide-06 shadow-slate-200">
      {/*    <!-- Slides --> */}
      <div className="overflow-hidden" data-glide-el="track">
        <ul className="whitespace-no-wrap flex-no-wrap relative flex w-full overflow-hidden p-0">
          {highlights &&
            highlights.map((img) => (
              <li key={img.id}>
                <img
                  src={img.imgsrc}
                  className="w-full h-96 sm:h-30"
                  alt={`Highlight ${img.id}`}
                />
              </li>
            ))}
        </ul>
      </div>
      {/*    <!-- Controls --> */}
      <div
        className="absolute left-0  flex items-center justify-between w-full h-0 px-4 top-1/2"
        data-glide-el="controls"
      >
        <button
          className="inline-flex  items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
          data-glide-dir="<"
          aria-label="prev slide"
        >
          <img src="\left-arrow.png" className="w-6 h-6" />
        </button>
        <button
          className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
          data-glide-dir=">"
          aria-label="next slide"
        >
          <img src="\right-arrow.png" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

/*
{/* <div
        className="absolute bottom-0 flex items-center justify-center w-full gap-2"
        data-glide-el="controls[nav]"
      >
        {/* Indicator buttons 
        {/* For the Jumping to next slide you should check the current index of the highlits when click on next button they should increment by 1
        {highlights &&
          highlights.map((_, index) => (
            <button
              key={index}
              className="p-4 group"
              data-glide-dir={`=${index}`}
              aria-label={`goto slide ${index + 1}`}
            >
              <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 ring-1 ring-slate-700 focus:outline-none"></span>
            </button>
          ))}
      </div> 
*/
