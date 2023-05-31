import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import cartReducer from "./features/shopping-cart/cartSlice";
import userAuthReducer from "./features/user/userAuthSlice";

// Central redux store
export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userAuth: userAuthReducer
  },
});
