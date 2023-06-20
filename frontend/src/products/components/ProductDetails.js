import { Row } from "react-bootstrap";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductPurchase from "./ProductPurchase";
import React from "react";
import ProductReview from "./ProductReview";

// Responsible for rendering product details
const ProductDetails = (props) => {
  return (
    <React.Fragment>
      <Row>
        <ProductImage product={props.product} />
        <ProductDescription product={props.product} />
        <ProductPurchase product={props.product} />
      </Row>
      <Row>
        <ProductReview product={props.product} />
      </Row>
    </React.Fragment>
  );
};

export default ProductDetails;
