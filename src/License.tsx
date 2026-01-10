import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const License: React.FC = () => {
  const [searchParams] = useSearchParams();
  const licenseId = searchParams.get('id');

  return (
    <main className="container">
      <h1>License Details</h1>
      <p>License ID: <span>{licenseId || 'N/A'}</span></p>
      <p>This is a placeholder page for license details. Implement fetching and displaying license information here.</p>
      <Link to="/dashboard" className="button">Back to Dashboard</Link>
    </main>
  );
};

export default License;