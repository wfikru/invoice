import React, { useState, useEffect } from "react";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import { generateInvoice, getClients, getInvoices, registerClient } from "./api";

const App = () => {
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activePage, setActivePage] = useState("clients");

  // Fetch clients from the backend
  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  // Fetch invoices from the backend
  const fetchInvoices = async () => {
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchInvoices();
  }, []);

  const addClient = async (client) => {
    try {
      const response = await registerClient(client);
      setClients([...clients, response.data]);
    } catch (error) {
      console.error("Error registering client:", error);
    }
  };

  const addInvoice = async (invoice) => {
    try {
      const response = await generateInvoice(invoice.clientId, invoice);
      setInvoices([...invoices, response.data]);
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Invoice App</h1>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActivePage("clients")}>Manage Clients</button>
        <button onClick={() => setActivePage("invoices")}>Manage Invoices</button>
      </div>
      {activePage === "clients" && (
        <div>
          <ClientForm addClient={addClient} />
          <ClientList clients={clients} />
        </div>
      )}
      {activePage === "invoices" && (
        <div>
          <InvoiceForm clients={clients} addInvoice={addInvoice} />
          <InvoiceList invoices={invoices} />
        </div>
      )}
    </div>
  );
};

export default App;
