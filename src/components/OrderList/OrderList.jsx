import './OrderList.css';
import OrderListItem from '../OrderListItem/OrderListItem';

export default function OrderList({ orders, activeOrder, setActiveOrder }) {
  const orderElements = orders.map(order =>
    <OrderListItem
      key={order._id}
      order={order}
      activeOrder={activeOrder}
      setActiveOrder={setActiveOrder}
    />
  );
  return (
    <main className="OrderList">
      {orderElements}
    </main>
  );
}