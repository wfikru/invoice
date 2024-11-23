import React, { useState, useEffect } from 'react';
import { getInvoices } from '../api';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const response = await getInvoices();
            setInvoices(response.data);
        };
        fetchInvoices();
    }, []);

    return (
        <div>
            <h2>Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Total Due</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices && invoices.length > 0 ? (
                        invoices.map(invoice => (
                            <tr key={invoice.id}>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>{invoice.client.name}</td>
                                <td>${invoice.totalDue}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No invoices available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
