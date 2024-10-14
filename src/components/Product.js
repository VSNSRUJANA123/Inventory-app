import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { api } from "../url";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
const Product = () => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [supplierData, setSupplierData] = useState({
    code: "",
    name: "",
    description: "",
    price: "",
    addedby: "",
  });
  const fetchSupplier = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/products`);
      setSupplier(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
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
  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(supplierData.addedBy);
    if (isEditing) {
      try {
        await axios.put(`${api}/products/${editSupplierId}`, supplierData);
        fetchSupplier();
        setIsEditing(false);
        setEditSupplierId(null);
        setSupplierData({
          code: "",
          name: "",
          description: "",
          price: "",
          addedby: "",
        });
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        await axios.post(`${api}/products/`, supplierData);
        fetchSupplier();
        setSupplierData({
          code: "",
          name: "",
          description: "",
          price: "",
          addedby: "",
        });
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    }
  };
  const handleChange = (e) => {
    setSupplierData({ ...supplierData, [e.target.name]: e.target.value });
  };

  const handleEdit = (supplier) => {
    setIsEditing(true);
    setEditSupplierId(supplier.id);
    setSupplierData(supplier);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/products/${id}`);
      fetchSupplier();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="table-name">Product Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Code"
            name="code"
            value={supplierData.code}
            required
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={supplierData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="price"
            name="price"
            value={supplierData.price}
            onChange={handleChange}
            required
          />
          <select
            name="addedby"
            value={supplierData.addedby}
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
          value={supplierData.description}
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
  );
};

export default Product;
