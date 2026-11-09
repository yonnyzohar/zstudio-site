import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import CreditPrices from './CreditPrices';
import { useAuth } from './AuthContext';
import {
  apiGetCreditsBalance,
  apiGetCreditPacks,
  apiPurchaseCreditsCheckout,
  apiDeleteAccount,
} from './api';
import type { CreditPack } from './api';

// zStudio is open source with no plans. The dashboard manages the account and
// AI credits, which pay for zStudio Cloud (in-app AI chat and cloud image models).
const Dashboard: React.FC = () => {
  const { isLoggedIn, logout, userEmail } = useAuth();
  const navigate = useNavigate();
  const handleUnauthorized = useCallback(() => { logout(); navigate('/login'); }, [logout, navigate]);

  // Credits
  const [credits, setCredits] = useState<number | null>(null);
  const [creditsError, setCreditsError] = useState(false);
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const loadCredits = useCallback(async () => {
    setCreditsLoading(true);
    setCreditsError(false);
    const [balanceResult, packsResult] = await Promise.all([
      apiGetCreditsBalance(),
      apiGetCreditPacks(),
    ]);
    if (balanceResult.unauthorized) { handleUnauthorized(); return; }
    if (balanceResult.success) setCredits(balanceResult.credits ?? 0);
    else setCreditsError(true);
    if (packsResult.success && packsResult.packs) setPacks(packsResult.packs);
    setCreditsLoading(false);
  }, [handleUnauthorized]);

  useEffect(() => {
    if (isLoggedIn) loadCredits();
  }, [isLoggedIn, loadCredits]);

  const handleBuyCredits = async (packId: string) => {
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
      setDeleteError('Please enter your password to confirm account deletion.');
      return;
    }
    setDeleting(true);
    setDeleteError('');
    const result = await apiDeleteAccount(deletePassword);
    setDeleting(false);
    if (result.success) {
      logout();
      navigate('/login');
    } else {
      setDeleteError(result.error || result.message || 'Failed to delete account. Please check your password.');
    }
  };

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <div className="container">
      <SEO title="Dashboard – zStudio" description="Manage your zStudio account and AI credits." noindex />
      <div className="dashboard-hero">
        <div className="dashboard-hero-top">
          <h1>My Dashboard</h1>
          <button
            className="button button-outline"
            onClick={() => { logout(); navigate('/'); }}
          >
            Logout
          </button>
        </div>
        {userEmail && <span className="dashboard-user-email">{userEmail}</span>}
      </div>

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>AI Credits</h2>
        </div>

        {creditsLoading ? (
          <p className="loading-text">Loading credits…</p>
        ) : creditsError ? (
          <div className="empty-state">
            <p>Could not load your credits. Please <button className="link-btn" onClick={loadCredits}>try again</button>.</p>
          </div>
        ) : (
          <>
            <div className="credits-section">
              <div className="credits-balance-card">
                <h2>Balance</h2>
                <div className="credits-amount">{credits ?? 0}</div>
                <p className="credits-label">credits remaining</p>
              </div>
            </div>

            <div className="buy-credits-section">
              <h2>Buy More Credits</h2>
              <p className="buy-credits-desc">
                Credits pay for zStudio Cloud: the in-app AI chat and cloud image models. Everything else in zStudio is free and open source. Credit cost varies by model.
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
                      onClick={() => handleBuyCredits(pack.id)}
                      disabled={purchasing !== null}
                    >
                      {purchasing === pack.id ? 'Processing…' : 'Buy Now'}
                    </button>
                  </div>
                ))}
              </div>

              <CreditPrices />
            </div>
          </>
        )}
      </section>

      {/* ── Danger Zone ── */}
      <section className="dashboard-section danger-zone-section">
        <h2 className="danger-zone-title">Danger Zone</h2>
        <p style={{ marginBottom: '1rem', color: '#94a3b8' }}>
          Once you delete your account, there is no going back. Your account and any remaining AI credits will be removed.
        </p>
        <button className="button button-danger" onClick={() => setShowDeleteModal(true)}>
          Delete My Account
        </button>
      </section>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ color: '#ef4444', marginTop: 0 }}>⚠ Delete Account</h2>
            <p style={{ lineHeight: '1.7', color: '#94a3b8', marginBottom: '1rem' }}>
              This action is <strong style={{ color: '#e2e8f0' }}>permanent and cannot be undone</strong>. Your account
              and any remaining AI credits will be permanently removed.
            </p>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              Enter your password to confirm:
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={e => setDeletePassword(e.target.value)}
              placeholder="Your password"
              className="modal-input"
              disabled={deleting}
            />
            {deleteError && <p style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>{deleteError}</p>}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                className="button"
                style={{ background: '#334155', borderColor: '#334155' }}
                onClick={() => { setShowDeleteModal(false); setDeletePassword(''); setDeleteError(''); }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button className="button button-danger" onClick={handleDeleteAccount} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
