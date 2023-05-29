import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import cartReducer from "./features/shopping-cart/cartSlice";
import userLoginReducer from "./features/user/userLoginSlice";
import userRegisterReducer from "./features/user/userRegisterSlice";

// Central redux store
export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
  },
});
