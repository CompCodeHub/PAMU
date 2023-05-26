import React, { useEffect } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../features/products/productDetailSlice";
import Loader from "../../shared/components/Utilities/Loader";

// Responsible for individual product page
const ProductPage = () => {
  const dispatch = useDispatch();

  //Get product id
  const productId = useParams().productId;

  // Get current state of product detail
  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );

  // fetch product upon rendering this component
  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId]);

  return (
    <React.Fragment>
      <Container>
        <Button
          type="button"
          as={Link}
          to="/products"
          variant="outline-mdark"
          className="mt-3 border-mdark"
        >
          GO BACK
        </Button>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ProductDetails product={product} />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ProductPage;
