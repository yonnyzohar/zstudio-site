import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem', lineHeight: '1.8' }}>
      <h1>Privacy Notice</h1>
      <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Last updated: April 2026</p>

      <p>
        This notice explains what personal data zStudios Ltd collects about you, why we collect it, who we share
        it with, and how long we keep it. We've written it in plain English so it's easy to understand. If you
        have any questions, email us at{' '}
        <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6' }}>
          jonzohar@zstudiosltd.com
        </a>
        .
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Who we are</h2>
      <p>
        <strong>zStudios Ltd</strong> is the data controller for the personal data you provide through this
        website. We are registered in the United Kingdom.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>What data we collect and why</h2>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Account &amp; licence management</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>Email address</strong> — to create your account, send licence keys, and contact you about your
          subscription.
        </li>
        <li>
          <strong>Password (hashed)</strong> — to authenticate you when you sign in with email and password. We
          never store your password in plain text. If you sign in via OAuth (Google, GitHub, or Facebook) no
          password is stored.
        </li>
        <li>
          <strong>OAuth identity</strong> — if you sign in with Google, GitHub, or Facebook we store the
          provider name, your unique ID from that provider, and your display name. We do not store OAuth access
          tokens.
        </li>
        <li>
          <strong>Licence details</strong> — licence key, licence type, number of permitted seats, expiry date,
          and Stripe subscription ID — to issue and enforce your licence.
        </li>
        <li>
          <strong>Device fingerprint (hashed)</strong> — a one-way hash of device characteristics (e.g. OS,
          hardware identifiers) recorded each time you activate a licence seat. We store only the hash — never
          the raw fingerprint — to enforce your seat limit and detect misuse.
        </li>
      </ul>
      <p>
        <strong>Lawful basis:</strong> Performance of a contract — we need this data to provide the service you
        signed up for.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Payments</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>Payment details</strong> — handled entirely by <strong>Stripe</strong>. We never see or store
          your full card number. Stripe may retain billing name, last-4 digits of your card, and billing address
          as required by payment regulations. We store the Stripe subscription ID and Stripe customer ID to
          manage your subscription.
        </li>
      </ul>
      <p>
        <strong>Lawful basis:</strong> Performance of a contract and Legal obligation (payment regulations).
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>AI image generation (optional feature)</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>AI credit balance and transaction history</strong> — we record credit purchases, credits spent
          per generation, and running balance to operate the credit system.
        </li>
        <li>
          <strong>Prompts and images you submit for generation</strong> — when you use the AI generation feature,
          your text prompt and any source image you upload are transmitted to third-party AI providers (Leonardo
          AI, Google Gemini, or OpenAI) to produce the generated image. We do not retain copies of your prompts
          or source images on our servers after the request completes. Please review each provider's own privacy
          policy before use.
        </li>
      </ul>
      <p>
        <strong>Lawful basis:</strong> Performance of a contract (providing the AI generation service you
        purchased credits for).
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Website and server logs</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>IP address and browser information</strong> — automatically collected by our hosting
          infrastructure to keep the service secure and diagnose errors.
        </li>
      </ul>
      <p>
        <strong>Lawful basis:</strong> Legitimate interests — we have a legitimate interest in keeping the
        website secure and functioning correctly.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Who we share your data with</h2>
      <p>We only share your data with trusted third parties where necessary to run our service:</p>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>Stripe</strong> (stripe.com) — payment processing. Stripe is PCI-DSS compliant and may process
          your data in the USA and EU under Standard Contractual Clauses.
        </li>
        <li>
          <strong>Supabase</strong> (supabase.com) — our PostgreSQL database is hosted on Supabase. Data is
          stored in the EU (West Europe region). Supabase acts as a data processor on our behalf.
        </li>
        <li>
          <strong>Render</strong> (render.com) — our API server is hosted on Render. Render acts as a data
          processor on our behalf.
        </li>
        <li>
          <strong>Resend</strong> (resend.com) — transactional email delivery (welcome emails, licence
          confirmations, password resets). Resend receives your email address solely to deliver these messages.
        </li>
        <li>
          <strong>Leonardo AI</strong> (leonardo.ai), <strong>Google</strong> (cloud.google.com), and{' '}
          <strong>OpenAI</strong> (openai.com) — AI image generation providers. Your prompts and source images
          are transmitted to whichever provider you select when using the AI feature. Each provider's own privacy
          policy governs how they handle that data.
        </li>
        <li>
          <strong>Google / GitHub / Facebook</strong> — if you choose to sign in via OAuth, the relevant
          provider authenticates you and shares your profile ID and display name with us. We do not share your
          data back to them beyond the standard OAuth flow.
        </li>
      </ul>
      <p>We do not sell your personal data. We do not use it for advertising.</p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>How long we keep your data</h2>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>Account data</strong> — kept for as long as your account is active. If you close your account,
          we delete your personal data within 30 days, except where we are legally required to keep it (e.g.
          financial records for 6 years under UK tax law).
        </li>
        <li>
          <strong>Licence session records (device fingerprints)</strong> — retained for the lifetime of the
          licence, then deleted when the account is closed.
        </li>
        <li>
          <strong>AI credit transactions</strong> — retained for the lifetime of your account for billing
          reconciliation purposes, then deleted when the account is closed.
        </li>
        <li>
          <strong>Server logs</strong> — retained for up to 90 days for security and debugging purposes.
        </li>
        <li>
          <strong>Payment records</strong> — kept for 7 years as required by UK financial regulations.
        </li>
      </ul>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Your rights</h2>
      <p>Under UK GDPR you have the right to:</p>
      <ul style={{ marginLeft: '2rem' }}>
        <li>
          <strong>Access</strong> — request a copy of the personal data we hold about you.
        </li>
        <li>
          <strong>Rectification</strong> — ask us to correct inaccurate data.
        </li>
        <li>
          <strong>Erasure</strong> — ask us to delete your data ("right to be forgotten"), subject to legal
          retention requirements.
        </li>
        <li>
          <strong>Restriction</strong> — ask us to limit how we use your data.
        </li>
        <li>
          <strong>Portability</strong> — receive your data in a common machine-readable format.
        </li>
        <li>
          <strong>Object</strong> — object to processing based on legitimate interests.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{' '}
        <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6' }}>
          jonzohar@zstudiosltd.com
        </a>
        . We will respond within 30 days.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Complaints</h2>
      <p>
        If you are unhappy with how we handle your data, you have the right to lodge a complaint with the
        Information Commissioner's Office (ICO) at{' '}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6' }}>
          ico.org.uk
        </a>{' '}
        or by calling 0303 123 1113.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Changes to this notice</h2>
      <p>
        We may update this notice from time to time. When we do, we will update the "last updated" date at the
        top. Significant changes will be notified by email.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
