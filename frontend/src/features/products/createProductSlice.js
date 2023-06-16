import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async create product
export const createProduct = createAsyncThunk(
  "createProduct/createProduct",
  (productData, thunkAPI) => {
    return axios
      .post("/api/products", productData)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for create product
const initialState = {
  product: {},
  loading: false,
  error: null,
  success: null
};

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetCreateProduct: (state) => {
      state.product = {};
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        // Expecting product as payload
        state.loading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        // Expecting error as payload
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateProduct } = createProductSlice.actions;
export default createProductSlice.reducer;
