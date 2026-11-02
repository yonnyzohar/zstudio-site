import React from 'react';
import SEO from './SEO';
import { CONTACT_EMAIL, DEMO_MAILTO } from './site';

const Contact: React.FC = () => {
  return (
    <div className="container contact-page">
      <SEO
        title="Contact zStudio – Book a Demo"
        description="Get in touch with zStudio. Book a demo for your team, ask about Studio Team or Enterprise plans, or get help with the editor and AI setup."
        canonical="/contact"
      />

      <h1><span className="title-gradient">Talk to Us</span></h1>
      <p className="contact-intro">
        Questions about zStudio, the AI setup, or plans for your studio? Email us directly.
      </p>

      <div className="contact-grid">
        <div className="contact-card">
          <h2>Email</h2>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <p>Support, licensing, billing and partnership questions.</p>
        </div>
        <div className="contact-card">
          <h2>Book a demo</h2>
          <p>A live walkthrough for your team: the editor, connecting your AI tool, skills, and loading scenes into Pixi.js or Phaser.</p>
          <a className="button primary" href={DEMO_MAILTO}>Book a demo</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
