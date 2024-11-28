import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { id } = useParams(); // Get employee ID from the URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the employee details on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://3.95.0.143:3500/admin/getEmployee/${id}`);
        setEmployee(response.data); // Populate the form with the fetched data
      } catch (error) {
        setError('Failed to fetch employee details');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://3.95.0.143:3500/admin/updateEmployee/${id}`, employee);
      setSuccess('Employee details updated successfully!');
      setError('');
      setTimeout(() => {
        navigate('/admin'); // Redirect to employee list after 2 seconds
      }, 2000);
    } catch (error) {
      setError('Failed to update employee details');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
      {success && <div className="success-message" style={{ color: 'green' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={employee.role}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
