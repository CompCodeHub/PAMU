import { Alert, Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity, removeFromCart } from "../../features/shopping-cart/cartSlice";
import { Link } from "react-router-dom";

// Responsible for rendering current cart items
const ShoppingCartList = () => {
  // To dispatch actions
  const dispatch = useDispatch();

  // Current state of cart items
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Col md={8}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <Alert variant="info">
          Your cart is empty! <Link to="/products" style={{color: "#212A3E"}}>Go Back</Link>
        </Alert>
      ) : (
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/products/${item.id}`} id="product-link">{item.name}</Link>
                </Col>
                <Col md={2}>Price: ${item.price}</Col>
                <Col md={2}>
                  <Form.Select
                    aria-label="Quantity selector"
                    value={item.quantity}
                    onChange={(event) =>
                      dispatch(
                        changeQuantity({
                          id: item.id,
                          qty: Number(event.target.value),
                        })
                      )
                    }
                  >
                    {[...Array(item.inStock).keys()].map((number) => (
                      <option key={number + 1}>{number + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-mdark"
                    className="border-mdark"
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default ShoppingCartList;
