import { Col, Image } from "react-bootstrap";

// Responsible for rendering image on product page
const ProductImage = (props) => {
  return (
    <Col md={5}>
      <Image
        src={props.product.image}
        rounded="true"
        alt={props.product.name}
        className="border border-dark mt-3"
        fluid
        style={{ height: "528px" }}
      />
    </Col>
  );
};

export default ProductImage;
