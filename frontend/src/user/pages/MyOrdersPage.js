import FormContainer from "../../shared/components/Utilities/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/components/Utilities/Loader";
import { Alert, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserOrders } from "../../features/orders/orderListSlice";

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
        <Table striped hover responsive >
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </FormContainer>
  );
};

export default MyOrdersPage;
