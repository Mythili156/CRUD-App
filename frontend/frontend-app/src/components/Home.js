

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.appBackground}>
      <nav style={styles.navbar}>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          {!user && (
            <>
              <Link to="/register" style={styles.link}>Register</Link>
              <Link to="/login" style={styles.link}>Login</Link>
            </>
          )}
          {user && (
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          )}
        </div>
      </nav>

      <div style={styles.content}>
        <div style={styles.container}>
          <h1>Welcome {user?.name || ''}!</h1>
   
        </div>
      </div>
    </div>
  );
}

const styles = {
  appBackground: {
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1508780709619-79562169bc64")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'white',

    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 80px)',
  },
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '90%',
  },
};

export default Home;
