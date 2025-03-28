import { useState, useEffect } from 'react';
import * as ordersAPI from '../../utilities/orders-api';
import './OrderHistoryPage.css';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import OrderList from '../../components/OrderList/OrderList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function OrderHistoryPage({ user, setUser }) {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  // The empty dependency array causes the effect
  // to run ONLY after the FIRST render
  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAll();
      setOrders(orders);
      setActiveOrder(orders[0]);
    }
    getOrders();
  }, []);

  return (
    <main className="OrderHistoryPage">
      <aside>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
      />
      <OrderDetail
        order={activeOrder}
      />
    </main>
  );
}