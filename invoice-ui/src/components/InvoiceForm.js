import React, { useState, useEffect } from 'react';
import { getClients, generateInvoice } from '../api';

const InvoiceForm = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [items, setItems] = useState([{ description: '', quantity: 0, unitPrice: 0 }]);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await getClients();
            setClients(response.data);
        };
        fetchClients();
    }, []);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await generateInvoice(selectedClientId, items);
            alert('Invoice generated successfully');
        } catch (err) {
            console.error(err);
            alert('Error generating invoice');
        }
    };

    return (
        <div>
            <h2>Generate Invoice</h2>
            <form onSubmit={handleSubmit}>
                <select value={selectedClientId} onChange={(e) => setSelectedClientId(e.target.value)} required>
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
                <h3>Items</h3>
                {items.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Unit Price"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={() => setItems([...items, { description: '', quantity: 0, unitPrice: 0 }])}>
                    Add Item
    </button>
                <button type="submit">Generate Invoice</button>
            </form>
        </div>
    );
};

export default InvoiceForm;