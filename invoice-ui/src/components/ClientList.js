import React, { useEffect, useState } from "react";
import { getClients } from "../api";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      const response = await getClients();
      setClients(response.data);
    };
    fetchClients();
  }, []);

  return (
    <div>
      <h2>Client List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.address}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
