import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => setForm({ username: res.data.username, email: res.data.email }))
      .catch(() => alert('Error fetching user'));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, form);
      alert('User updated');
      navigate('/dashboard');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input name="username" value={form.username} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditUser;
