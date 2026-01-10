import React from 'react';
import { Link } from 'react-router-dom';

const BuyLicense: React.FC = () => {
  return (
    <main className="container">
      <h1>Buy a License</h1>
      <p>This is a placeholder page for purchasing a license. Implement payment integration and license creation here.</p>
      <Link to="/dashboard" className="button">Back to Dashboard</Link>
    </main>
  );
};

export default BuyLicense;