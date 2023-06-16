import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async get product
export const getProductById = createAsyncThunk(
  "productDetail/getProductById",
  (id, thunkAPI) => {
    return axios
      .get(`/api/products/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.message));
  }
);

//Initial state for product Details
const initialState = {
  product: {},
  loading: true,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetailSlice",
  initialState,
  reducers: {
    resetProductDetail: (state) => {
      state.product = {};
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer;
