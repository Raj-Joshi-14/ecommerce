import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchByProductsFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  createProduct,
  updateProduct,
  fetchKeyWord,
} from "./ProductAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  keywords: [],
  totalItems: 0,
  navsearch: false,
  selectedProduct: null,
  page: 1,
};
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchByProductsFiltersAsync = createAsyncThunk(
  "product/fetchByProductsFilters",
  async ({ filter, keyword, sort, pagination, admin }) => {
    const response = await fetchByProductsFilters(
      filter,
      keyword,
      sort,
      pagination,
      admin
    );
    // console.log(filter);
    // console.log(pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchKeyWordAsync = createAsyncThunk(
  "product/fetchKeyWord",
  async (keyword) => {
    const response = await fetchKeyWord(keyword);
    // console.log(keyword);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    navsearchTrue: (state) => {
      state.navsearch = true;
    },
    navsearchFalse: (state) => {
      state.navsearch = false;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    handlePages: (state, action) => {
      state.page = action.payload;
      // console.log("Payload : ", action.payload);
    },
    // handleSorts: (state, action) => {
    //   state.sorts = action.payload;
    //   console.log("Payload handleSorts : ", action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByProductsFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByProductsFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchKeyWordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKeyWordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.keywords = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const { navsearchTrue } = productSlice.actions;
export const { navsearchFalse } = productSlice.actions;
export const { handlePages } = productSlice.actions;
export const { handleMainKeyword } = productSlice.actions;
// export const { handleSorts } = productSlice.actions;
export const selectPage = (state) => state.product.page;
// export const selectSort = (state) => state.product.sorts;
export const selectkeywords = (state) => state.product.keywords;
export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export const selectTotalItems = (state) => state.product.totalItems;
export const selectnavsearchTrue = (state) => state.product.navsearch;
export default productSlice.reducer;
