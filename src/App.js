import Home from "./components/Home.js";
import NotFound from "./components/NotFound.js";
import Order from "./components/Order.js";
import Product from "./components/Product.js";
import Supplier from "./components/Supplier.js";
import Employee from "./components/Employee.js";
import Login from "./components/Login.js";
import Admin from "./components/Admin.js";
import Register from "./components/Register.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  if (!token) return <Navigate to="/login" replace />;
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }
  return children;
};
const App = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route
          path="/login"
          element={
            !Cookies.get("token") ? <Login /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/register"
          element={
            !Cookies.get("token") ? <Register /> : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
