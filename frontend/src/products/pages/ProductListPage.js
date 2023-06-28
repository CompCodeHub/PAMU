import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productListSlice";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import Loader from "../../shared/components/Utilities/Loader";
import { Link, useHistory, useParams } from "react-router-dom";
import { resetProductDetail } from "../../features/products/productDetailSlice";
import { deleteProduct } from "../../features/products/deleteProductSlice";
import Paginate from "../../shared/components/Navigation/Paginate";
import Meta from "../../shared/components/Utilities/Meta";

// Responsible for rendering productList on admin products page
const ProductListPage = () => {
  // For dispatching actions
  const dispatch = useDispatch();

  // For redirecting
  const history = useHistory();

  //Get pageNumber from params
  const pageNumber = useParams().pageNumber || 1;

  // Get access to productList state
  const { data, loading, error } = useSelector(
    (state) => state.productList
  );

  // Get access to productDelete state
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    dispatch(getProducts({ pageNumber }));
    dispatch(resetProductDetail());
  }, [dispatch, pageNumber]);

  // Handles deleting a product
  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
      setTimeout(() => {
        history.go(0);
      }, 1000);
    }
  };

  return (
    <Container className="mt-5">
      <Meta title="All Products" />
      <Row className="justify-content-center">
        <Col xs={6} sm={6} md={6} lg={5} xl={4} >
          <h1>Products</h1>
        </Col>
        <Col className="text-end" xs={6} sm={6} md={6} lg={5} xl={4}>
          <Button
            variant="outline-mdark"
            className="border-mdark"
            onClick={() => history.push("/admin/products/create")}
          >
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {successDelete && <Alert variant="success">Product Deleted</Alert>}
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <React.Fragment>
          <Row className="justify-content-center">
            <Col xs={12} sm={12} md={12} lg={10} xl={8} >
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
                  {data.products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <Image
                          src={product.image.url}
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
                        <Button
                          className="border-mdark btn-sm"
                          variant="outline-mdark"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              .
            </Col>
          </Row>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </React.Fragment>
      )}
    </Container>
  );
};

export default ProductListPage;
