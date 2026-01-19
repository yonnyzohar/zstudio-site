import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiValidateEmailLicense, apiAddLicenseEmail, apiRemoveLicenseEmail, apiGetLicenses, apiGetLicenseEmails } from './api';
import type { License } from './api';

const EditSeats: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const passedLicense = location.state?.license as License | undefined;
  const [users, setUsers] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [seatsTotal, setSeatsTotal] = useState(5); // Will be set from license data
  const [license, setLicense] = useState<License | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    if (id) {
      if (passedLicense) {
        setLicense(passedLicense);
        setSeatsTotal(passedLicense.seatsTotal);
        loadUsers(passedLicense.licenseKey);
      } else {
        loadLicenseAndUsers(id);
      }
    }
  }, [isLoggedIn, id, navigate, passedLicense]);

  const loadLicenseAndUsers = async (licenseId: string) => {
    // Fetch all licenses to find the one with matching id
    const licenses = await apiGetLicenses();
    const currentLicense = licenses.find(l => l.id === licenseId);
    if (currentLicense) {
      setLicense(currentLicense);
      setSeatsTotal(currentLicense.seatsTotal);
      loadUsers(currentLicense.licenseKey);
    } else {
      // License not found, redirect to dashboard
      navigate('/dashboard');
    }
  };

  const loadUsers = async (licenseKey: string) => {
    const result = await apiGetLicenseEmails(licenseKey);
    if (result.success && result.emails) {
      setUsers(result.emails.map((e: { email: string; added_at: string }) => e.email));
    } else {
      setUsers([]);
    }
  };

  const handleAddUser = async () => {
    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (users.includes(email)) {
      setError('User already added');
      return;
    }
    if (users.length >= seatsTotal) {
      setError('Maximum seats reached');
      return;
    }

    try {
      const validation = await apiValidateEmailLicense(email, license!.licenseKey);
      if (validation.success) {
        setError('Email halready associated with this license');
        return;
      }

      const addResult = await apiAddLicenseEmail(license!.licenseKey, email);
      if (!addResult.success) {
        setError('Failed to add user to license');
        return;
      }

      setUsers(prev => [...prev, email]);
      setEmail('');
      setShowModal(false);
      setError('');
    } catch (err) {
      setError('Network error');
    }
  };

  const handleDeleteUser = async (userEmail: string) => {
    if (!license) return;
    
    try {
      const removeResult = await apiRemoveLicenseEmail(license.licenseKey, userEmail);
      if (!removeResult.success) {
        alert('Failed to remove user from license');
        return;
      }

      setUsers(prev => prev.filter(u => u !== userEmail));
    } catch (err) {
      alert('Network error');
    }
  };

  if (!isLoggedIn || !license) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="container">
      <h1>Edit Seats - {id}</h1>
      <button
        onClick={() => setShowModal(true)}
        className="button"
        style={{ marginBottom: '2rem' }}
      >
        Add User
      </button>
      <table id="users-table">
        <thead>
          <tr>
            <th>User Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userEmail, index) => (
            <tr key={index}>
              <td>{userEmail}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(userEmail)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate('/dashboard')}
        className="button"
        style={{ marginTop: '2rem', backgroundColor: '#666' }}
      >
        Back to Dashboard
      </button>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#2a2a2a',
            padding: '2rem',
            borderRadius: '10px',
            width: '300px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>Add User</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #444',
                borderRadius: '5px',
                background: '#1a1a1a',
                color: '#ffffff'
              }}
            />
            {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
            <div>
              <button
                onClick={handleAddUser}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#007acc',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}
              >
                OK
              </button>
              <button
                onClick={() => { setShowModal(false); setError(''); setEmail(''); }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#666',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSeats;