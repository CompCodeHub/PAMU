import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

// Responsible for rendering orders
const OrderList = (props) => {
    return (
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
            {props.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                <td>
                  <Link to={`/orders/${order._id}`} style={{ color: "#212A3E" }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default OrderList;