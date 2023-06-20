import { useEffect, useState } from "react";
import FormContainer from "../../shared/components/Utilities/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../../features/shopping-cart/cartSlice";

// Responsible for rendering payment select
const PaymentSelectPage = () => {
  // state for payment method
  const [paymentMethod, setPaymentMethod] = useState("Paypal or Credit Card");

  // For dispatching actions
  const dispatch = useDispatch();

  // For navigation
  const history = useHistory();

  // Get access to cart state
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, [shippingAddress, history]);

  // Handles going to order page
  const paymentMethodHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/checkout");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={paymentMethodHandler}>
        <Form.Group>
          <Form.Label>Select a payment method</Form.Label>
          <Form.Check
            type="radio"
            id="PayPal"
            label="Paypal or Credit Card"
            value="Paypal"
            checked={paymentMethod === "Paypal or Credit Card"}
            onChange={(event) => setPaymentMethod(event.target.value)}
          />
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

export default PaymentSelectPage;
