import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = {
      username: credentials.username,
      email: credentials.email
    };
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    alert('Logged in successfully!');
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
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
      {/* Nav Bar */}
      <nav style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Link to="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</Link>
        {!user && <Link to="/register" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Register</Link>}
        {!user && <Link to="/login" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Login</Link>}
        {user && <span style={{ margin: '0 15px', color: 'white' }}>Welcome, {user.username}!</span>}
        {user && <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>}
      </nav>

      {!user ? (
        <center>
          <div style={{  padding: '30px', borderRadius: '10px', color:"white" }}>
            <h2>Login </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label style={{color:"white"}}>Username: </label>
                <input
                  name="username"
                  type="text"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
              </div><br />
              <div>
                <label>Email: </label>
                <input
                  name="email"
                  type="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div><br />
              <div>
                <label>Password: </label>
                <input
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                />
              </div><br />
              <button type="submit">Login</button>
            </form>
          </div>
        </center>
      ) : (
        <center>
          <h2 style={{ color: 'white' }}>Welcome, {user.username}!</h2>
        </center>
      )}
    </div>
  );
}

export default Login;
