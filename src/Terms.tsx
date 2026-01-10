import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container">
      <h1>zStudio</h1>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Copyright 2025 zStudios Ltd</h2>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>License</h3>
      <p>
        You are granted a non-exclusive, non-transferable, revocable license to use this software, including for
        commercial purposes.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>You MAY:</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Use this software for personal or commercial purposes.</li>
        <li>Share the unmodified software package with others.</li>
        <li>Download and use the software at your own discretion.</li>
      </ul>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>You MAY NOT:</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Modify, reverse engineer, decompile, fork, or redistribute the software.</li>
        <li>Sell or sublicense this software, or bundle it into another product for resale.</li>
        <li>Claim ownership or authorship of this software.</li>
      </ul>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Future Versions</h3>
      <p>
        Future versions of zStudio (v2 and beyond) may require a paid license. Users of v1.x do not automatically
        receive a license for future versions.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Disclaimer</h3>
      <p>
        This software is provided "as is", without warranty of any kind, express or implied. In no event shall the
        author be liable for any claim, damages, or other liability arising from the use of this software.
      </p>

      <p>
        By using this software, you agree to these terms. This license is governed by the laws of the United
        Kingdom.
      </p>
    </div>
  );
};

export default Terms;