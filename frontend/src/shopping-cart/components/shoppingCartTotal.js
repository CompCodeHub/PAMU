import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Responsible for rendering total amount on shopping cart
const ShoppingCartTotal = (props) => {
  // To navigate to different pages
  let history = useHistory();

  // Current state of cart items
  const { cartItems } = useSelector((state) => state.cart);

  // Handles checkout
  const checkoutHandler = () => {
    history.push("/login?redirect=/shipping");
  };

  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal (
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              disabled={cartItems.length === 0}
              variant="outline-mdark"
              className="border-mdark"
              size="lg"
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ShoppingCartTotal;
