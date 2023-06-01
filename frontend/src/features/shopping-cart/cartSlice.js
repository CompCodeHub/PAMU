import { createSlice } from "@reduxjs/toolkit";

// Intital state of cart
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      // Expecting product id as payload
      const productId = action.payload;

      // Filter items and update localStorage
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    changeQuantity: (state, action) => {
      // Expecting product id and quantity to set as payload
      const productId = action.payload.id;
      const quantity = action.payload.qty;

      //Update product quantity and local storage
      const product = state.cartItems.find((item) => item.id === productId);
      product.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      // Expecting shipping address as payload
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      // Expecting payment method as payload
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    }
  },
});

export const { addToCart, removeFromCart, changeQuantity, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;
