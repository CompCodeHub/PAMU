import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// async get user orders
export const getUserOrders = createAsyncThunk(
    'orderList/getUserOrders', 
     (data, {rejectWithValue}) => {
        return axios.get(`/api/orders/myorders`)
        .then(res => res.data)
        .catch(err => rejectWithValue(err.response.data.error));
     });


// Initial state for orderList
const initialState = {
    orders: [],
    loading: true,
    error: null,
}

const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    extraReducers: builder => {
        builder
        .addCase(getUserOrders.pending, state => {
            state.loading = true;
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(getUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    
    }});

export default orderListSlice.reducer;
