import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async create review
export const createReview = createAsyncThunk(
  "createReview/createReview",
  ({ productId, rating, comments }, thunkAPI) => {
    return axios
      .post(`/api/products/${productId}/reviews`, { rating, comments })
      .then((res) => res.data.message)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const createReviewSlice = createSlice({
  name: "createReview",
  initialState,
  reducers:{
    resetCreateReview: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createReview.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    });
  },
});

export const { resetCreateReview } = createReviewSlice.actions;
export default createReviewSlice.reducer;
