import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img src="/assets/logo.webp" alt="zStudio Logo" className="logo-icon" />
        <span className="logo-text">zStudio</span>
      </Link>
      <button className="burger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
        <Link to="/z-importer" className="nav-link" onClick={closeMenu}>zImporter</Link>
        <Link to="/swf-importer" className="nav-link" onClick={closeMenu}>SWF Import</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        <Link to="/tutorials" className="nav-link" onClick={closeMenu}>Tutorials</Link>
        <Link to="/demos" className="nav-link" onClick={closeMenu}>Demos</Link>
        {isLoggedIn ? (
          <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
        ) : (
          <>
            <Link to="/pricing" className="nav-link" onClick={closeMenu}>Pricing</Link>
            <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;