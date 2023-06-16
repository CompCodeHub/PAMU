import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async delete products
export const deleteProduct = createAsyncThunk(
  "deleteProduct/deleteProduct",
  (id, thunkAPI) => {
    return axios
      .delete(`/api/products/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for delete product
const initialState = {
  loading: false,
  error: null,
  success: false,
};

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetDeleteProduct: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetDeleteProduct } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;