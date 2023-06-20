import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

//Product component renders a single product
const Product = (props) => {
  return (
    <Card className=" rounded h-100" rounded="true" bg="mlight">
      <Card.Body>
        <Link to={`/products/${props.id}`} id="product-link">
          <Card.Img
            variant="top"
            src={props.image}
            className="p-0"
            rounded="true"
          />
        </Link>
        <Card.Text className="text-mdgray mt-3 mb-1">{props.brand}</Card.Text>
        <Card.Text as="div"><Rating rating={props.rating} /></Card.Text>
        
        <Link to={`/products/${props.id}`} id="product-link">
          <Card.Title className="product-title">{props.name}</Card.Title>
        </Link>
        <Card.Text>${props.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
