import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { api } from "../url";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import Sidenav from "./Sidenav";
const Order = () => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [orderData, setOrderData] = useState({
    employeeId: "",
    supplierId: "",
    orderStatusId: "",
    shippedDate: "",
    paidDate: "",
  });
  const fetchSupplier = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/orders`);
      setSupplier(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);
  const fetchEmployeeData = async () => {
    try {
      const response = await axios(`${api}/employees`);
      setEmployeeData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchSupplierData = async () => {
    try {
      const response = await axios(`${api}/suppliers`);
      setSupplierData(response.data);
      console.log("supplier data", response);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchOrderStatus = async () => {
    try {
      const response = await axios(`${api}/orderstatus`);
      setOrderStatusData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEmployeeData();
    fetchSupplierData();
    fetchOrderStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`${api}/orders/${editSupplierId}`, orderData);
        fetchSupplier();
        setIsEditing(false);
        setEditSupplierId(null);
        setOrderData({
          employeeId: "",
          supplierId: "",
          orderStatusId: "",
          shippedDate: "",
          paidDate: "",
        });
      } catch (error) {
        console.error("Error updating orders:", error);
      }
    } else {
      try {
        await axios.post(`${api}/orders/`, orderData);
        fetchSupplier();
        setOrderData({
          employeeId: "",
          supplierId: "",
          orderStatusId: "",
          shippedDate: "",
          paidDate: "",
        });
      } catch (error) {
        console.error("Error adding orders:", error);
      }
    }
  };
  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleEdit = (supplier) => {
    setIsEditing(true);
    setEditSupplierId(supplier.id);
    setOrderData(supplier);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/orders/${id}`);
      fetchSupplier();
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  };

  return (
    <div className="admin-page">
      <Sidenav />
      <div className="form-container">
        <h2 className="table-name">Product Form</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-div">
            <select
              name="employeeId"
              value={orderData.employeeId}
              onChange={handleChange}
            >
              <option value="">-- Select Employee --</option>
              {employeeData.map((data) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.firstname + data.lastname}
                  </option>
                );
              })}
            </select>
            <select
              name="supplierId"
              value={orderData.supplierId}
              onChange={handleChange}
            >
              <option value="">-- Select Supplier --</option>
              {supplierData.map((data) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.firstname + data.lastname}
                  </option>
                );
              })}
            </select>
            <select
              name="addedby"
              value={orderData.addedby}
              onChange={handleChange}
            >
              <option value="">-- Select Employee --</option>
              {employeeData.map((data) => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.firstname + data.lastname}
                  </option>
                );
              })}
            </select>
          </div>
          <textarea
            maxLength="50"
            type="text"
            name="description"
            rows="5"
            value={orderData.description}
            onChange={handleChange}
            placeholder="description"
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        <h3 className="table-name">Product Data</h3>
        {loading ? (
          <div className={`${loading && "loading"}`}>
            <ClipLoader color="rgba(227, 0, 27, 1)" />
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>code</th>
                  <th>name</th>
                  <th>price</th>
                  <th>addedby</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {supplier.map((items) => {
                  return (
                    <tr key={items.id}>
                      <td>{items.code}</td>
                      <td>{items.name}</td>
                      <td>{items.price}</td>
                      <td>{items.addedby}</td>
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() => handleEdit(items)}
                        >
                          <MdModeEditOutline />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn-icon"
                          onClick={() => handleDelete(items.id)}
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
