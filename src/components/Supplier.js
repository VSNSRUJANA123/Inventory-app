import { useEffect, useState } from "react";
import "../styles/home.css";
import axios from "axios";
import { api } from "../url";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
const Supplier = () => {
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSupplierId, setEditSupplierId] = useState(null);
  // const [selectEmployee, setSelectEmployee] = useState("");
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
    addedBy: "",
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
        await axios.put(`${api}/suppliers/${editSupplierId}`, supplierData);
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
          addedBy: "",
        });
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        await axios.post(`${api}/suppliers/`, supplierData);
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
          addedBy: "",
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
      await axios.delete(`${api}/suppliers/${id}`);
      fetchSupplier();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="table-name">Supplier Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            value={supplierData.firstname}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={supplierData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={supplierData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Number"
            name="phonenumber"
            onChange={handleChange}
            value={supplierData.phonenumber}
            required
          />
          <input
            type="text"
            placeholder="Company_name"
            name="company_name"
            value={supplierData.company_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Job_title"
            value={supplierData.jobtitle}
            onChange={handleChange}
            name="jobtitle"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={supplierData.address}
            name="address"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={supplierData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={supplierData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="zip"
            name="zip"
            value={supplierData.zip}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="website"
            value={supplierData.website}
            onChange={handleChange}
            name="website"
          />
          <select
            name="addedBy"
            value={supplierData.addedBy}
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
      <h3 className="table-name">Supplier Data</h3>
      {loading ? (
        <div className={`${loading && "loading"}`}>
          <ClipLoader color="rgba(227, 0, 27, 1)" />
        </div>
      ) : (
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

export default Supplier;
