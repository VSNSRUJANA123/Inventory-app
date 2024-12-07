import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { api } from "../url";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import Sidenav from "./Sidenav";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoIosClose } from "react-icons/io";
const Product = () => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);
  // const [employeeData, setEmployeeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [supplierData, setSupplierData] = useState({
    code: "",
    name: "",
    description: "",
    price: "",
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
  // const fetchEmployeeData = async () => {
  //   try {
  //     const response = await axios(`${api}/employees`);
  //     setEmployeeData(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchEmployeeData();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="admin-page">
      <Sidenav />
      <div className="form-container">
        <h3 className="table-name">Product Data</h3>
        {loading ? (
          <div className={`${loading && "loading"}`}>
            <ClipLoader color="rgba(227, 0, 27, 1)" />
          </div>
        ) : (
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>code</th>
                    <th>name</th>
                    <th>price</th>
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
                        <td>
                          <Popup
                            trigger={
                              <button className="btn-icon">
                                <MdModeEditOutline
                                  onClick={() => handleEdit(items)}
                                />
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div>
                                <div className="form-title">
                                  <h2 className="table-name">Product Form</h2>
                                  <button
                                    className="close-btn"
                                    onClick={() => close()}
                                  >
                                    <IoIosClose />
                                  </button>
                                </div>
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
                                    Update Product
                                  </button>
                                </form>
                              </div>
                            )}
                          </Popup>
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
            <div style={{ textAlign: "right" }}>
              <Popup
                trigger={<button className="submit-btn">Add Product</button>}
                modal
                nested
              >
                {(close) => (
                  <div>
                    <div className="form-title">
                      <h2 className="table-name">Product Form</h2>
                      <button className="close-btn" onClick={() => close()}>
                        <IoIosClose />
                      </button>
                    </div>
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
                        Add Product
                      </button>
                    </form>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
