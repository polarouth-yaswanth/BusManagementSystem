import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get('http://3.95.0.143:3500/admin/getAllBuses');
        setBuses(response.data);
      } catch (error) {
        setError('No Buses Available');
      }
    };
    fetchBuses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://3.95.0.143:3500/admin/deleteBus/${id}`);
      setBuses(buses.filter((bus) => bus.id !== id));
    } catch (error) {
      setError('Error deleting bus');
    }
  };

  return (
    <div className="bus-list-container">
      <h2>Bus List</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="bus-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bus Name</th>
            <th>Bus Number</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.busName}</td>
              <td>{bus.busNumber}</td>
              <td>{bus.capacity}</td>
              <td>
                <Link to={`/editBus/${bus.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(bus.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusList;
