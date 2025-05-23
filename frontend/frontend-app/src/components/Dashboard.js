import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const res = await axios.get(`http://localhost:5000/api/users/${payload.id}`);
        setUser(res.data);
      } catch (err) {
        alert('Invalid session');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return user ? (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default Dashboard;
