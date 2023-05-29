import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async login
export const login = createAsyncThunk(
  "userLogin/login",
  ({ email, password }, thunkAPI) => {
    // Make a login request
    return axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// Get userInfo from local storage if if exists
const localUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initial state for user
const initialState = {
  userInfo: localUserInfo,
  error: null,
  loading: false,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    logout: (state) => {
      // remove local storage and restore state
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Expecting userinfo as payload
        state.userInfo = action.payload;
        state.loading = false;
        state.error = null;
        // Set localStore to retain login
        if (state.userInfo) {
          localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
      })
      .addCase(login.rejected, (state, action) => {
        // Expecting error as payload
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
