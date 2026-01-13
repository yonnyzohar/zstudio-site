import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src="/assets/logo.webp" alt="zStudio Logo" className="logo-icon" />
        zStudio
      </Link>
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/z-importer" className="nav-link" onClick={closeMenu}>Usage</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <Link to="/tutorials" className="nav-link" onClick={closeMenu}>Tutorials</Link>
        <a href="/docs/index.html" className="nav-link" onClick={closeMenu}>Importer Docs</a>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link" onClick={closeMenu}>My Dashboard</Link>
            <button onClick={handleLogout} className="button">Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;