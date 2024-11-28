import React, { useState } from 'react';
import axios from 'axios';
import './AddBus.css'; // Importing the custom CSS for styling

const AddBus = () => {
  const [busData, setBusData] = useState({
    id: '',
    busName: '',
    busNumber: '',
    capacity: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  // Handle adding a new bus
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, busName, busNumber, capacity } = busData;

    // Validate all fields are filled
    if (!id || !busName || !busNumber || !capacity) {
      setError('All fields are required');
      return;
    }

    try {
      const newBus = {
        id: parseInt(id), // Ensure ID is treated as a number
        busName,
        busNumber,
        capacity
      };

      const response = await axios.post('http://3.95.0.143:3500/admin/addBus', newBus);
      setSuccess('Bus added successfully');
      setBusData({
        id: '',
        busName: '',
        busNumber: '',
        capacity: ''
      });
      setError('');
    } catch (error) {
      setError('Error adding bus');
    }
  };

  return (
    <div className="add-bus-container">
      <h2>Add New Bus</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="add-bus-form">
        <div className="form-group">
          <label htmlFor="id">Bus ID:</label>
          <input
            type="number"
            id="id"
            name="id"
            value={busData.id}
            onChange={handleInputChange}
            placeholder="Enter Bus ID"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="busName">Bus Name:</label>
          <input
            type="text"
            id="busName"
            name="busName"
            value={busData.busName}
            onChange={handleInputChange}
            placeholder="Enter Bus Name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="busNumber">Bus Number:</label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={busData.busNumber}
            onChange={handleInputChange}
            placeholder="Enter Bus Number"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={busData.capacity}
            onChange={handleInputChange}
            placeholder="Enter Bus Capacity"
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;
