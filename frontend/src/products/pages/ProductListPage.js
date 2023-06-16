import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productListSlice";
import { Alert, Button, Col, Image, Row, Table } from "react-bootstrap";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import Loader from "../../shared/components/Utilities/Loader";
import { Link, useHistory } from "react-router-dom";
import { resetProductDetail } from "../../features/products/productDetailSlice";

// Responsible for rendering productList on admin products page
const ProductListPage = () => {
  // For dispatching actions
  const dispatch = useDispatch();

  // For redirecting
  const history = useHistory();

  // Get access to productList state
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getProducts());
    dispatch(resetProductDetail());
  }, [dispatch]);

  // Handles deleting a product
  const deleteProductHandler = (id) => {
    console.log(id);
  };

  return (
    <FormContainer>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-mdark"
            className="border-mdark"
            onClick={() => history.push("/admin/products/create")}
          >
            Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <React.Fragment>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </td>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/products/${product._id}/edit`}>
                      <Button
                        className="border-mdark btn-sm"
                        variant="outline-mdark"
                      >
                        {" "}
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </Link>{" "}
                  </td>
                  <td>
                    <Link to={`/admin/products/${product._id}/delete`}>
                      <Button
                        className="border-mdark btn-sm"
                        variant="outline-mdark"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      )}
    </FormContainer>
  );
};

export default ProductListPage;