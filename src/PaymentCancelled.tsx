import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancelled: React.FC = () => {
  return (
    <div className="container">
      <h1>Payment Cancelled</h1>
      <p>Your payment was cancelled. No charges were made.</p>
      <p><Link to="/dashboard">Return to Dashboard</Link></p>
    </div>
  );
};

export default PaymentCancelled;