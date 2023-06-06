import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async update user
export const updateUser = createAsyncThunk(
  "userUpdate/updateUser",
  async (data, thunkAPI) => {
    return axios
      .put("/api/users/profile", data)
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// initial state for userUpdate
const initialState = {
  updatedUserInfo: {},
  loading: false,
  error: null,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // Expecting updated user
        state.loading = false;
        state.updatedUserInfo = action.payload;
        state.error = null;
        
        //update localstate
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        // Expecting error
        state.loading = false;
        state.error = action.payload;
      });
  
  },
});

export default userUpdateSlice.reducer;
