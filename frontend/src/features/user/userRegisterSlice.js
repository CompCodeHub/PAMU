import { createSlice } from "@reduxjs/toolkit";


// initial state for registration
const initialState = {
    userInfo: null,
    loading: false,
    error: null
}

const userRegisterSlice = createSlice({
    name: "userRegister",
    initialState
});


export default userRegisterSlice.reducer;
