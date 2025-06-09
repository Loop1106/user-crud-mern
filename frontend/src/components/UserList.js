import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      if (response.data.status) {
        setUsers(response.data.data);
      }
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
        if (response.data.status) {
          fetchUsers();
        }
      } catch (error) {
        setError('Failed to delete user');
      }
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${id}`, updatedData);
      if (response.data.status) {
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      setError('Failed to update user');
    }
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="users-grid">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            {editingUser === user._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  handleEdit(user._id, {
                    name: formData.get('name'),
                    password: formData.get('password')
                  });
                }}
              >
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  required
                  placeholder="Name"
                />
                <input
                  type="password"
                  name="password"
                  defaultValue={user.password}
                  required
                  placeholder="Password"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{user.name}</h3>
                <div className="user-actions">
                  <button onClick={() => setEditingUser(user._id)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList; 