import { Link } from "react-router-dom"
import * as usersService from "../../utilities/users-service"

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service:
    usersService.logOut();
    setUser(null);
  } 
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
      {/* 'Log Out' could be a Link or a button depending on desired look. */}
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  )
}