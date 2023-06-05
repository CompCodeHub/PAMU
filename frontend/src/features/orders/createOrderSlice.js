import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  (data, thunkAPI) => {
    return axios
      .post("/api/orders", { ...data })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for order
const initialState = {
  order: {},
  loading: false,
  error: null,
};

const createOrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        // Expecting created order as payload
        state.order = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        // Expection error message as payload
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default createOrderSlice.reducer;
