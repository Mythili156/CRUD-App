import React from 'react';

function Navbar({ user, setUser, setPage }) {
  return (
    <nav>
      {!user && (
        <>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('register')}>Register</button>
        </>
      )}
      {user && (
        <>
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => {
            setUser(null);
            setPage('login');
          }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
