import { useEffect, useState } from "react";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/user/userAuthSlice";
import Loader from "../../shared/components/Utilities/Loader";

// Responsible for register screen
const RegisterPage = () => {
  // State for name field
  const [name, setName] = useState("");

  // State for email field
  const [email, setEmail] = useState("");

  // State for password field
  const [password, setPassword] = useState("");

  // For dispatching actions
  const dispatch = useDispatch();

  // Get acess to login state
  const { userInfo, error, loading } = useSelector((state) => state.userAuth);

  // For redirecting to other pages
  const history = useHistory();

  // For query params
  const location = useLocation();

  // Look for redirect param
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    // If user is logged in, redirect them
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  // Handles register form submit
  const registerHandler = (event) => {
    event.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}
      <Form onSubmit={registerHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="outline-mdark"
          className="border-mdark mt-3"
        >
          Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already a customer?
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
