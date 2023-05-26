import { Col, ListGroup } from "react-bootstrap";

// Responsible for rendering product's description on product page
const ProductDescription = (props) => {
  return (
    <Col md={3}>
      <ListGroup variant="flush" className="mt-3 text-left">
        <ListGroup.Item as="h1">{props.product.name}</ListGroup.Item>
        <ListGroup.Item as="h4">Price: ${props.product.price}</ListGroup.Item>
        <ListGroup.Item>
          Description: {props.product.description}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ProductDescription;
