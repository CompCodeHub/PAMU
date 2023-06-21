import { Alert, Button, Form } from "react-bootstrap";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import { useEffect, useState } from "react";
import { convertToBase64 } from "../../shared/components/Utilities/imageConverter";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../../shared/components/Utilities/Loader";
import {
  createProduct,
  resetCreateProduct,
} from "../../features/products/createProductSlice";
import Meta from "../../shared/components/Utilities/Meta";

// Responsible for rendering create product page
const CreateProductPage = () => {
  // State variables for product info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  // For redirecting
  const history = useHistory();

  // For dispatching actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCreateProduct());
  }, [dispatch]);

  // Get access to create product state
  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  // Handles creating product
  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        description,
        image,
        price,
        quantity,
        category,
        brand,
      })
    );

    setTimeout(() => {
      history.push("/admin/products");
    }, 1000);
  };

  // Handles uploading image
  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  // Redirects to product list page
  const cancelHandler = () => {
    history.push("/admin/products");
  };

  return (
    <FormContainer>
      {loading && <Loader />}
      {success && (
        <Alert variant="success">Product created successfully!</Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Meta title="Create Product" />
      <h1>Create Product</h1>
      <Form onSubmit={createProductHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => imageUploadHandler(e)}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-mdark"
          className="border-mdark mt-3 me-3"
        >
          CREATE
        </Button>
        <Button
          type="button"
          variant="outline-mdark"
          className="border-mdark mt-3"
          onClick={cancelHandler}
        >
          CANCEL
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateProductPage;
