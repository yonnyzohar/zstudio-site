import React from 'react';
import SEO from './SEO';
import { EDITOR_LICENSE_URL, COMMERCIAL_LICENSE_URL } from './site';

const Terms: React.FC = () => {
  return (
    <div className="container">
      <SEO
        title="Terms of Use – zStudio"
        description="Read the terms of use for zStudio software. Understand how zStudio is licensed (AGPL-3.0 or commercial), how our online services are covered, and our warranty disclaimer."
        canonical="/terms"
      />
      <h1>zStudio</h1>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Copyright 2025 zStudios Ltd</h2>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Software licence</h3>
      <p>
        The zStudio editor is open source. Its source code is published under the{' '}
        <a href={EDITOR_LICENSE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6' }}>GNU Affero General Public License v3.0</a>{' '}
        (AGPL-3.0). You may use, study, modify and share it under the terms of that licence. If you distribute a
        modified version, or make one available to others over a network, you must release your changes under the
        same licence.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Commercial licence</h3>
      <p>
        If you want to use or modify zStudio without the AGPL-3.0 obligations, for example inside a closed-source
        product or pipeline, you can buy a{' '}
        <a href={COMMERCIAL_LICENSE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6' }}>commercial licence</a> from
        zStudios Ltd.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Online services</h3>
      <p>
        Accounts, cloud AI features, credits and other services provided by zStudios Ltd are not covered by the
        software licence. They are governed by these terms and by the plan you purchase.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Trademarks</h3>
      <p>
        "zStudio" and the zStudio logo are trademarks of zStudios Ltd. The software licence does not grant
        permission to use them. Modified versions must use a different name and logo.
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