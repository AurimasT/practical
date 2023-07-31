import React, { useState } from "react";
import "./ClientRegisterForm.css";
import axios from "axios";

const ClientRegisterForm = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/customers", formData)
      .then((response) => {
        console.log("Customer registered:", response.data);
        setFormData({
          name: "",
          surname: "",
          email: "",
          age: "",
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error registering customer:", error);
      });
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Registruoti naują klientą</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vardas:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pavardė:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Elektroninis paštas:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Amžius:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <button className="update" type="submit">
          Registruoti
        </button>
      </form>
    </div>
  );
};

export default ClientRegisterForm;
