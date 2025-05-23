import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/register', form);
      alert('Registered successfully! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1508780709619-79562169bc64')`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        paddingTop: '40px'
   
      }}
    >
      {/* Navigation Links */}
      <nav style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/register" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Register</Link>
        <Link to="/login" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Login</Link>
      </nav>

      <center>
        <div style={{  padding: '30px', borderRadius: '10px' , color:"#ffff"}}>
          <h2>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            /><br /><br />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            /><br /><br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            /><br /><br />
            <button type="submit">Register</button>
          </form>
        </div>
      </center>
    </div>
  );
}

export default Register;
