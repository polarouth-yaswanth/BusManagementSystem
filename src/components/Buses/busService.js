import axios from 'axios';

// Update the API base URL to match the backend
const API_BASE_URL = 'http://3.95.0.143:3500:3500/admin';

export const getAllBuses = async () => {
  // Corrected the URL to match the backend endpoint for getting all buses
  const response = await axios.get(`${API_BASE_URL}/getbuses`);
  return response.data;
};

export const getBusById = async (id) => {
  // Corrected the URL to match the backend endpoint for getting a bus by ID
  const response = await axios.get(`${API_BASE_URL}/bus/${id}`);
  return response.data;
};

export const addBus = async (bus) => {
  // Corrected the URL to match the backend endpoint for adding a new bus
  const response = await axios.post(`${API_BASE_URL}/addbuses`, bus);
  return response.data;
};

export const updateBus = async (id, bus) => {
  // Corrected the URL to match the backend endpoint for updating a bus
  const response = await axios.put(`${API_BASE_URL}/update/${id}`, bus);
  return response.data;
};

export const deleteBus = async (id) => {
  // Corrected the URL to match the backend endpoint for deleting a bus
  await axios.delete(`${API_BASE_URL}/delete/${id}`);
};
