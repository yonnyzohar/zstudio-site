import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetCreditsBalance, apiGetCreditPacks, apiPurchaseCreditsCheckout, apiGetCreditModels, apiDeleteAccount } from './api';
import type { CreditPack, CreditModelInfo } from './api';

const Dashboard: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState<number | null>(null);
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [models, setModels] = useState<CreditModelInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    setLoading(true);
    const [balanceResult, packsResult, modelsResult] = await Promise.all([
      apiGetCreditsBalance(),
      apiGetCreditPacks(),
      apiGetCreditModels(),
    ]);
    if (balanceResult.success) setCredits(balanceResult.credits ?? 0);
    if (packsResult.success && packsResult.packs) setPacks(packsResult.packs);
    if (modelsResult.success && modelsResult.models) setModels(modelsResult.models);
    setLoading(false);
  };

  const handleBuy = async (packId: string) => {
    setPurchasing(packId);
    const result = await apiPurchaseCreditsCheckout(packId);
    setPurchasing(null);
    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      alert(result.error || 'Failed to start checkout. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Please enter your password to confirm account deletion');
      return;
    }

    setDeleting(true);
    setDeleteError('');
    const result = await apiDeleteAccount(deletePassword);
    setDeleting(false);

    if (result.success) {
      alert('Your account has been successfully deleted.');
      logout();
      navigate('/login');
    } else {
      setDeleteError(result.error || result.message || 'Failed to delete account. Please check your password.');
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container">
      <h1>My Dashboard</h1>

      {/* Credit Balance */}
      <section className="credits-section">
        <div className="credits-balance-card">
          <h2>AI Image Credits</h2>
          <div className="credits-amount">{credits ?? 0}</div>
          <p className="credits-label">credits remaining</p>
        </div>
      </section>

      {/* Buy Credits */}
      <section className="buy-credits-section">
        <h2>Buy More Credits</h2>
        <p className="buy-credits-desc">
          Credits power AI image generation inside zStudio. Credit cost varies by model.
        </p>
        <div className="credit-packs">
          {packs.map(pack => (
            <div key={pack.id} className={`credit-pack-card${pack.id === 'pro' ? ' credit-pack-featured' : ''}`}>
              {pack.id === 'pro' && <div className="pack-badge">Most Popular</div>}
              <h3 className="pack-name">{pack.id.charAt(0).toUpperCase() + pack.id.slice(1)}</h3>
              <div className="pack-credits">{pack.credits.toLocaleString()} credits</div>
              <div className="pack-price">${(pack.priceUsdCents / 100).toFixed(0)}</div>
              <div className="pack-value">{((pack.priceUsdCents / pack.credits) / 100 * 100).toFixed(1)}¢ per credit</div>
              <button
                className="button"
                onClick={() => handleBuy(pack.id)}
                disabled={purchasing !== null}
              >
                {purchasing === pack.id ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          ))}
        </div>

        {models.length > 0 && (() => {
          const grouped = models.reduce<Record<number, string[]>>((acc, m) => {
            (acc[m.credits] = acc[m.credits] || []).push(m.name);
            return acc;
          }, {});
          const sortedCosts = Object.keys(grouped).map(Number).sort((a, b) => a - b);
          const costClasses: Record<number, string> = {};
          sortedCosts.forEach((cost, i) => { costClasses[cost] = `cost-${i + 1}`; });
          return (
            <div className="credits-model-info">
              <h3>Credit costs per model</h3>
              <ul>
                {sortedCosts.map(cost => (
                  <li key={cost}>
                    <span className={`cost-badge ${costClasses[cost]}`}>
                      {cost} {cost === 1 ? 'credit' : 'credits'}
                    </span>
                    {grouped[cost].join(' · ')}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}
      </section>

      {/* Delete Account */}
      <section className="delete-account-section" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
        <h2 style={{ color: '#d32f2f' }}>Danger Zone</h2>
        <p style={{ marginBottom: '1rem' }}>Once you delete your account, there is no going back. This action cannot be undone.</p>
        <button
          className="button"
          style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }}
          onClick={() => setShowDeleteModal(true)}
        >
          Delete My Account
        </button>
      </section>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#d32f2f', marginTop: 0 }}>⚠️ Delete Account</h2>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              <strong>Warning:</strong> This action is permanent and cannot be undone. By deleting your account:
            </p>
            <ul style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: '#333' }}>
              <li>All your account information will be permanently deleted</li>
              <li>You will lose all remaining AI credits without possibility of refund</li>
              <li>All active licenses and subscriptions will be cancelled</li>
              <li>This action cannot be reversed</li>
            </ul>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="delete-password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Enter your password to confirm:
              </label>
              <input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Your password"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                disabled={deleting}
              />
            </div>
            {deleteError && (
              <p style={{ color: '#d32f2f', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {deleteError}
              </p>
            )}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                className="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword('');
                  setDeleteError('');
                }}
                disabled={deleting}
                style={{ backgroundColor: '#757575', borderColor: '#757575' }}
              >
                Cancel
              </button>
              <button
                className="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                style={{ backgroundColor: '#d32f2f', borderColor: '#d32f2f' }}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;