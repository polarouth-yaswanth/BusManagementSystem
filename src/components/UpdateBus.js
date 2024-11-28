import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState({ busName: '', busNumber: '', capacity: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // New state for success message

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(`http://3.95.0.143:3500/admin/getBus/${id}`);
        setBus(response.data);
      } catch (error) {
        setError('Failed to fetch bus details');
      }
    };
    fetchBus();
  }, [id]);

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://3.95.0.143:3500/admin/updateBus/${id}`, bus);
      setSuccess('Bus details updated successfully!'); // Set success message
      setError(''); // Clear any previous error
      setTimeout(() => {
        navigate('/admin'); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      setError('Failed to update bus details');
      setSuccess(''); // Clear any success message
    }
  };

  return (
    <div>
      <h2>Update Bus</h2>
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
      {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Bus Name:
          <input
            type="text"
            name="busName"
            value={bus.busName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Bus Number:
          <input
            type="text"
            name="busNumber"
            value={bus.busNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Capacity:
          <input
            type="number"
            name="capacity"
            value={bus.capacity}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default UpdateBus;
