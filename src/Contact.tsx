import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { CONTACT_EMAIL } from './site';

const Contact: React.FC = () => {
  return (
    <div className="container contact-page">
      <SEO
        title="Contact zStudio"
        description="Get in touch with zStudio. Ask about commercial licences, support, or help with the editor and AI setup."
        canonical="/contact"
      />

      <h1><span className="title-gradient">Talk to Us</span></h1>
      <p className="contact-intro">
        Questions about zStudio, the AI setup, or a commercial licence for your studio? Email us directly.
      </p>

      <div className="contact-card">
        <h2>Email</h2>
        <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <p>Support, licensing, billing and partnership questions. For a commercial licence, see <Link to="/licensing">Licensing</Link>.</p>
      </div>
    </div>
  );
};

export default Contact;
