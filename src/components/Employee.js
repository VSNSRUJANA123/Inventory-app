import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../url";
import "../styles/home.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import Sidenav from "./Sidenav";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoIosClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Employee = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    job_title: "",
    company_name: "",
    address: "",
    status: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const fetchContacts = async () => {
    setLoading(true);
    try {
      axios
        .get(`${api}/employees`)
        .then((response) => {
          setContacts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching employees:", error);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await axios.put(
          `${api}/employees/${editContactId}`,
          contactData
        );
        fetchContacts();
        setIsEditing(false);
        setEditContactId(null);
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          job_title: "",
          company_name: "",
          address: "",
          status: "",
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
        toast(error.response.data.error, {
          position: "top-right",
          autoClose: 1000,
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
        const response = await axios.post(`${api}/employees/`, contactData);
        fetchContacts();
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          job_title: "",
          company_name: "",
          address: "",
          status: "",
        });
        toast(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast(error.response.data.error, {
          position: "top-right",
          autoClose: 1000,
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

  const handleEdit = (contact) => {
    setIsEditing(true);
    setEditContactId(contact.id);
    setContactData(contact);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${api}/employees/${id}`);
      fetchContacts();
      toast(response.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast(error.response.data.error, {
        position: "top-right",
        autoClose: 1000,
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
  const resetForm = () => {
    setContactData({
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      job_title: "",
      company_name: "",
      address: "",
      status: "",
    });
  };
  return (
    <div className="admin-page">
      <Sidenav />
      <div className="form-container">
        <h3 className="table-name">Employee Data</h3>
        <div>
          {loading ? (
            <div className="loading">
              <ClipLoader color="rgba(227, 0, 27, 1)" />
            </div>
          ) : (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Job Title</th>
                      <th>Company Name</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>
                          {contact.firstname} {contact.lastname}
                        </td>
                        <td>{contact.email}</td>
                        <td>{contact.phonenumber}</td>
                        <td>{contact.job_title}</td>
                        <td>{contact.company_name}</td>
                        <td>{contact.address}</td>
                        <td>{contact.status}</td>
                        <td>
                          <Popup
                            trigger={
                              <button className="btn-icon">
                                <MdModeEditOutline
                                  onClick={() => handleEdit(contact)}
                                />
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div>
                                <div className="form-title">
                                  <h2 className="table-name">Employee Form</h2>
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
                                      type="text"
                                      name="firstname"
                                      value={contactData.firstname}
                                      onChange={handleChange}
                                      placeholder="First Name"
                                    />
                                    <input
                                      type="text"
                                      name="lastname"
                                      value={contactData.lastname}
                                      onChange={handleChange}
                                      placeholder="Last Name"
                                    />
                                    <input
                                      type="email"
                                      name="email"
                                      value={contactData.email}
                                      onChange={handleChange}
                                      placeholder="Email"
                                    />
                                    <input
                                      type="text"
                                      name="phonenumber"
                                      value={contactData.phonenumber}
                                      onChange={handleChange}
                                      placeholder="Phone Number"
                                    />
                                    <input
                                      type="text"
                                      name="job_title"
                                      value={contactData.job_title}
                                      onChange={handleChange}
                                      placeholder="Job Title"
                                    />
                                    <input
                                      type="text"
                                      name="company_name"
                                      value={contactData.company_name}
                                      onChange={handleChange}
                                      placeholder="Company Name"
                                    />
                                    <select
                                      name="status"
                                      value={contactData.status}
                                      onChange={handleChange}
                                    >
                                      <option>--select status</option>
                                      <option value="active">Active</option>
                                      <option value="inactive">
                                        In-Active
                                      </option>
                                    </select>
                                  </div>
                                  <textarea
                                    maxLength="50"
                                    type="text"
                                    name="address"
                                    rows="rows"
                                    value={contactData.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                  />

                                  <div>
                                    <button
                                      type="submit"
                                      className="submit-btn"
                                    >
                                      Update Employee
                                    </button>
                                    <button
                                      style={{ marginLeft: "10px" }}
                                      className="submit-btn"
                                      onClick={() => {
                                        close();
                                        resetForm();
                                      }}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </form>
                              </div>
                            )}
                          </Popup>
                        </td>
                        <td>
                          <button
                            className="btn-icon"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ textAlign: "right" }}>
                <Popup
                  trigger={<button className="submit-btn">Add Employee</button>}
                  modal
                  nested
                >
                  {(close) => (
                    <div className="popup-inner">
                      <div className="form-title">
                        <h2 className="table-name">Employee Form</h2>
                        <button className="close-btn" onClick={() => close()}>
                          <IoIosClose />
                        </button>
                      </div>
                      <form className="form" onSubmit={handleSubmit}>
                        <div className="form-div">
                          <input
                            type="text"
                            name="firstname"
                            value={contactData.firstname}
                            onChange={handleChange}
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            name="lastname"
                            value={contactData.lastname}
                            onChange={handleChange}
                            placeholder="Last Name"
                          />
                          <input
                            type="email"
                            name="email"
                            value={contactData.email}
                            onChange={handleChange}
                            placeholder="Email"
                          />
                          <input
                            type="text"
                            name="phonenumber"
                            value={contactData.phonenumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                          />
                          <input
                            type="text"
                            name="job_title"
                            value={contactData.job_title}
                            onChange={handleChange}
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            name="company_name"
                            value={contactData.company_name}
                            onChange={handleChange}
                            placeholder="Company Name"
                          />
                          <select
                            name="status"
                            value={contactData.status}
                            onChange={handleChange}
                          >
                            <option>--select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">In-Active</option>
                          </select>
                        </div>
                        <textarea
                          maxLength="50"
                          type="text"
                          name="address"
                          rows="rows"
                          value={contactData.address}
                          onChange={handleChange}
                          placeholder="Address"
                        />
                        <div>
                          <button type="submit" className="submit-btn">
                            Add Employee
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            className="submit-btn"
                            onClick={() => {
                              close();
                              resetForm();
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </Popup>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Employee;
