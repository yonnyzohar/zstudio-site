import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetLicenses, apiRevokeLicense, apiGenerateLicense, getLicenseTypes } from './api';
import type { License } from './api';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [licenseTypes, setLicenseTypes] = useState<string[]>([]);
  const [licenseDurations, setLicenseDurations] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [seatsMap, setSeatsMap] = useState<Record<string, number>>({});

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

  const handleBuyLicense = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in');
      return;
    }

    const result = await apiGenerateLicense(userId, selectedType, selectedDuration);
    if (result.success) {
      alert('License generated successfully!');
      setShowPopup(false);
      loadLicenses();
    } else {
      alert(`Failed to generate license: ${result.message || 'Unknown error'}`);
    }
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
    const result = await getLicenseTypes();
    if (result.success) {
      setSeatsMap(result.seatsMap);
      setLicenseTypes(Object.keys(result.seatsMap));
      setLicenseDurations(result.licenseDurations);
      // Preselect first options
      let licenseTypeKeys = Object.keys(result.seatsMap);
      
      setSelectedType(licenseTypeKeys[0] || '');
      setSelectedDuration(result.licenseDurations[0] || '');
      setShowPopup(true);
    } else {
      alert('Failed to load license types');
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

      {/* License Purchase Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Buy a License</h2>
            <div className="popup-form">
              <label>
                License Type:
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  {licenseTypes.map(type => (
                    <option key={type + " - " + seatsMap[type] + " seats"} value={type}>{type} - {seatsMap[type]} seats</option>
                  ))}
                </select>
              </label>
              <label>
                Duration:
                <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
                  {licenseDurations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)} className="button cancel">Cancel</button>
              <button onClick={handleBuyLicense} className="button">Buy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;