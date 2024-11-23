import React, { useState } from "react";

const ClientForm = ({ onRegister }) => {
  const [clientData, setClientData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(clientData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Client</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={clientData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={clientData.email}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register Client</button>
    </form>
  );
};

export default ClientForm;
