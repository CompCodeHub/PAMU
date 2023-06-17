import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async get client Id
export const getClientId = createAsyncThunk(
  "client/getClientId",
  (data, thunkAPI) => {
    return axios
      .get("/api/config/paypal")
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.message));
  }
);

const initialState = {
  clientId: null,
  loading: false,
  error: null,
};

const getPayPalClientIdSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetClientId: (state) => {
      state.clientId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientId.fulfilled, (state, action) => {
        state.clientId = action.payload;
        state.loading = false;
      })
      .addCase(getClientId.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetClientId } = getPayPalClientIdSlice.actions;
export default getPayPalClientIdSlice.reducer;