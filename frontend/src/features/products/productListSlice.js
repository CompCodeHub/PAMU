import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async get products
export const getProducts = createAsyncThunk(
  "productList/getProducts",
  ({ keyword, pageNumber }, thunkAPI) => {
    return axios
      .get("/api/products", { params: { keyword, pageNumber } })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.message));
  }
);

// initial state for productList
const initialState = {
  data: {
    products: [],
    page: 1,
    pages: 1,
  },
  loading: true,
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productListSlice.reducer;
