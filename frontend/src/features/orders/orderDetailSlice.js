import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk for getting order details
export const getOrderDetails = createAsyncThunk(
  "orderDetail/getOrderDetails",
  (id, thunkAPI) => {
    return axios
      .get(`/api/orders/${id}`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for order detail
const initialState = {
  order: {},
  loading: true,
  error: null,
};

// slice for order detail
const orderSlice = createSlice({
  name: "orderDetail",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        // Expecting order as payload
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        // Expecting error as payload
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
