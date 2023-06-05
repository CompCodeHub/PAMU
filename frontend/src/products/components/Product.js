import { Link } from "react-router-dom/";
import { Card } from "react-bootstrap";

//Product component renders a single product
const Product = (props) => {
  return (
    <Card
      className="mt-3 rounded border border-3"
      rounded="true"
      bg="mlgray"
      border="dark"
    >
      <Card.Body>
        <Link to={`/products/${props.id}`}>
          <Card.Img
            variant="top"
            src={props.image}
            className="border border-3 border-dark"
            rounded="true"
          />

          <Card.Text className="text-mdgray mt-3 mb-1">{props.brand}</Card.Text>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>${props.price}</Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
