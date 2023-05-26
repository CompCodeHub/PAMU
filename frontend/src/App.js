import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./shared/pages/Home";
import "./App.css";
import "./custom.scss"
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./products/pages/Products";
import MainHeader from "./shared/components/Navigation/MainHeader";
import MainFooter from "./shared/components/Navigation/MainFooter";
import ProductPage from "./products/pages/ProductPage";
import ShoppingCartPage from "./shopping-cart/pages/ShoppingCartPage";

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
          <Redirect to="/" />
        </Switch>
      </main>

      <MainFooter />
    </Router>
  );
};

export default App;
