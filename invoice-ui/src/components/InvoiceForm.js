import React, { useState, useEffect } from "react";
import { getClients } from "../api";
import { v4 as uuidv4 } from "uuid"; // Import UUID

const InvoiceForm = ({ onSubmit }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `${uuidv4()}`,
    date: "",
    client: null,
    items: [
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
        amount: 0,
      },
    ],
    totalDue: 0,
  });

  // Fetch clients from the API
  useEffect(() => {
    const fetchClients = async () => {
      const response = await getClients();
      setClients(response.data);
    };
    fetchClients();
  }, []);

  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    const client = clients.find((c) => c.id === clientId);
    setSelectedClient(client);
    setInvoiceData({ ...invoiceData, client });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];
    items[index][name] = name === "quantity" || name === "unitPrice" ? parseFloat(value) : value;
    items[index].amount = items[index].quantity * items[index].unitPrice;
    setInvoiceData({
      ...invoiceData,
      items,
      totalDue: items.reduce((total, item) => total + item.amount, 0),
    });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { description: "", quantity: 1, unitPrice: 0, amount: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClient) {
      alert("Please select a client!");
      return;
    }
    onSubmit(invoiceData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Generate Invoice</h2>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={invoiceData.date}
          onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
          required
        />
      </div>
      <h3>Client Information</h3>
      <div>
        <label>Select Client:</label>
        <select onChange={handleClientSelect} required>
          <option value="">-- Select a Client --</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} ({client.email})
            </option>
          ))}
        </select>
      </div>
      {selectedClient && (
        <div>
          <p><strong>Address:</strong> {selectedClient.address}</p>
          <p><strong>Email:</strong> {selectedClient.email}</p>
        </div>
      )}
      <h3>Invoice Items</h3>
      {invoiceData.items.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
          <label>Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, e)}
            required
          />
          <label>Amount:</label>
          <input type="number" value={item.amount} readOnly />
        </div>
      ))}
      <button type="button" onClick={addItem}>
        Add Item
      </button>
      <h3>Total Due: ${invoiceData.totalDue}</h3>
      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
