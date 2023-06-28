import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import Loader from "../../shared/components/Utilities/Loader";
import { Alert, Button, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import {
  resetUpdateProduct,
  updateProduct,
} from "../../features/products/updateProductSlice";
import { getProductById } from "../../features/products/productDetailSlice";
import Meta from "../../shared/components/Utilities/Meta";
import axios from "axios";

// Responsible for rendering edit product page
const EditProductPage = () => {
  // Get product id from params
  const { productId } = useParams();

  // For redirecting
  const history = useHistory();

  // State variables for product info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  // Get access to update product state
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.updateProduct);

  // Get access to product detail state
  const {
    product,
    loading: loadingProductDetail,
    error: errorProductDetail,
  } = useSelector((state) => state.productDetail);

  // For dispatching actions
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset update product state
    dispatch(resetUpdateProduct());

    // If product id is not the same as the product id in the url, get product by id
    if (product._id !== productId) {
      dispatch(getProductById(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category);
      setBrand(product.brand);
    }
  }, [dispatch, product, productId]);

  // Handles creating product
  const editProductHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        id: productId,
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
      history.push("/admin/products/page/1");
    }, 1000);
  };

  // Handles uploading image
  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Set config
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const res = await axios.post("/api/uploads/image", formData, config);

      // set local state
      setImage({
        id: res.data.id,
        url: res.data.url,
      });
    } catch (error) {
      console.log(error);
    
    }
  };

  // Redirects to product list page
  const cancelHandler = async () => {
    // Send delete request
    try {
      await axios.delete(`/api/uploads/image/${image.id}`);
      setImage({});
    }catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      {loadingUpdate && <Loader />}
      {successUpdate && (
        <Alert variant="success">Product updated successfully!</Alert>
      )}
      {errorUpdate && <Alert variant="danger">{errorUpdate}</Alert>}
      {loadingProductDetail ? (
        <Loader />
      ) : errorProductDetail ? (
        <Alert variant="danger">{errorProductDetail}</Alert>
      ) : (
        <React.Fragment>
          <Meta title="Edit Product" />
          <h1>Edit Product</h1>
          <Form onSubmit={editProductHandler}>
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
              className="border-mdark mt-3"
            >
              UPDATE
            </Button>
            <Button
              type="button"
              variant="outline-mdark"
              className="border-mdark mt-3 me-3"
              onClick={cancelHandler}
            >
              CANCEL
            </Button>
          </Form>
        </React.Fragment>
      )}
    </FormContainer>
  );
};

export default EditProductPage;
