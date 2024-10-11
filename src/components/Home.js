import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../url";
import "../styles/home.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    job_title: "",
    password: "",
    company_name: "",
    address: "",
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

  // Handle form change
  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        await axios.put(`${api}/employees/${editContactId}`, contactData);
        fetchContacts();
        setIsEditing(false);
        setEditContactId(null);
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          job_title: "",
          password: "",
          company_name: "",
          address: "",
        });
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        await axios.post(`${api}/employees/`, contactData);
        fetchContacts();
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          job_title: "",
          password: "",
          company_name: "",
          address: "",
        });
      } catch (error) {
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
      await axios.delete(`${api}/employees/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            type="text"
            name="firstname"
            value={contactData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastname"
            value={contactData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <input
            type="text"
            name="phonenumber"
            value={contactData.phonenumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="text"
            name="job_title"
            value={contactData.job_title}
            onChange={handleChange}
            placeholder="Job Title"
            required
          />
          <input
            type="password"
            name="password"
            value={contactData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />

          <input
            type="text"
            name="company_name"
            value={contactData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
        </div>
        <textarea
          maxLength="50"
          type="text"
          name="address"
          rows="5"
          value={contactData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>
      </form>
      <h3 className="table-name">Employee Data</h3>
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
                <th>Job Title</th>
                <th>Password</th>
                <th>Company Name</th>
                <th>Address</th>
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
                  <td>{contact.password ? "*****" : contactData.password}</td>
                  <td>{contact.company_name}</td>
                  <td>{contact.address}</td>
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => handleEdit(contact)}
                    >
                      <MdModeEditOutline />
                    </button>
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
      )}
    </div>
  );
};

export default Home;
