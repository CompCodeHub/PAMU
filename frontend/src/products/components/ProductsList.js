import { Row, Col, Container, Alert } from "react-bootstrap";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProducts } from "../../features/products/productListSlice";
import Loader from "../../shared/components/Utilities/Loader";

// ProductsList Component renders list of products
const ProductsList = () => {
  // Used to dispatch an action
  const dispatch = useDispatch();

  // get current state of product list
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  // fetch products upon rendering this component
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <h1>No Products found!</h1>
      ) : (
        <Container>
          <Row>
            {products.map((product) => (
              <Col xs={6} sm={6} md={4} lg={3} xl={3} key={product._id} className="p-2">
                <Product
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  rating={product.rating}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default ProductsList;
