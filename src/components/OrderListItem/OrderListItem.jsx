import './OrderListItem.css';

export default function OrderListItem({ order, activeOrder, setActiveOrder }) {
  const classes = order._id === activeOrder._id ? 'OrderListItem active' : 'OrderListItem';

  return (
    <div className={classes} onClick={() => setActiveOrder(order)}>
      <div>
        <div>Order Id: {order.orderId}</div>
        <div className='subheading-left'>{order.updatedAt.split('T')[0]}</div>
      </div>
      <div>
        <div>${order.orderTotal.toFixed(2)}</div>
        <div className='subheading-right'>{order.totalQty} items</div>
      </div>
    </div>
  );
}