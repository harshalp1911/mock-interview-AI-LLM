// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/new');
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/new">New Mock</Link></li>
        <li><Link to="/review/123">Review Mock</Link></li>
        <li><Link to="/interview/123">Interview Room</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>

      {token
        ? <button className="logout-btn" onClick={handleLogout}>Logout</button>
        : <button className="login-btn"  onClick={handleLogin}>Login with Google</button>
      }
    </nav>
  );
};

export default Navbar;
