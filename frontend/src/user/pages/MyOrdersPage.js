import FormContainer from "../../shared/components/Utilities/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/components/Utilities/Loader";
import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { getUserOrders } from "../../features/orders/orderListSlice";
import OrderList from "../components/OrderList";

// Responsible for rendering user orders list
const MyOrdersPage = () => {
  // Get orderList state
  const { orders, loading, error } = useSelector((state) => state.orderList);

  // For dispatching actions
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <FormContainer>
      <h2>Your Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <OrderList orders={orders} />
      )}
    </FormContainer>
  );
};

export default MyOrdersPage;
