import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const [isLogin] = useState(true); // Always login mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Removed signup
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error');
    }
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