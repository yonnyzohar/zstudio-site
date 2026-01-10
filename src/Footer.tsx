import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2026 zStudio. All rights reserved.</p>
        <p>
          <Link to="/terms" style={{ color: '#fbbb1a', textDecoration: 'none' }}>
            Terms and Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;