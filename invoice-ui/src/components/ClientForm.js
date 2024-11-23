import React, { useState } from 'react';
import { registerClient } from '../api';

const ClientForm = () => {
    const [client, setClient] = useState({ name: '', address: '', email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerClient(client);
            alert('Client registered successfully');
            setClient({ name: '', address: '', email: '' });
        } catch (err) {
            console.error(err);
            alert('Error registering client');
        }
    };

    return (
        <div>
            <h2>Register Client</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={client.name}
                    onChange={(e) => setClient({ ...client, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={client.address}
                    onChange={(e) => setClient({ ...client, address: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={client.email}
                    onChange={(e) => setClient({ ...client, email: e.target.value })}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default ClientForm;
