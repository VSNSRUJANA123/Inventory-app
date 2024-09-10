import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "./url";
import "./App.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactData, setContactData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    job_title: "",
    company_name: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${api}/contacts`);
      setContacts(response.data);
    } catch (error) {
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
        await axios.put(`${api}/update-contact/${editContactId}`, contactData);
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
        });
      } catch (error) {
        console.error("Error updating contact:", error);
      }
    } else {
      try {
        await axios.post(`${api}/add-contact`, contactData);
        fetchContacts();
        setContactData({
          firstname: "",
          lastname: "",
          email: "",
          phonenumber: "",
          job_title: "",
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
      await axios.delete(`${api}/delete-contact/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="main-content">
      <h1>Inventory Management</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
          {/* <input
            type="text"
            name="job_title"
            value={contactData.job_title}
            onChange={handleChange}
            placeholder="Job Title"
            required
          /> */}
          <input
            type="text"
            name="company_name"
            value={contactData.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
          <input
            type="text"
            name="address"
            value={contactData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Update Contact" : "Add Contact"}
          </button>
        </form>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
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
      </div>
    </div>
  );
};

export default App;
