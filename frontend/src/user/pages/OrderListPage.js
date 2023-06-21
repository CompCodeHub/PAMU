import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../features/orders/orderListSlice';
import FormContainer from '../../shared/components/Utilities/FormContainer';
import Loader from '../../shared/components/Utilities/Loader';
import { Alert } from 'react-bootstrap';
import OrderList from '../components/OrderList';
import Meta from '../../shared/components/Utilities/Meta';

// Responsible for rendering orderlist for admin
const OrderListPage = () =>{

    // Get orderList state
    const {orders, loading, error} = useSelector(state => state.orderList);

    // For dispatching actions
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllOrders());
    }, [dispatch])

   return <FormContainer>
   <Meta title="All Orders" />
    <h2>Orders</h2>
    {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <OrderList orders={orders} />
      )}
   </FormContainer>
}

export default OrderListPage;