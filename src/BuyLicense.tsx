import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGenerateLicense, getLicenseTypes } from './api';

const BuyLicense: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [licenseTypes, setLicenseTypes] = useState<string[]>([]);
  const [licenseDurations, setLicenseDurations] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [seatsMap, setSeatsMap] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLicenseTypes = async () => {
      const result = await getLicenseTypes();
      if (result.success) {
        setSeatsMap(result.seatsMap);
        setLicenseTypes(Object.keys(result.seatsMap));
        setLicenseDurations(result.licenseDurations);
        setSelectedType(Object.keys(result.seatsMap)[0] || '');
        setSelectedDuration(result.licenseDurations[0] || '');
      }
    };
    if (isLoggedIn) {
      loadLicenseTypes();
    }
  }, [isLoggedIn]);

  const handlePurchase = async () => {
    if (!selectedType || !selectedDuration) {
      alert('Please select license type and duration');
      return;
    }
    setLoading(true);
    const result = await apiGenerateLicense(selectedType, selectedDuration);
    setLoading(false);
    if (result.success) {
      window.location.href = result.url;
    } else {
      alert(`Failed to generate license: ${result.url || 'Unknown error'}`);
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="container">
        <h1>Buy a License</h1>
        <p>Please log in to purchase a license.</p>
        <Link to="/login" className="button">Log In</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Buy a License</h1>
      <div className="license-selection">
        <div className="form-group">
          <label htmlFor="licenseType">License Type:</label>
          <select
            id="licenseType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {licenseTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)} ({seatsMap[type]} seats)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="licenseDuration">Duration:</label>
          <select
            id="licenseDuration"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            {licenseDurations.map(duration => (
              <option key={duration} value={duration}>
                {duration.charAt(0).toUpperCase() + duration.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handlePurchase} disabled={loading} className="button">
          {loading ? 'Processing...' : 'Purchase License'}
        </button>
      </div>
      <Link to="/dashboard" className="button secondary">Back to Dashboard</Link>
    </main>
  );
};

export default BuyLicense;