import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Product Manager</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/add-product" className="nav-link">Add Product</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/add-user" className="nav-link">Add User</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 