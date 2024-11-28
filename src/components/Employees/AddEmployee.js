import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './AddEmployee.css'; // Import the CSS file

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    id: '',  // ID field included
    name: '',
    email: '',
    role: '',
    phoneNumber: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submit (Add Employee)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!employeeData.name || !employeeData.email || !employeeData.role || !employeeData.phoneNumber) {
      setError('All fields are required.');
      return;
    }

    try {
      // Send POST request to add employee (API call)
      const response = await axios.post('http://3.95.0.143:3500/admin/addemployees', employeeData);
      console.log('Employee added successfully:', response.data);

      // Redirect to Employee List page after successful add
      navigate('/EmployeeList'); // Use navigate to redirect
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('There was an error adding the employee. Please try again.');
    }
  };

  return (
    <div className="add-employee">
      <h2>Add New Employee</h2>
      {/* Display error message */}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID (Optional)</label>
          <input
            type="text"
            name="id"
            value={employeeData.id}
            onChange={handleInputChange}
            placeholder="Auto-generated, leave blank"
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
