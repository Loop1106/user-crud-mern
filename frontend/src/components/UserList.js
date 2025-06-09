import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ImageModal from './ImageModal';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      if (response.data.status) {
        setUsers(response.data.data);
      }
    } catch (error) {
      setError('Failed to fetch users');
      toast.error('Failed to fetch users');
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
          toast.success('User deleted successfully!');
          fetchUsers();
        }
      } catch (error) {
        setError('Failed to delete user');
        toast.error('Failed to delete user');
      }
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const formData = new FormData();
      formData.append('name', updatedData.name);
      formData.append('password', updatedData.password);
      if (updatedData.image) {
        formData.append('image', updatedData.image);
      }

      const response = await axios.put(`http://localhost:3000/api/users/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.status) {
        toast.success('User updated successfully!');
        setEditingUser(null);
        fetchUsers();
      }
    } catch (error) {
      setError('Failed to update user');
      toast.error('Failed to update user');
    }
  };

  const handleImageClick = (imageUrl, userName) => {
    setSelectedImage({ url: imageUrl, name: userName });
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.image ? (
                    <img 
                      src={`http://localhost:3000${user.image}`} 
                      alt={user.name} 
                      className="user-image"
                      onClick={() => handleImageClick(`http://localhost:3000${user.image}`, user.name)}
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        handleEdit(user._id, {
                          name: formData.get('name'),
                          password: formData.get('password'),
                          image: formData.get('image')
                        });
                      }}
                      className="edit-form"
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
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                      />
                      <div className="edit-actions">
                        <button type="submit" className="save-btn">Save</button>
                        <button type="button" onClick={() => setEditingUser(null)} className="cancel-btn">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser !== user._id && (
                    <div className="user-actions">
                      <button onClick={() => setEditingUser(user._id)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(user._id)} className="delete-btn">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.url}
        userName={selectedImage?.name}
      />
    </div>
  );
}

export default UserList; 