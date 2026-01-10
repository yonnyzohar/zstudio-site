import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetLicenses, apiRevokeLicense, apiGenerateLicense } from './api';
import type { License } from './api';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      loadLicenses();
    }
  }, [isLoggedIn]);

  const loadLicenses = async () => {
    setLoading(true);
    const data = await apiGetLicenses();
    setLicenses(data);
    setLoading(false);
  };

  const handleRenew = (id: string) => {
    // For now, just update status locally
    setLicenses(prev => prev.map(license =>
      license.id === id ? { ...license, status: 'Active' } : license
    ));
  };

  const handleCancel = async (id: string) => {
    const result = await apiRevokeLicense(id);
    if (result.success) {
      setLicenses(prev => prev.map(license =>
        license.id === id ? { ...license, status: 'Expired' } : license
      ));
    } else {
      alert('Failed to cancel license');
    }
  };

  const handleGenerateLicense = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }

    const result = await apiGenerateLicense(userId, 3, '2026-12-31');
    if (result.success) {
      alert('License generated successfully!');
      // Refresh the licenses list
      loadLicenses();
    } else {
      alert(`Failed to generate license: ${result.message || 'Unknown error'}`);
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to view your dashboard.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Your Licenses</h1>
      <table id="licenses-table">
        <thead>
          <tr>
            <th>License Name</th>
            <th>Status</th>
            <th>Seats</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map(license => (
            <tr key={license.licenseKey}>
              <td>
                <Link to={`/edit-seats/${license.licenseKey}`} state={{ license }}>
                  {license.name} </Link>
              </td>
              <td style={{ color: license.status === 'Active' ? '#4caf50' : '#ff6b6b' }}>
                {license.status}
              </td>
              <td>
                {license.seatsTotal}
              </td>
              <td>
                {license.status === 'Expired' ? (
                  <button
                    onClick={() => handleRenew(license.id)}
                    className="action-btn renew-btn"
                  >
                    Renew
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(license.id)}
                    className="action-btn cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buy License Button */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={handleGenerateLicense} className="button">Buy a License</button>
      </div>
    </div>
  );
};

export default Dashboard;