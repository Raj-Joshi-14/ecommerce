import React from "react";
import { ProductGrid } from "../Features/Product/Component/ProductList";
import NavBar from "../Features/Navbar/Navbar";
const ProductPageBySearch = () => {
  return (
    <>
      <NavBar>
        <ProductGrid></ProductGrid>
      </NavBar>
    </>
  );
};

export default ProductPageBySearch;
