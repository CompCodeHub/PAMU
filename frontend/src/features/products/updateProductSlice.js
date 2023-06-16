import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async update product
export const updateProduct = createAsyncThunk(
  "updateProduct/updateProduct",
  (data, thunkAPI) => {
    return axios
      .put(`/api/products/${data.id}`, data)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

const initialState = {
  product: {},
  success: false,
  loading: false,
  error: null,
};

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateProduct: (state) => {
      state.product = {};
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        // Expecting product as payload
        state.loading = false;
        state.success = true;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        // Expecting error as payload
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUpdateProduct } = updateProductSlice.actions;   
export default updateProductSlice.reducer;
