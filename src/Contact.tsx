import React from 'react';
import SEO from './SEO';
import { CONTACT_EMAIL, DISCORD_URL } from './site';

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
        <p>Support, billing and partnership questions.</p>
      </div>

      <div className="contact-card" style={{ marginTop: '20px' }}>
        <h2>Discord</h2>
        <a className="contact-email" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord" style={{ marginRight: '8px' }}></i>Join the zStudio Discord
        </a>
        <p>Chat with the community, ask questions and share what you're building.</p>
      </div>
    </div>
  );
};

export default Contact;
