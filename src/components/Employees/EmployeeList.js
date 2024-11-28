import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API requests
import { Link } from 'react-router-dom';
import './EmployeeList.css'; // Import the custom CSS file

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from backend on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://3.95.0.143:3500/admin/getemployees');
        setEmployees(response.data);  // Set the employee data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Handle Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://3.95.0.143:3500/admin/deleteEmployee/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id)); // Remove employee from the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2 className="title">Employee List</h2>

      <div className="add-button-container">
        <Link to="/AddEmployee">
          <button className="btn btn-primary">Add New Employee</button>
        </Link>
      </div>

      <table className="employee-table table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.phoneNumber}</td>
              <td>
                {/* Edit button */}
                <Link to={`/EditEmployee/${employee.id}`}>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                </Link>
                
                {/* Delete button */}
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
