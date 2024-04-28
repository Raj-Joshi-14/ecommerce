import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewFlex,
  deleteFlex,
  fetchHighlights,
  fetchTopProduts,
  fetchTopSearch,
  updateFlex,
  updateTopSearch,
} from "./adminAPI";
import { toast } from "react-toastify";
const initialState = {
  value: 0,
  status: "idle",
  updateStatus: false,
  addStatus: false,
  fetchtopProduts: [],
  highlights: [],
  top10category: [],
};

export const addNewFlexAsync = createAsyncThunk(
  "flex/addNewFlex",
  async ({ item }) => {
    try {
      const response = await addNewFlex(item);
      return response.data;
    } catch (error) {
      console.error("Error adding new flex:", error);
      toast.error("Failed to add item");
      throw error; // Rethrow the error to mark the action as rejected
    }
  }
);
// To update the top 10 product category
export const updateTopSearchAsync = createAsyncThunk(
  "flex/updateTopSearch",
  async (data) => {
    const response = await updateTopSearch(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchTopProdutsAsync = createAsyncThunk(
  "flex/fetchTopProduts",
  async (query) => {
    const response = await fetchTopProduts(query);
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchTopSearchAsync = createAsyncThunk(
  "flex/fetchTopSearch",
  async () => {
    try {
      const response = await fetchTopSearch(); // Make sure your API call function is correct
      return response.data;
    } catch (error) {
      console.error("Error fetching top search:", error);
      throw error;
    }
  }
);

export const fetchHighlightsAsync = createAsyncThunk(
  "flex/fetchHighlights",
  async () => {
    const response = await fetchHighlights();
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateFlexAsync = createAsyncThunk(
  "flex/updateFlex",
  async ({ imgsrc, id }) => {
    const response = await updateFlex(imgsrc, id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteFlexAsync = createAsyncThunk(
  "flex/deleteFlex",
  async (itemId) => {
    const response = await deleteFlex(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const adminSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "flex",
  initialState,
  reducers: {
    updateStatusTrue: (state) => {
      state.updateStatus = true;
    },
    updateStatusFalse: (state) => {
      state.updateStatus = false;
    },
    addStatusTrue: (state) => {
      state.addStatus = true;
    },
    addStatusFalse: (state) => {
      state.addStatus = false;
    },
  },
  extraReducers(builder) {
    builder
      ///fetchHighlightsAsync
      .addCase(fetchHighlightsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHighlightsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.highlights = action.payload;
      })
      ////fetchTopProdutsAsync
      .addCase(fetchTopProdutsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopProdutsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.fetchtopProduts = action.payload;
      })
      //// fetchTopSearchAsync
      .addCase(fetchTopSearchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopSearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.top10category = action.payload;
        // console.log(action.payload);
      })
      ///////////////
      .addCase(addNewFlexAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewFlexAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.highlights.push(action.payload);
        // console.log(action.payload);
      })
      .addCase(updateFlexAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFlexAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.highlights.findIndex(
          (highlight) => highlight.id === action.payload.id
        );
        state.highlights[index] = action.payload;
      })
      ///// Update Top Search Async
      .addCase(updateTopSearchAsync.pending, (state) => {
        state.status = "loading";
      })
      /// Always check if error occur for id undefine or any other error related
      // to id look over the mongodb database for the correct id of the
      //field for updation we mention id in adminAPI
      //let id = "64db962d7557b1e9c340a896";
      .addCase(updateTopSearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log("Payload at line 167:", action.payload);
        // console.log("Payload at line 168:", action.payload);
        const index = state.top10category.findIndex(
          (top10categorys) => top10categorys.id === action.payload.id
        );
        state.top10category[index] = action.payload;
      })
      //////
      .addCase(deleteFlexAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFlexAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.highlights.findIndex(
          (highlight) => highlight.id === action.payload.id
        );
        state.highlights.splice(index, 1);
      });
  },
});
export const selectHighlight = (state) => state.flex.highlights;
export const selectUpdateStatus = (state) => state.flex.updateStatus;
export const selectAddStatus = (state) => state.flex.addStatus;
export const selectfetchtopProduts = (state) => state.flex.fetchtopProduts;
export const selectTopSearch = (state) => state.flex.top10category;
export const { updateStatusTrue } = adminSlice.actions;
export const { updateStatusFalse } = adminSlice.actions;
export const { addStatusFalse } = adminSlice.actions;
export const { addStatusTrue } = adminSlice.actions;
// export const selectCartLoaded = (state) => state.cart.cartLoaded;
export default adminSlice.reducer;
