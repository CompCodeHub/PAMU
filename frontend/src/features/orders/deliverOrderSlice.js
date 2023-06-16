import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async deliver order
export const deliverOrder = createAsyncThunk(
  "deliverOrder/deliverOrder",
  (id, thunkAPI) => {
    return axios
      .put(`/api/orders/${id}/deliver`)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for setting order to delivered
const initialState = {
  success: false,
  loading: false,
  error: null,
};

const deliverOrderSlice = createSlice({
  name: "deliverOrder",
  initialState,
  reducers: {
    resetDeliverOrder: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deliverOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deliverOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(deliverOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeliverOrder } = deliverOrderSlice.actions;

export default deliverOrderSlice.reducer;
