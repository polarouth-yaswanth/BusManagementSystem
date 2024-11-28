import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [routeToEdit, setRouteToEdit] = useState(null);
  const [updatedRoute, setUpdatedRoute] = useState({
    routeName: '',
    startPoint: '',
    endPoint: '',
    distance: ''
  });

  // Fetch routes from backend
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://3.95.0.143:3500/admin/routes');
        setRoutes(response.data);
      } catch (error) {
        setError('Error fetching routes');
      }
    };
    fetchRoutes();
  }, []);

  // Handle deleting a route
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://3.95.0.143:3500/admin/routes/${id}`);
      setRoutes(routes.filter((route) => route.id !== id));
    } catch (error) {
      setError('Error deleting route');
    }
  };

  // Handle opening the edit form
  const handleEdit = (route) => {
    setEditMode(true);
    setRouteToEdit(route);
    setUpdatedRoute({
      routeName: route.routeName,
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      distance: route.distance
    });
  };

  // Handle input changes for updating route
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRoute({ ...updatedRoute, [name]: value });
  };

  // Handle updating the route
  const handleUpdateRoute = async (e) => {
    e.preventDefault();
    const { routeName, startPoint, endPoint, distance } = updatedRoute;
    
    if (!routeName || !startPoint || !endPoint || !distance) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.put(`http://3.95.0.143:3500/admin/routes/${routeToEdit.id}`, updatedRoute);
      setRoutes(routes.map(route => (route.id === routeToEdit.id ? response.data : route)));
      setEditMode(false);
      setRouteToEdit(null);
      setUpdatedRoute({
        routeName: '',
        startPoint: '',
        endPoint: '',
        distance: ''
      });
    } catch (error) {
      setError('Error updating route');
    }
  };

  return (
    <div className="route-list-container">
      <h2>Route List</h2>

      {/* Display error message */}
      {error && <div className="error">{error}</div>}

      {/* Update route form if edit mode is active */}
      {editMode && (
        <div className="update-route-form">
          <h3>Update Route</h3>
          <form onSubmit={handleUpdateRoute}>
            <div className="form-group">
              <label>Route Name:</label>
              <input
                type="text"
                name="routeName"
                value={updatedRoute.routeName}
                onChange={handleInputChange}
                placeholder="Route Name"
              />
            </div>

            <div className="form-group">
              <label>Start Point:</label>
              <input
                type="text"
                name="startPoint"
                value={updatedRoute.startPoint}
                onChange={handleInputChange}
                placeholder="Start Point"
              />
            </div>

            <div className="form-group">
              <label>End Point:</label>
              <input
                type="text"
                name="endPoint"
                value={updatedRoute.endPoint}
                onChange={handleInputChange}
                placeholder="End Point"
              />
            </div>

            <div className="form-group">
              <label>Distance (km):</label>
              <input
                type="number"
                name="distance"
                value={updatedRoute.distance}
                onChange={handleInputChange}
                placeholder="Distance"
              />
            </div>

            <button type="submit">Update Route</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Routes Display */}
      <div className="routes-list">
        <h3>All Routes</h3>
        {routes.length === 0 ? (
          <p>No routes available</p>
        ) : (
          <div className="route-items">
            {routes.map((route) => (
              <div className="route-item" key={route.id}>
                <div className="route-details">
                  <p><strong>{route.routeName}</strong></p>
                  <p>{route.startPoint} to {route.endPoint}</p>
                  <p>Distance: {route.distance} km</p>
                  <p>ID: {route.id}</p>
                </div>
                <div className="actions">
                  <button onClick={() => handleEdit(route)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(route.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteList;
