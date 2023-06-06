import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async create order
export const createOrder = createAsyncThunk(
  "createOrder/createOrder",
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
  success: false,
  error: null,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = {};
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
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
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        // Expection error message as payload
        state.error = action.payload;
        state.loading = false;
        state.success = false;
      });
  },
});

export const { clearOrder } = createOrderSlice.actions;

export default createOrderSlice.reducer;
