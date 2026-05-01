import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiForgotPassword } from './api';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const result = await apiForgotPassword(email);
      if (result.rateLimited) {
        setError(result.message || 'Too many attempts. Please wait a few minutes and try again.');
      } else {
        setMessage("If an account with that email exists, we've sent reset instructions.");
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-section">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
          {message && <p style={{ color: '#4CAF50', marginBottom: '1rem' }}>{message}</p>}
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        <p>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;