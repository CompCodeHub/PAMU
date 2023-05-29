import { useEffect, useState } from "react";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/user/userLoginSlice";
import Loader from "../../shared/components/Utilities/Loader";

// Responsible for login screen
const LoginPage = () => {
  // State for email field
  const [email, setEmail] = useState("");

  // State for password field
  const [password, setPassword] = useState("");

  // For dispatching actions
  const dispatch = useDispatch();

  // Get acess to login state
  const { userInfo, error, loading } = useSelector((state) => state.userLogin);

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

  // Handles login form submit
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(login({ email: email, password: password }));
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loader />}
      <Form onSubmit={loginHandler}>
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
          Log In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
