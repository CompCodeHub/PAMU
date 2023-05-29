import { createSlice } from "@reduxjs/toolkit";


// initial state for registration
const initalState = {
    userInfo: null,
    loading: false,
    error: null
}

const userRegisterSlice = createSlice();


export default userRegisterSlice.reducer;
