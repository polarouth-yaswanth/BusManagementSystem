import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';  // Add styles for the dashboard

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Bus Management</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/BusList">Buses</Link>
          </li>
          <li>
            <Link to="/RouteList">Routes</Link>
          </li>
          <li>
            <Link to="/EmployeeList">Employees</Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <header className="top-bar">
          <div className="user-info">
            <span>Welcome, Admin</span>
            <div className="user-avatar">A</div>
          </div>
        </header>

        <div className="dashboard-overview">
          <div className="overview-item">
            <h3>Buses</h3>
            <p>10</p>
          </div>
          <div className="overview-item">
            <h3>Routes</h3>
            <p>5</p>
          </div>
          <div className="overview-item">
            <h3>Employees</h3>
            <p>25</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/AddBus">
            <button className="action-btn">Add New Bus</button>
          </Link>
          <Link to="/AddEmployee">
            <button className="action-btn">Add New Employee</button>
          </Link>
          <Link to="/AddRoute">
            <button className="action-btn">Add New Route</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
