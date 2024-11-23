import React, { useState } from "react";

const InvoiceList = ({ invoices }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleDetailsClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div>
      <h2>Invoice List</h2>
      {invoices.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Invoice Number</th>
              <th>Client Name</th>
              <th>Total Due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.client.name}</td>
                <td>${invoice.totalDue}</td>
                <td>
                  <button onClick={() => handleDetailsClick(invoice)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No invoices found.</p>
      )}

      {/* Show details of the selected invoice */}
      {selectedInvoice && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Invoice Details</h3>
          <p><strong>Invoice Number:</strong> {selectedInvoice.invoiceNumber}</p>
          <p><strong>Date:</strong> {selectedInvoice.date}</p>
          <p><strong>Client Name:</strong> {selectedInvoice.client.name}</p>
          <p><strong>Client Email:</strong> {selectedInvoice.client.email}</p>
          <p><strong>Client Address:</strong> {selectedInvoice.client.address}</p>
          <h4>Items:</h4>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>${item.unitPrice}</td>
                  <td>${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><strong>Total Due:</strong> ${selectedInvoice.totalDue}</p>
          <button onClick={() => setSelectedInvoice(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
