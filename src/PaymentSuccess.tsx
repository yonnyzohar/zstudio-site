import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optionally verify the payment with Stripe or backend
    // For now, just redirect to dashboard after showing success
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your license is being processed.</p>
      {sessionId && <p>Session ID: {sessionId}</p>}
      <p>You will be redirected to your dashboard shortly...</p>
    </div>
  );
};

export default PaymentSuccess;