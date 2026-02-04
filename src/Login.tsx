import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const [isLogin] = useState(true); // Always login mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recentEmails, setRecentEmails] = useState<string[]>([]);
  const [error, setError] = useState('');
  const { login } = useAuth(); // Removed signup
  const navigate = useNavigate();

  useEffect(() => {
    // Load recent emails from localStorage
    const stored = localStorage.getItem('recentEmails');
    if (stored) {
      try {
        const emails = JSON.parse(stored);
        setRecentEmails(emails);
        // Set the most recent email as default
        if (emails.length > 0) {
          setEmail(emails[0]);
        }
      } catch (e) {
        // Ignore invalid JSON
      }
    }
  }, []);

  const saveEmailToRecent = (email: string) => {
    if (!email.trim()) return;
    
    const updated = [email, ...recentEmails.filter(e => e !== email)].slice(0, 5); // Keep last 5
    setRecentEmails(updated);
    localStorage.setItem('recentEmails', JSON.stringify(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        saveEmailToRecent(email);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const toggleMode = () => {
  //   setIsLogin(!isLogin);
  //   setError('');
  // };

  return (
    <div className="container">
      <div className="auth-section">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            list="recent-emails"
            style={{ width: '100%', boxSizing: 'border-box' }}
          />
          <datalist id="recent-emails">
            {recentEmails.map((email, index) => (
              <option key={index} value={email} />
            ))}
          </datalist>
          <label>Password:</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box', paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#666',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'grayscale(100%)' }}
              >
                <path
                  d={showPassword 
                    ? "M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                    : "M2.45703 12C3.73128 7.94291 7.52159 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C20.2672 16.0571 16.4769 19 11.9992 19C7.52159 19 3.73128 16.0571 2.45703 12Z M11.9992 15C13.6561 15 14.9992 13.6569 14.9992 12C14.9992 10.3431 13.6561 9 11.9992 9C10.3424 9 8.99924 10.3431 8.99924 12C8.99924 13.6569 10.3424 15 11.9992 15Z M11.9992 13C12.5515 13 12.9992 12.5523 12.9992 12C12.9992 11.4477 12.5515 11 11.9992 11C11.447 11 10.9992 11.4477 10.9992 12C10.9992 12.5523 11.447 13 11.9992 13Z"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="button">
            Log In
          </button>
        </form>
        {/* <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p> */}
        {isLogin && (
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>
              Forgot Password?
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;