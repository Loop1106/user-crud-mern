import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      if (response.data.status) {
        setProducts(response.data.data);
      }
    } catch (error) {
      setError('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/products/${id}`);
        if (response.data.status) {
          fetchProducts();
        }
      } catch (error) {
        setError('Failed to delete product');
      }
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, updatedData);
      if (response.data.status) {
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      setError('Failed to update product');
    }
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            {editingProduct === product._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleEdit(product._id, {
                    name: formData.get('name'),
                    price: formData.get('price'),
                    image: formData.get('image')
                  });
                }}
              >
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  required
                />
                <input
                  type="number"
                  name="price"
                  defaultValue={product.price}
                  required
                />
                <input
                  type="url"
                  name="image"
                  defaultValue={product.image}
                  required
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <div className="product-actions">
                  <button onClick={() => setEditingProduct(product._id)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList; 