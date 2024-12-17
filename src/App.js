import Home from "./components/Home.js";
import NotFound from "./components/NotFound.js";
import Product from "./components/Product.js";
import Supplier from "./components/Supplier.js";
import Employee from "./components/Employee.js";
import Login from "./components/Login.js";
import Admin from "./components/Admin.js";
import Register from "./components/Register.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Purchase from "./components/Purchase.js";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

const App = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {role === "admin" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Home />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Employee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplier"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Supplier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Purchase />
            </ProtectedRoute>
          }
        />
        {!token && <Route path="/login" element={<Login />} />}
        {!token && <Route path="/register" element={<Register />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
