import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../../shared/components/Utilities/Loader";
import {
  Alert,
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { createOrder } from "../../features/orders/createOrderSlice";
import { clearCart } from "../../features/shopping-cart/cartSlice";

// Responsible for displaying checkout screen
const CheckoutPage = () => {
  //Get access to createOrder state
  const { order, success, loading, error } = useSelector(
    (state) => state.createOrder
  );

  // For dispatching actions
  const dispatch = useDispatch();

  // For navigation
  const history = useHistory();

  // Get access to cart state
  const {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    cartItems,
    shippingAddress,
    paymentMethod,
  } = useSelector((state) => state.cart);

  // Redirect if no payment method or address
  useEffect(() => {
    if (!shippingAddress.address) {
      history.push("/shipping");
    } else if (!paymentMethod) {
      history.push("/payment");
    }

    // Navigate to order page if order is successful
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [shippingAddress.address, paymentMethod, history, order._id, success]);

  // Handles placing an order
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        items: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );

    //clear cart items
    dispatch(clearCart());
  };

  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.state} {"-"} {shippingAddress.postalCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.lenth === 0 ? (
                <Alert variant="info">Your cart is empty!</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}{" "}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="border border-2">
                <Row>
                  <Col>Total: </Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  variant="outline-mdark"
                  size="lg"
                  className="border-mdark"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {loading && <Loader />}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CheckoutPage;
