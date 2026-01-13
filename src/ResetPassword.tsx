import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiResetPassword } from './api';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Invalid reset link. No token provided.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Password validation: at least 8 characters, lowercase, uppercase, number, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await apiResetPassword(token, newPassword);
      if (result.success) {
        setMessage('Password has been reset successfully. You can now log in with your new password.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(result.message || 'Failed to reset password');
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
        <h2>Reset Password</h2>
        {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
        {message && <p style={{ color: '#4CAF50', marginBottom: '1rem' }}>{message}</p>}
        {!message && (
          <form onSubmit={handleSubmit}>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="button" disabled={isLoading || !token}>
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
        <p>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;