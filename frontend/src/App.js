import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 