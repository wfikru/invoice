import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import ClientList from './components/ClientList';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(prevState => !prevState);
    };

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* Left Sidebar */}
                <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                    <button 
                        onClick={toggleSidebar} 
                        className="toggleButton"
                    >
                        {isSidebarCollapsed ? '>' : '<'}
                    </button>
                    <ul className="navList">
                        <li><Link to="/register-client" className="link">Register Client</Link></li>
                        <li><Link to="/generate-invoice" className="link">Generate Invoice</Link></li>
                        <li><Link to="/invoices" className="link">View Invoices</Link></li>
                        <li><Link to="/clients" className="link">View Clients</Link></li>
                    </ul>
                </nav>

                {/* Main Content Area */}
                <div className="mainContent">
                    <Routes>
                        <Route path="/" element={<Navigate to="/invoices" />} />
                        <Route path="/register-client" element={<ClientForm />} />
                        <Route path="/generate-invoice" element={<InvoiceForm />} />
                        <Route path="/invoices" element={<InvoiceList />} />
                        <Route path="/clients" element={<ClientList />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
