import React, { useState } from "react";
import Table from "../Table/Table";
import ClientRegisterForm from "../CustomerRegister/ClientRegisterForm";
import "./main.css";

const Main = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <div className="container">
      <button className="register-form" onClick={toggleFormVisibility}>
        {showForm ? "Uždaryti" : "Registruoti naują klientą"}
      </button>
      {showForm && <ClientRegisterForm />}
      <Table />
    </div>
  );
};

export default Main;
