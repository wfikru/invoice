import axios from 'axios';

const API_BASE_URL = '/api'//'http://localhost:8080/api'; // Backend URL

export const getClients = () => axios.get(`${API_BASE_URL}/clients`);
export const registerClient = (client) => axios.post(`${API_BASE_URL}/clients/register`, client);

export const generateInvoice = (clientId, items) => axios.post(`${API_BASE_URL}/invoices/generate?clientId=${clientId}`, items);
export const getInvoices = () =>  axios.get(`${API_BASE_URL}/invoices`);