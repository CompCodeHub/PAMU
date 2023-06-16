import Loader from "../../shared/components/Utilities/Loader";
import {
  Alert,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import { getOrderDetails } from "../../features/orders/orderDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { clearOrder } from "../../features/orders/createOrderSlice";
import { deliverOrder, resetDeliverOrder } from "../../features/orders/deliverOrderSlice";

// Reponsible for rendering OrderPage
const OrderPage = () => {
  // Get order id from params
  const orderId = useParams().orderId;

  // For dispatching actions
  const dispatch = useDispatch();

  // Get access to deliverOrder state
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = useSelector((state) => state.deliverOrder);

  // Get access to userAuth state
  const { userInfo } = useSelector((state) => state.userAuth);

  // Get access to orderDetail state
  const {
    order,
    loading: loadingOrder,
    error: errorOrder,
  } = useSelector((state) => state.orderDetail);

  // Get order details upon loading this component
  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    // clear current order
    dispatch(clearOrder());
  }, [dispatch, orderId]);

  // Handles deliver order
  const deliverOrderHandler = () => {
    dispatch(deliverOrder(order._id));

    // Refetch order details and reset deliver order state
    setTimeout(() => {
      dispatch(getOrderDetails(orderId));
      dispatch(resetDeliverOrder());
    }
    , 1000);
  };

  return (
    <React.Fragment>
      {loadingOrder ? (
        <Loader />
      ) : errorOrder ? (
        <Alert variant="danger">{errorOrder}</Alert>
      ) : (
        <React.Fragment>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.buyer.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {order.buyer.email}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                    - {order.shippingAddress.postalCode}
                  </p>
                  {order.isDelivered ? (
                    <Alert variant="success">
                      Delivered on {order.deliveredAt}
                    </Alert>
                  ) : (
                    <Alert variant="danger">Not Delivered</Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Alert variant="success">Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert variant="danger">Not Paid</Alert>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  {order.items.map((item, index) => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {loadingDeliver && <Loader />}
                  {errorDeliver && (
                    <Alert variant="danger">{errorDeliver}</Alert>
                  )}
                  {successDeliver && <Alert variant="success">Marked successfully</Alert>}
                  {userInfo && userInfo.isAdmin && !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        variant="mdark"
                        className="border-mdark"
                        onClick={deliverOrderHandler}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OrderPage;
