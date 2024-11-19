import React, { useState, useEffect } from 'react';

function UserForm({ addUser, updateUser, userToEdit, setUserToEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  // Pre-fill form if editing a user
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        id: userToEdit.id,
        firstName: userToEdit.name.split(' ')[0] || '',
        lastName: userToEdit.name.split(' ')[1] || '',
        email: userToEdit.email,
        department: userToEdit.company.name || '',
      });
    }
  }, [userToEdit]);  

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userToEdit) {
      updateUser(formData);
      setUserToEdit(null); // Reset editing state
    } else {
      addUser(formData);
    }
    setFormData({ id: '', firstName: '', lastName: '', email: '', department: '' });
  };

  return (
    <div className="form-container">
      <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{userToEdit ? 'Update User' : 'Add User'}</button>
      </form>
    </div>
  );
}

export default UserForm;
