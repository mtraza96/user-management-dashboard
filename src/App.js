import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '', department: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const formattedUsers = response.data.map((user) => ({
        id: user.id,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ')[1] || '',
        email: user.email,
        department: user.company.name || '',
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for adding or updating a user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update user
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === formData.id ? formData : user))
      );
      setIsEditing(false);
    } else {
      // Add new user with the next sequential ID
      const nextId = users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
      setUsers((prevUsers) => [
        ...prevUsers,
        { ...formData, id: nextId }, // Assign the next sequential ID
      ]);
    }
    setFormData({ id: '', firstName: '', lastName: '', email: '', department: '' }); // Reset form
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h1>User Management Dashboard</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="primary-btn">{isEditing ? 'Update User' : 'Add User'}</button>
      </form>

      <div className="user-list">
        <h2>Users List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
