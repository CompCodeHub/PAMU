import { createSlice } from "@reduxjs/toolkit";

// Adds decimal to a number
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


// Updates cart state with prices
const updateCartState = (state) => {
  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Calculate the shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
}

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

      // update cart state
      updateCartState(state);
    },
    removeFromCart: (state, action) => {
      // Expecting product id as payload
      const productId = action.payload;

      // Filter items and update state
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      updateCartState(state);
    },
    changeQuantity: (state, action) => {
      // Expecting product id and quantity to set as payload
      const productId = action.payload.id;
      const quantity = action.payload.qty;

      //Update product quantity and local storage
      const product = state.cartItems.find((item) => item.id === productId);
      product.quantity = quantity;
      updateCartState(state);
    },
    saveShippingAddress: (state, action) => {
      // Expecting shipping address as payload
      state.shippingAddress = action.payload;
      updateCartState(state);
    },
    savePaymentMethod: (state, action) => {
      // Expecting payment method as payload
      state.paymentMethod = action.payload;
      updateCartState(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      updateCartState(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
