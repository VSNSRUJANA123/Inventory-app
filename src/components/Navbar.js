import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="nav-content">
      <NavLink className="link" to="/">
        <h2 className="logo">Inventory Management</h2>
      </NavLink>
      <ul className="nav-ul">
        <li>
          <NavLink className="link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/supplier">
            Supplier
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/product">
            Product
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/order">
            Order
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
