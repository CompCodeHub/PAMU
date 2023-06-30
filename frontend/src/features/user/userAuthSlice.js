import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// async login
export const login = createAsyncThunk(
  "userAuth/login",
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

// async logout
export const logout = createAsyncThunk("userAuth/logout", (data, thunkAPI) => {
  // Make a logout request
  return axios
    .post("/api/users/logout")
    .then((res) => res.data)
    .catch((err) => thunkAPI.rejectWithValue("Error: Couldn't logout!"));
});

// async register
export const register = createAsyncThunk(
  "userAuth/register",
  ({ name, email, password }, thunkAPI) => {
    // Make a register request
    return axios
      .post("/api/users", { name, email, password })
      .then((res) => res.data)
      .catch((err) => thunkAPI.rejectWithValue(err.response.data.error));
  }
);

// Logs in user based on cookie
const getUserInfo = () => {
  if (Cookies.get("jwt")) {
    if(localStorage.getItem("userInfo")){
      return JSON.parse(localStorage.getItem("userInfo"));
    }
  } else {
    if (localStorage.getItem("userInfo")) {
      localStorage.removeItem("userInfo");
    }

    return null;
  }
};

// initial state for user
const initialState = {
  userInfo: getUserInfo(),
  error: null,
  loading: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
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

    builder
      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        // remove local storage and restore state
        localStorage.removeItem("userInfo");
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {});

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // Expecting userinfo as payload
        state.userInfo = action.payload;
        state.loading = false;
        state.error = null;
        // Set localStore to retain login
        if (state.userInfo) {
          localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
      })
      .addCase(register.rejected, (state, action) => {
        // Expecting error as payload
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userAuthSlice.reducer;
