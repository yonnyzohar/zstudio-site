import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)', padding: '20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#e5e7eb' }}>
      <p style={{ margin: '20px 0', fontSize: '0.9em' }}>Follow Us</p>
      <ul id="brxe-rjwxku" className="brxe-social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '15px', listStyle: 'none', padding: 0, margin: '15px 0' }} aria-label="Social Media Links">
        <li className="repeater-item has-link" style={{ display: 'inline-block' }}>
          <a href="https://www.linkedin.com/company/zstudiosltd" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease, transform 0.3s ease' }}>
            <i className="fab fa-linkedin-in icon" style={{ color: '#e5e7eb', fontSize: '20px' }}></i>
          </a>
        </li>
        <li className="repeater-item has-link" style={{ display: 'inline-block' }}>
          <a href="https://x.com/ZoharYonny41440" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease, transform 0.3s ease' }}>
            <i className="fab fa-twitter icon" style={{ color: '#e5e7eb', fontSize: '20px' }}></i>
          </a>
        </li>
        <li className="repeater-item has-link" style={{ display: 'inline-block' }}>
          <a href="https://www.youtube.com/@zStudio-f9r" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transition: 'background 0.3s ease, transform 0.3s ease' }}>
            <i className="fab fa-youtube icon" style={{ color: '#e5e7eb', fontSize: '20px' }}></i>
          </a>
        </li>
      </ul>

      <p style={{ margin: '20px 0', fontSize: '0.9em' }}>
        <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6', textDecoration: 'none', transition: 'color 0.3s ease' }}>contact</a> | <Link to="/terms" style={{ color: '#14b8a6', textDecoration: 'none', transition: 'color 0.3s ease' }}>T&C</Link>
      </p>
      <span id="timestamp">© 2026 zStudio - All Rights Reserved</span>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const year = new Date().getFullYear();
            document.getElementById('timestamp').innerHTML = \`© \${year} zStudio - All Rights Reserved\`;
          `,
        }}
      />
    </footer>
  );
};

export default Footer;