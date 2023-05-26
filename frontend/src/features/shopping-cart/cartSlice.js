import { createSlice } from "@reduxjs/toolkit";

//Get items from local storage
const localCart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Intital state of cart
const initialState = {
  cartItems: localCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Expecting product as payload
      const product = action.payload;

      // Check if item exists in cart
      const exists = state.cartItems.find((item) => item.id === product.id);

      // if it doesn't exist and has an id, push it into cart
      if (!exists && product.id) {
        state.cartItems.push(product);
      }

      // Push it to local storage so it doesn't clear on refresh or exit
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // Expecting product id as payload
      const productId = action.payload;

      // Filter items and update localStorage
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    changeQuantity: (state, action) => {
      // Expecting product id and quantity to set as payload
      const productId = action.payload.id;
      const quantity = action.payload.qty;

      //Update product quantity and local storage
      const product = state.cartItems.find((item) => item.id === productId);
      product.quantity = quantity;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;

export default cartSlice.reducer;
