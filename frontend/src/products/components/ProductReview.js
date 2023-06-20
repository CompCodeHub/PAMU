import { useState } from "react";
import { Alert, Button, Col, Form, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Rating from "./Rating";
import Loader from "../../shared/components/Utilities/Loader";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  createReview,
  resetCreateReview,
} from "../../features/products/createReviewSlice";

// Responsible for rendering product review section on product page
const ProductReview = (props) => {
  // states for rating and comment
  const [rating, setRating] = useState(0);
  const [comments, SetComments] = useState("");

  // For dispatching actions
  const dispatch = useDispatch();

  // For navigation
  const history = useHistory();

  // Get access to createReview state
  const { loading, success, error } = useSelector(
    (state) => state.createReview
  );

  // Get access to userAuth state
  const { userInfo } = useSelector((state) => state.userAuth);

  // Handles creating a review
  const createReviewHandler = (e) => {
    e.preventDefault();

    dispatch(createReview({ productId: props.product._id, rating, comments }));
   
    setTimeout(() => {
      dispatch(resetCreateReview());
      history.go(0);
    }, 2000);
  };

  return (
    <Col className="mt-5" md={6}>
      <h2>Reviews</h2>
      {props.product.reviews.length === 0 && (
        <Alert variant="info">No Reviews</Alert>
      )}
      <ListGroup variant="flush">
        {props.product.reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            <strong>{review.name}</strong>
            <Rating rating={review.rating} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comments}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item>
          <h2>Write a Review</h2>
          {loading && <Loader />}
          {success && <Alert variant="success">Review Submitted</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          {userInfo ? (
            <Form onSubmit={createReviewHandler}>
              <Form.Group controlId="rating" className="my-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment" className="my-2">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  row="3"
                  value={comments}
                  onChange={(e) => SetComments(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type="submit"
                variant="outline-mdark"
                className="border-mdark"
              >
                Submit
              </Button>
            </Form>
          ) : (
            <Alert variant="info">
              Please <Link to="/login">Sign in</Link> to write a review
            </Alert>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default ProductReview;
