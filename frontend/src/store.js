import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import cartReducer from "./features/shopping-cart/cartSlice";
import userAuthReducer from "./features/user/userAuthSlice";
import createOrderReducer from "./features/orders/createOrderSlice";
import orderDetailReducer from "./features/orders/orderDetailSlice";
import payOrderReducer from "./features/orders/payOrderSlice";
import userUpdateReducer from "./features/user/userUpdateSlice";
import orderListReducer from "./features/orders/orderListSlice";

// Central redux store
export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userAuth: userAuthReducer,
    userUpdate: userUpdateReducer,
    createOrder: createOrderReducer,
    orderDetail: orderDetailReducer,
    payOrder: payOrderReducer,
    orderList: orderListReducer
  },
});
