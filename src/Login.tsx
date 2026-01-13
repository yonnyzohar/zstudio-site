import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // if signup - Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.
    if (!isLogin) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, a number, and a special character.');
        return;
      }
    }

    try {
      const result = isLogin ? await login(email, password) : await signup(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="container">
      <div className="auth-section">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
          <button type="submit" className="button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
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