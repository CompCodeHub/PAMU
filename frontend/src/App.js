import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./shared/pages/Home";
import "./App.css";
import "./custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./products/pages/ProductsPage";
import MainHeader from "./shared/components/Navigation/MainHeader";
import MainFooter from "./shared/components/Navigation/MainFooter";
import ProductPage from "./products/pages/ProductPage";
import ShoppingCartPage from "./shopping-cart/pages/ShoppingCartPage";
import LoginPage from "./user/pages/LoginPage";
import RegisterPage from "./user/pages/RegisterPage";
import ShippingPage from "./orders/pages/ShippingPage";
import PrivateRoute from "./shared/components/Navigation/PrivateRoute";
import PaymentSelectPage from "./orders/pages/PaymentSelectPage";
import { useSelector } from "react-redux";
import OrderListPage from "./user/pages/OrderListPage";
import CheckoutPage from "./orders/pages/CheckoutPage";
import OrderPage from "./orders/pages/OrderPage";
import ProfilePage from "./user/pages/ProfilePage";
import MyOrdersPage from "./user/pages/MyOrdersPage";
import ProductListPage from "./products/pages/ProductListPage";
import CreateProductPage from "./products/pages/CreateProductPage";
import EditProductPage from "./products/pages/EditProductPage";

const App = () => {
  // Access to userAuth state
  const { userInfo } = useSelector((state) => state.userAuth);

  return (
    <Router>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products/search/:keyword" exact>
            <Products />
          </Route>
          <Route path="/products/search/:keyword/page/:pageNumber" exact>
            <Products />
          </Route>
          <Route path="/products/page/:pageNumber" exact>
            <Products />
          </Route>
          <Route path="/products/:productId" exact>
            <ProductPage />
          </Route>
          <Route path="/cart/:productId?">
            <ShoppingCartPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <PrivateRoute path="/profile" authorized={userInfo}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/myorders" authorized={userInfo}>
            <MyOrdersPage />
          </PrivateRoute>
          <PrivateRoute path="/shipping" authorized={userInfo}>
            <ShippingPage />
          </PrivateRoute>
          <PrivateRoute path="/payment" authorized={userInfo}>
            <PaymentSelectPage />
          </PrivateRoute>
          <PrivateRoute path="/checkout" authorized={userInfo}>
            <CheckoutPage />
          </PrivateRoute>
          <PrivateRoute path="/orders/:orderId" authorized={userInfo}>
            <OrderPage />
          </PrivateRoute>
          <PrivateRoute
            path="/admin/orders"
            authorized={userInfo && userInfo.isAdmin}
          >
            <OrderListPage />
          </PrivateRoute>
          <PrivateRoute path="/admin/products/page/:pageNumber" authorized={userInfo && userInfo.isAdmin} exact>
            <ProductListPage />
          </PrivateRoute>
          <PrivateRoute path="/admin/products/create" authorized={userInfo && userInfo.isAdmin}>
            <CreateProductPage />
          </PrivateRoute>
          <PrivateRoute path="/admin/products/:productId/edit" authorized={userInfo && userInfo.isAdmin}>
            <EditProductPage />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </main>

      <MainFooter />
    </Router>
  );
};

export default App;
