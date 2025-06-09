import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">User Management</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Users</Link>
          <Link to="/add-user" className="nav-link">Add User</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 