import { useState } from "react";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../features/shopping-cart/cartSlice";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

// Responsible for shipping page
const ShippingPage = () => {
  // For navigation
  const history = useHistory();

  // For dispatching actions
  const dispatch = useDispatch();

  // Get shipping address state
  const { shippingAddress } = useSelector((state) => state.cart);

  // States for complete address
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, setState] = useState(shippingAddress.state || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  // Handles saving shipping address state
  const shippingHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        postalCode,
      })
    );

    // Navigate to payment
    history.push("/payment");
  };

  return (
    <FormContainer>
    <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={shippingHandler}>
        <Form.Group controlId="address" className="mt-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="mt-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state" className="mt-2">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(event) => setState(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalcode" className="mt-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="outline-mdark"
          className="border-mdark mt-3"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
