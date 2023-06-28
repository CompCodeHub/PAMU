import { Col, Image } from "react-bootstrap";

// Responsible for rendering image on product page
const ProductImage = (props) => {
  return (
    <Col md={6} xs={11} className="mx-auto">
      <Image
        src={props.product.image.url}
        rounded="true"
        alt={props.product.name}
        className="border border-dark mt-3 h-100 w-100"
        fluid
      />
    </Col>
  );
};

export default ProductImage;
