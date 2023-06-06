import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async pay order
export const payOrder = createAsyncThunk(
  "payOrder/payOrder",
  ({ orderId, details }, { rejectWithValue }) => {
    return axios
      .put(`/api/orders/${orderId}/pay`, { ...details })
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data.error));
  }
);

// Inital state for payorder slice
const initialState = {
  order: {},
  loading: false,
  error: null,
};

const payOrderSlice = createSlice({
  name: "payOrder",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(payOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        // Expecting updated order as payload
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(payOrder.rejected, (state, action) => {
        // Expecting error as payload
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default payOrderSlice.reducer;
