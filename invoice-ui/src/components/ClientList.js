import React, { useState, useEffect } from 'react';
import { getClients } from '../api';

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const response = await getClients();
            setClients(response.data);
        };
        fetchInvoices();
    }, []);

    return (
        <div>
            <h2>Clients</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.length > 0 ? (
                        clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.address}</td>
                                <td>${client.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>No clients available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
