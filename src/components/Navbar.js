import "../styles/navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Navbar = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };

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
        {!token ? (
          <li>
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </li>
        ) : (
          <li onClick={handleLogout}>Logout</li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
