import Loader from "../../shared/components/Utilities/Loader";
import { Alert, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { getOrderDetails } from "../../features/orders/orderDetailSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import React, { useEffect } from "react";

// Reponsible for rendering OrderPage
const OrderPage = () => {
  // Get order id from params
  const orderId = useParams().orderId;

  // For dispatching actions
  const dispatch = useDispatch();

  // Get access to orderDetail state
  const { order, loading, error } = useSelector((state) => state.orderDetail);

  // Get order details upon loading this component
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
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
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
