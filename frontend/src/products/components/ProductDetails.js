import { Row } from "react-bootstrap";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductPurchase from "./ProductPurchase";

// Responsible for rendering product details
const ProductDetails = (props) => {
  return (
    <Row>
      <ProductImage product={props.product} />
      <ProductDescription product={props.product} />
      <ProductPurchase product={props.product} />
    </Row>
  );
};

export default ProductDetails;
