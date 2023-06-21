import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  addToCart,
} from "../../features/shopping-cart/cartSlice";
import {
  Container,
  Row,
} from "react-bootstrap";
import ShoppingCartList from "../components/ShoppingCartList";
import ShoppingCartTotal from "../components/shoppingCartTotal";
import Meta from "../../shared/components/Utilities/Meta";

const ShoppingCartPage = () => {
  // Get the product id id its there
  let productId = useParams().productId;

  // To get query params
  let location = useLocation();

  // To dispatch actions
  let dispatch = useDispatch();

  // Get the quantity from query params
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;

  // Get access to current product
  const { product } = useSelector((state) => state.productDetail);

  
  useEffect(() => {
    // If we go to cart page from addtocart button
    if (productId) {
      dispatch(
        addToCart({
          id: product._id,
          image: product.image,
          name: product.name,
          price: product.price,
          inStock: product.quantity,
          quantity: quantity,
        })
        
      );
    }
    // eslint-disable-next-line
  }, [dispatch, productId, quantity]);


  return (
    <Container>
      <Meta title="Shopping Cart" />
      <Row>
        <ShoppingCartList />
        <ShoppingCartTotal />
      </Row>
    </Container>
  );
};

export default ShoppingCartPage;
