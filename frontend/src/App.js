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
import Products from "./products/pages/Products";
import MainHeader from "./shared/components/Navigation/MainHeader";
import MainFooter from "./shared/components/Navigation/MainFooter";
import ProductPage from "./products/pages/ProductPage";
import ShoppingCartPage from "./shopping-cart/pages/ShoppingCartPage";
import LoginPage from "./user/pages/LoginPage";
import RegisterPage from "./user/pages/RegisterPage";
import ShippingPage from "./orders/pages/ShippingPage";
import PrivateRoute from "./shared/components/Navigation/PrivateRoute";
import PaymentSelectPage from "./orders/pages/PaymentSelectPage";

const App = () => {
  return (
    <Router>
      <MainHeader />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/products" exact>
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
          <PrivateRoute path="/shipping">
            <ShippingPage />
          </PrivateRoute>
          <PrivateRoute path="/payment">
            <PaymentSelectPage />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </main>

      <MainFooter />
    </Router>
  );
};

export default App;
