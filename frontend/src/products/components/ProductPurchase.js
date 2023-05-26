import { useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

// Responsible for rendering add to cart on product page
const ProductPurchase = (props) => {
  // For managing quantity select
  const [quantity, setQuantity] = useState(1);

  // To navigate to other pages
  let history = useHistory();

  // To get productId in route params
  let productId = useParams().productId;

  // Handles adding items to cart
  const addtoCartHandler = () => {
    history.push(`/cart/${productId}?qty=${quantity}`);
  };

  return (
    <Col md={3}>
      <Card className="mt-3">
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>${props.product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                {props.product.quantity > 0 ? "In Stock" : "Out Of Stock"}
              </Col>
            </Row>
          </ListGroup.Item>
          {props.product.quantity > 0 && (
            <ListGroup.Item>
              <Row>
                <Col>Qty.</Col>
                <Col>
                  <Form.Select
                    aria-label="Quantity selector"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                  >
                    {[...Array(props.product.quantity).keys()].map((number) => (
                      <option key={number + 1}>{number + 1}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <Button
              onClick={addtoCartHandler}
              size="lg"
              className="border-mdark"
              variant="mdark"
              type="button"
              disabled={props.product.quantity === 0}
            >
              Add to Cart
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default ProductPurchase;
