import React from "react";
import SliderCard from "./Slider";
import ProductSlider from "./ProductSlider";
import { ProductGrid } from "../Product/Component/ProductList";

const Home = () => {
  return (
    <>
      {/* <ProductGrid></ProductGrid> */}
      <SliderCard></SliderCard>
      <ProductSlider></ProductSlider>
    </>
  );
};

export default Home;
