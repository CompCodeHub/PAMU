import { Row, Col, Container, Alert, Button } from "react-bootstrap";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProducts } from "../../features/products/productListSlice";
import Loader from "../../shared/components/Utilities/Loader";
import { useParams, useHistory } from "react-router-dom";
import Paginate from "../../shared/components/Navigation/Paginate";

// ProductsList Component renders list of products
const ProductsList = () => {
  // Used to dispatch an action
  const dispatch = useDispatch();

  // Used to navigate between pages
   const history = useHistory();

  // Get page number from url
  const { keyword, pageNumber } = useParams();

  // get current state of product list
  const { data, loading, error } = useSelector((state) => state.productList);

  // fetch products upon rendering this component
  useEffect(() => {
    dispatch(getProducts({ keyword, pageNumber }));
  }, [dispatch, pageNumber, keyword]);

  return (
    <React.Fragment>
      {keyword && (
        <Container>
          {" "}
          <h2>Search results for "{keyword}"</h2>
          <Button type="button" variant="outline-mdark" className="border-mdark" onClick={() => history.push("/")}>Go Back</Button>
        </Container>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : data.products.length === 0 ? (
        <h1>No Products found!</h1>
      ) : (
        <Container>
          <Row>
            {data.products.map((product) => (
              <Col
                xs={6}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={product._id}
                className="p-2"
              >
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
          <Row className="mt-3">
            {pageNumber && (
              <Paginate
                page={data.page}
                pages={data.pages}
                keyword={keyword ? keyword : ""}
              />
            )}
          </Row>
        </Container>
      )}
    </React.Fragment>
  );
};

export default ProductsList;
