import { useState } from "react";
import "../styles/login.css";
import Navbar from "./Navbar";
import axios from "axios";
import { api } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Login = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/auth/login`, adminDetails);
      toast("login successfully");
      const { result } = res.data;
      const { token } = res.data;
      Cookies.set("role", result[0].role, { expires: 30 });
      Cookies.set("token", token, { expires: 30 });
      if (result[0].role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast(err.response.data, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const changeHandle = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form onSubmit={onHandleSubmit}>
          <h2 className="login-name">Login Form</h2>
          <input
            value={adminDetails.username}
            onChange={changeHandle}
            placeholder="Enter Name"
            name="username"
            type="text"
          />
          <input
            value={adminDetails.password}
            onChange={changeHandle}
            placeholder="Enter Password"
            name="password"
            type="password"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <p>
            Create An Account
            <Link to="/register">
              <span
                style={{
                  color: "#e3001b",
                  textDecoration: "underline",
                  marginLeft: "7px",
                }}
              >
                Register
              </span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
