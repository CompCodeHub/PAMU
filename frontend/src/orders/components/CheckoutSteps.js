import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Responsible for rendering checkout steps during checkout process
const CheckoutSteps = (props) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {props.step1 ? (
          <Nav.Link as={NavLink} to="/login" className="text-mdark">
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <Nav.Link as={NavLink} to="/shipping" className="text-mdark">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step3 ? (
          <Nav.Link as={NavLink} to="/payment" className="text-mdark">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step4 ? (
          <Nav.Link as={NavLink} to="/checkout" className="text-mdark">
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
