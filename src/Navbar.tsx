import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src="/assets/logo.webp" alt="zStudio Logo" className="logo-icon" />
        zStudio
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/z-importer" className="nav-link">Usage</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/tutorials" className="nav-link">Tutorials</Link>
        <a href="/docs/index.html" className="nav-link">Importer Docs</a>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">My Dashboard</Link>
            <button onClick={handleLogout} className="button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;