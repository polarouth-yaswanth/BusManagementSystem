import React from 'react';
import './Home.css'; // We will include a CSS file for styling

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to the Bus Management System</h2>
          <p>Your all-in-one solution to manage buses, routes, and employees efficiently.</p>
          <a href="/login" className="btn">Get Started</a>
        </div>
      </section>

      {/* Information Section */}
      <section className="info">
        <div className="info-card">
          <h3>Manage Your Fleet</h3>
          <p>Track buses, their capacity, and their operational status in real-time.</p>
        </div>

        <div className="info-card">
          <h3>Organize Routes</h3>
          <p>Easily create, update, and manage bus routes across different areas.</p>
        </div>

        <div className="info-card">
          <h3>Employee Management</h3>
          <p>Maintain a detailed record of all employees, their roles, and schedules.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Bus Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
