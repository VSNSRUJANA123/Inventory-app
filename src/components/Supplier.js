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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Supplier = () => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  const [supplierData, setSupplierData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    company_name: "",
    jobtitle: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    description: "",
  });
  const fetchSupplier = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/suppliers`);
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
        const response = await axios.put(
          `${api}/suppliers/${editSupplierId}`,
          supplierData
        );
        fetchSupplier();
        setIsEditing(false);
        setEditSupplierId(null);
        setSupplierData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          company_name: "",
          jobtitle: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          website: "",
          description: "",
        });
        toast(response.data.message, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast(error.response.data.error || error.response.data, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        const response = await axios.post(`${api}/suppliers/`, supplierData);
        fetchSupplier();
        setSupplierData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          company_name: "",
          jobtitle: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          website: "",
          description: "",
        });
        toast(response.data.message, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error);
        toast(error.response.data.error || error.response.data, {
          position: "top-right",
          autoClose: 600,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      const response = await axios.delete(`${api}/suppliers/${id}`);
      toast(response.data.message, {
        position: "top-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      fetchSupplier();
    } catch (error) {
      toast(error.response.data.error, {
        position: "top-right",
        autoClose: 600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="admin-page">
      <Sidenav />
      <div className="form-container">
        <h3 className="table-name">Supplier Data</h3>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Company Name</th>
                    <th>Job Title</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Website</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {supplier.map((items) => {
                    return (
                      <tr key={items.id}>
                        <td>
                          {items.firstname} {items.lastname}
                        </td>
                        <td>{items.email}</td>
                        <td>{items.phonenumber}</td>
                        <td>{items.company_name}</td>
                        <td>{items.jobtitle}</td>
                        <td>{items.address}</td>
                        <td>{items.city}</td>
                        <td style={{ textAlign: "center" }}>
                          {items.website ? items.website : "-"}
                        </td>
                        <td>{items.state}</td>
                        <td>{items.zip}</td>
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
                                  <h2 className="table-name">Supplier Form</h2>
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
                                      placeholder="First Name"
                                      name="firstname"
                                      value={supplierData.firstname}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Last Name"
                                      name="lastname"
                                      value={supplierData.lastname}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="email"
                                      placeholder="Email"
                                      name="email"
                                      value={supplierData.email}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="tel"
                                      placeholder="PhoneNumber"
                                      name="phonenumber"
                                      onChange={handleChange}
                                      value={supplierData.phonenumber}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Job_title"
                                      value={supplierData.jobtitle}
                                      onChange={handleChange}
                                      name="jobtitle"
                                    />
                                    <input
                                      type="text"
                                      placeholder="Address"
                                      value={supplierData.address}
                                      name="address"
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="text"
                                      placeholder="City"
                                      name="city"
                                      value={supplierData.city}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="text"
                                      placeholder="State"
                                      name="state"
                                      value={supplierData.state}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="text"
                                      placeholder="zip"
                                      name="zip"
                                      value={supplierData.zip}
                                      onChange={handleChange}
                                    />
                                    <input
                                      type="text"
                                      placeholder="website"
                                      value={supplierData.website}
                                      onChange={handleChange}
                                      name="website"
                                    />
                                    <select
                                      name="company_name"
                                      value={supplierData.company_name}
                                      onChange={handleChange}
                                    >
                                      <option>-- Select Company Name --</option>
                                      <option value="A" key={"A"}>
                                        A
                                      </option>
                                      <option value="B" key={"B"}>
                                        B
                                      </option>
                                      <option value="C" key={"C"}>
                                        C
                                      </option>
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
                                    Update Supplier
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
                trigger={<button className="submit-btn">Add Supplier</button>}
                modal
                nested
              >
                {(close) => (
                  <div>
                    <div className="form-title">
                      <h2 className="table-name">Supplier Form</h2>
                      <button className="close-btn" onClick={() => close()}>
                        <IoIosClose />
                      </button>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form-div">
                        <input
                          onChange={handleChange}
                          type="text"
                          placeholder="First Name"
                          name="firstname"
                          value={supplierData.firstname}
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lastname"
                          value={supplierData.lastname}
                          onChange={handleChange}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={supplierData.email}
                          onChange={handleChange}
                        />
                        <input
                          type="tel"
                          placeholder="PhoneNumber"
                          name="phonenumber"
                          onChange={handleChange}
                          value={supplierData.phonenumber}
                        />
                        <input
                          type="text"
                          placeholder="Job_title"
                          value={supplierData.jobtitle}
                          onChange={handleChange}
                          name="jobtitle"
                        />
                        <input
                          type="text"
                          placeholder="Address"
                          value={supplierData.address}
                          name="address"
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          placeholder="City"
                          name="city"
                          value={supplierData.city}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          placeholder="State"
                          name="state"
                          value={supplierData.state}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          placeholder="zip"
                          name="zip"
                          value={supplierData.zip}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          placeholder="website"
                          value={supplierData.website}
                          onChange={handleChange}
                          name="website"
                        />
                        <select
                          name="company_name"
                          value={supplierData.company_name}
                          onChange={handleChange}
                        >
                          <option>-- Select Company Name --</option>
                          <option value="A" key={"A"}>
                            A
                          </option>
                          <option value="B" key={"B"}>
                            B
                          </option>
                          <option value="C" key={"C"}>
                            C
                          </option>
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
                        Add Contact
                      </button>
                    </form>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Supplier;
