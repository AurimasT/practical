import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ClientRegisterForm from "./Components/CustomerRegister/ClientRegisterForm";
import Main from "./Components/Main/Main";
import Table from "./Components/Table/Table";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/table" element={<Table />} />
          <Route path="/clientRegister" element={<ClientRegisterForm />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
