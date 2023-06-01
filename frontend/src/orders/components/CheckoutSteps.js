import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Responsible for rendering checkout steps during checkout process
const CheckoutSteps = (props) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {props.step1 ? (
          <Nav.Link as={NavLink} to="/login">
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <Nav.Link as={NavLink} to="/shipping">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step3 ? (
          <Nav.Link as={NavLink} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step4 ? (
          <Nav.Link as={NavLink} to="/placeorder">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
