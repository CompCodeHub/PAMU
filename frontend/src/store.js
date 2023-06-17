import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./features/products/productListSlice";
import productDetailReducer from "./features/products/productDetailSlice";
import cartReducer from "./features/shopping-cart/cartSlice";
import userAuthReducer from "./features/user/userAuthSlice";
import createOrderReducer from "./features/orders/createOrderSlice";
import orderDetailReducer from "./features/orders/orderDetailSlice";
import userUpdateReducer from "./features/user/userUpdateSlice";
import orderListReducer from "./features/orders/orderListSlice";
import getPayPalClientIdReducer from "./features/orders/getPayPalClientIdSlice";
import deliverOrderReducer from "./features/orders/deliverOrderSlice";
import createProductReducer from "./features/products/createProductSlice";
import updateProductReducer from "./features/products/updateProductSlice";
import deleteProductReducer from "./features/products/deleteProductSlice";

// Central redux store
export const store = configureStore({
  reducer: {
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userAuth: userAuthReducer,
    userUpdate: userUpdateReducer,
    createOrder: createOrderReducer,
    orderDetail: orderDetailReducer,
    orderList: orderListReducer,
    deliverOrder: deliverOrderReducer,
    getPayPalClientId: getPayPalClientIdReducer,
  },
});
