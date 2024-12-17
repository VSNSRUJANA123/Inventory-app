import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidenav.css";
import Cookies from "js-cookie";
const Sidenav = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/login");
  };
  return (
    <div className="side-nav-content">
      <NavLink className="link" to="/dashboard">
        <h5 className="admin-title">Dashboard</h5>
      </NavLink>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        <ul>
          <li>
            <NavLink className="link" to="/employee">
              Employee
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
            <NavLink className="link" to="/purchase">
              Purchase
            </NavLink>
          </li>
          <li>
            <button className="logOut-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
