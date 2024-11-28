import React, { useState } from 'react';
import axios from 'axios';
import './AddRoute.css';  // Import the CSS file

const AddRoute = () => {
  const [route, setRoute] = useState({
    id: '',        // Manually assigned ID field
    routeName: '',
    startPoint: '',
    endPoint: '',
    distance: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  // Handle adding a new route
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { id, routeName, startPoint, endPoint, distance } = route;

    // Check that all fields are filled in
    if (!id || !routeName || !startPoint || !endPoint || !distance) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://3.95.0.143:3500/admin/addroutes', route);
      setSuccess('Route added successfully');
      
      // Reset form fields
      setRoute({
        id: '',        // Keep id field reset
        routeName: '',
        startPoint: '',
        endPoint: '',
        distance: ''
      });
      setError('');
    } catch (error) {
      setError('Error adding route');
    }
  };

  return (
    <div className="add-route">
      <h2>Add Route</h2>

      {/* Display error and success messages */}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <label>Route ID:</label>
        <input
          type="text"
          name="id"
          value={route.id}
          onChange={handleInputChange}
          placeholder="Enter Route ID" // Optional: Hint for the user to manually enter ID
        />

        <label>Route Name:</label>
        <input
          type="text"
          name="routeName"
          value={route.routeName}
          onChange={handleInputChange}
        />

        <label>Start Point:</label>
        <input
          type="text"
          name="startPoint"
          value={route.startPoint}
          onChange={handleInputChange}
        />

        <label>End Point:</label>
        <input
          type="text"
          name="endPoint"
          value={route.endPoint}
          onChange={handleInputChange}
        />

        <label>Distance (km):</label>
        <input
          type="number"
          name="distance"
          value={route.distance}
          onChange={handleInputChange}
        />

        <button type="submit">Add Route</button>
      </form>
    </div>
  );
};

export default AddRoute;
