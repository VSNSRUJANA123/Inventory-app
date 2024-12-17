import { useState } from "react";
import "../styles/login.css";
import Navbar from "./Navbar";
import axios from "axios";
import { api } from "../url";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api}/api/auth/register`, adminDetails);
      toast(res.data.message);
      navigate("/login");
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
          <h2 className="login-name">Register Form</h2>
          <input
            style={{ marginBottom: "10px" }}
            value={adminDetails.adminname}
            onChange={changeHandle}
            placeholder="enter name"
            name="username"
            type="text"
          />
          <input
            value={adminDetails.password}
            onChange={changeHandle}
            placeholder="password"
            name="password"
            type="password"
          />
          <button className="submit-btn" type="submit">
            Submit
          </button>
          <p>
            Already An Account
            <Link to="/login">
              <span
                style={{
                  color: "#e3001b",
                  textDecoration: "underline",
                  marginLeft: "7px",
                }}
              >
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
