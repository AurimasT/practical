import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:3001/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/api/customers/${id}`)
      .then(() => {
        console.log("Customer deleted:", id);
        fetchCustomers();
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      age: customer.age,
    });
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      surname: "",
      email: "",
      age: "",
    });
  };

  const handleUpdate = (id) => {
    axios
      .put(`http://localhost:3001/api/customers/${id}`, formData)
      .then(() => {
        console.log("Customer updated:", id);
        fetchCustomers();
        handleCancelEdit();
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  return (
    <div className="table-container">
      <h2 className="table-header">Klientų sąrašas</h2>
      <table className="client-table">
        <thead>
          <tr>
            <th>Nr.</th>
            <th>Vardas</th>
            <th>Pavardė</th>
            <th>Elektroninis paštas</th>
            <th>Amžius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) =>
            editingCustomer && editingCustomer._id === customer._id ? (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={(e) =>
                      setFormData({ ...formData, surname: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    required
                  />
                </td>
                <td>
                  <button
                    className="save"
                    onClick={() => handleUpdate(customer._id)}
                  >
                    Išsaugoti
                  </button>
                  <button className="cancel" onClick={handleCancelEdit}>
                    Atšaukti
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.email}</td>
                <td>{customer.age}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(customer)}>
                    Taisyti
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(customer._id)}
                  >
                    Ištrinti
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
