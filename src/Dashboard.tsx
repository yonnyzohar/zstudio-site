import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { useAuth } from './AuthContext';
import {
  apiGetLicenses,
  apiCancelLicense,
  apiReactivateLicense,
  apiGetLicenseEmails,
  apiAddLicenseEmail,
  apiRemoveLicenseEmail,
  apiGetCreditsBalance,
  apiGetCreditPacks,
  apiPurchaseCreditsCheckout,
  apiGetCreditModels,
  apiDeleteAccount,
  apiGetPrices,
  apiCreateCheckoutSession,
} from './api';
import type { License, CreditPack, CreditModelInfo, PriceInfo } from './api';
import { PLANS } from './Pricing'

// ─── Pricing helpers (mirrored from Pricing.tsx) ────────────────────────────


// applyPlanDiscount reserved for future coupon support
// function applyPlanDiscount(amount: number, coupon: CouponInfo | null): number {
//   if (!coupon) return amount;
//   if (coupon.percent_off) return amount * (1 - coupon.percent_off / 100);
//   if (coupon.amount_off) return Math.max(0, amount - coupon.amount_off);
//   return amount;
// }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIER_LABELS: Record<string, string> = {
  community: 'Community',
  individual_pro: 'Individual Pro',
  team: 'Studio Team',
  enterprise: 'Enterprise',
};

const TIER_COLORS: Record<string, string> = {
  community: 'tier-community',
  individual_pro: 'tier-pro',
  team: 'tier-team',
  enterprise: 'tier-enterprise',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  cancel_at_period_end: 'Cancelling',
  cancelled: 'Cancelled',
  expired: 'Expired',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'status-active',
  cancel_at_period_end: 'status-cancelling',
  cancelled: 'status-cancelled',
  expired: 'status-expired',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

// ─── Seats Panel ──────────────────────────────────────────────────────────────

interface SeatsPanelProps {
  license: License;
}

const SeatsPanel: React.FC<SeatsPanelProps> = ({ license }) => {
  const { userEmail: ownerEmail } = useAuth();
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadEmails = useCallback(async () => {
    setLoading(true);
    const result = await apiGetLicenseEmails(license.license_key);
    if (result.success && result.emails) {
      setEmails(result.emails.map(e => e.email));
    }
    setLoading(false);
  }, [license.license_key]);

  useEffect(() => { loadEmails(); }, [loadEmails]);

  const handleAdd = async () => {
    const trimmed = newEmail.trim();
    if (!trimmed) { setError('Please enter an email address.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError('Please enter a valid email address.'); return; }
    if (emails.includes(trimmed)) { setError('This email is already assigned to this license.'); return; }
    if (license.max_emails !== -1 && emails.length >= license.max_emails) { setError('All seats are already assigned.'); return; }
    setError('');
    setAdding(true);
    const result = await apiAddLicenseEmail(license.license_key, trimmed);
    setAdding(false);
    if (result.success) { setNewEmail(''); await loadEmails(); }
    else { setError(result.message || 'Failed to add seat.'); }
  };

  const handleRemove = async (email: string) => {
    setRemoving(email);
    const result = await apiRemoveLicenseEmail(license.license_key, email);
    setRemoving(null);
    if (result.success) { await loadEmails(); }
    else { setError(result.message || 'Failed to remove seat.'); }
  };

  const isUnlimited = license.max_emails === -1;
  const remaining = isUnlimited ? Infinity : license.max_emails - emails.length;

  return (
    <div className="seats-panel">
      <div className="seats-header">
        <span className="seats-title">Seat Management</span>
        <span className="seats-count">
          {isUnlimited ? `${emails.length} / Unlimited used` : `${emails.length} / ${license.max_emails} used`}
          {!isUnlimited && remaining > 0 && <span className="seats-remaining"> · {remaining} free</span>}
        </span>
      </div>
      {loading ? (
        <p className="seats-loading">Loading seats…</p>
      ) : (
        <>
          <ul className="seat-list">
            {emails.map(email => (
              <li key={email} className="seat-row">
                <span className="seat-email">{email}</span>
                <button
                  className="seat-remove-btn"
                  onClick={() => handleRemove(email)}
                  disabled={removing === email || email === ownerEmail}
                  title={email === ownerEmail ? 'Cannot remove the license owner' : undefined}
                >
                  {removing === email ? '…' : 'Remove'}
                </button>
              </li>
            ))}
            {emails.length === 0 && (
              <li className="seat-row seat-empty">No seats assigned yet.</li>
            )}
          </ul>
          {(isUnlimited || remaining > 0) && (
            <div className="seat-add-row">
              <input
                type="email"
                className="seat-input"
                placeholder="colleague@company.com"
                value={newEmail}
                onChange={e => { setNewEmail(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                disabled={adding}
              />
              <button className="button seat-add-btn" onClick={handleAdd} disabled={adding}>
                {adding ? 'Adding…' : 'Add Seat'}
              </button>
            </div>
          )}
          {error && <p className="seat-error">{error}</p>}
        </>
      )}
    </div>
  );
};

// ─── License Card ─────────────────────────────────────────────────────────────

interface LicenseCardProps {
  license: License;
  onRefresh: () => void;
}

const LicenseCard: React.FC<LicenseCardProps> = ({ license, onRefresh }) => {
  const [copied, setCopied] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [actioning, setActioning] = useState(false);
  const [actionError, setActionError] = useState('');

  const hasSeatManagement = license.license_type === 'team' || license.license_type === 'enterprise';
  const isLifetime = license.license_duration === 'lifetime';
  const canCancel = license.status === 'active' && !isLifetime;
  const hasActivePeriod = license.expiry_date ? new Date(license.expiry_date) > new Date() : false;
  const canReactivate = license.status === 'cancel_at_period_end' || (license.status === 'cancelled' && hasActivePeriod);

  const copyKey = () => {
    navigator.clipboard.writeText(license.license_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancel = async () => {
    setActioning(true);
    setActionError('');
    const result = await apiCancelLicense(license.license_key);
    setActioning(false);
    if (result.success) { setShowCancelModal(false); onRefresh(); }
    else { setActionError(result.message || 'Failed to cancel subscription.'); }
  };

  const handleReactivate = async () => {
    setActioning(true);
    setActionError('');
    const result = await apiReactivateLicense(license.license_key);
    setActioning(false);
    if (result.success) { onRefresh(); }
    else { setActionError(result.message || 'Failed to reactivate subscription.'); }
  };

  return (
    <div className={`license-card${license.status === 'cancelled' || license.status === 'expired' ? ' license-card-inactive' : ''}`}>
      <div className="license-card-header">
        <span className={`tier-badge ${TIER_COLORS[license.license_type] ?? ''}`}>
          {TIER_LABELS[license.license_type] ?? license.license_type}
        </span>
        <span className={`status-badge ${STATUS_COLORS[license.status] ?? ''}`}>
          {STATUS_LABELS[license.status] ?? license.status}
        </span>
      </div>

      <div className="license-key-row">
        <code className="license-key-code">{license.license_key}</code>
        <button className="copy-btn" onClick={copyKey}>{copied ? '✓ Copied' : 'Copy'}</button>
      </div>
      <p className="license-key-hint">Enter this key in the zStudio app to activate your license.</p>

      <div className="license-meta">
        <div className="license-meta-item">
          <span className="meta-label">Billing</span>
          <span className="meta-value">
            {license.license_duration === 'monthly' ? 'Monthly'
              : license.license_duration === 'yearly' ? 'Yearly'
              : '⭐ Lifetime'}
          </span>
        </div>
        <div className="license-meta-item">
          <span className="meta-label">{isLifetime ? 'Type' : 'Renews / Expires'}</span>
          <span className="meta-value">{isLifetime ? 'One-time purchase' : formatDate(license.expiry_date)}</span>
        </div>
        <div className="license-meta-item">
          <span className="meta-label">Seats</span>
          <span className="meta-value">{license.max_emails === -1 ? 'Unlimited' : `${license.max_emails} ${license.max_emails === 1 ? 'seat' : 'seats'}`}</span>
        </div>
      </div>

      {license.status === 'cancel_at_period_end' && license.expiry_date && (
        <div className="license-warning-banner">
          ⚠ Your plan cancels on {formatDate(license.expiry_date)}. Reactivate to keep access.
        </div>
      )}

      {license.status === 'cancelled' && hasActivePeriod && license.expiry_date && (
        <div className="license-warning-banner">
          ⚠ Cancelled — you still have access until {formatDate(license.expiry_date)}. Reactivate to continue your subscription.
        </div>
      )}

      {actionError && <p className="license-action-error">{actionError}</p>}

      <div className="license-actions">
        {canReactivate && (
          <button className="button" onClick={handleReactivate} disabled={actioning}>
            {actioning ? 'Processing…' : 'Reactivate Subscription'}
          </button>
        )}
        {canCancel && (
          <button className="button button-outline-danger" onClick={() => setShowCancelModal(true)} disabled={actioning}>
            Cancel Subscription
          </button>
        )}
      </div>

      {hasSeatManagement && (license.status === 'active' || license.status === 'cancel_at_period_end') && (
        <SeatsPanel license={license} />
      )}

      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ marginTop: 0 }}>Cancel subscription?</h2>
            <p style={{ lineHeight: '1.7', color: '#94a3b8' }}>
              You'll keep access until <strong style={{ color: '#e2e8f0' }}>{formatDate(license.expiry_date)}</strong>.
              After that your license will expire and the app reverts to Community tier.
            </p>
            {actionError && <p style={{ color: '#ef4444' }}>{actionError}</p>}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button
                className="button"
                style={{ background: '#334155', borderColor: '#334155' }}
                onClick={() => { setShowCancelModal(false); setActionError(''); }}
                disabled={actioning}
              >
                Keep subscription
              </button>
              <button className="button button-danger" onClick={handleCancel} disabled={actioning}>
                {actioning ? 'Cancelling…' : 'Yes, cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Dashboard: React.FC = () => {
  const { isLoggedIn, logout, userEmail } = useAuth();
  const navigate = useNavigate();

  // Licenses
  const [licenses, setLicenses] = useState<License[]>([]);
  const [licensesLoading, setLicensesLoading] = useState(true);

  // Plans / pricing
  const [planPrices, setPlanPrices] = useState<Record<string, PriceInfo>>({});
  const [planPricesLoading, setPlanPricesLoading] = useState(true);
  const [planPricesError, setPlanPricesError] = useState(false);
  const [pricingMode, setPricingMode] = useState<'monthly' | 'lifetime'>('monthly');
  const [lifetimeVersionSeries, setLifetimeVersionSeries] = useState('…');
  const [lifetimeNextMinor, setLifetimeNextMinor] = useState('…');
  const [planPurchasing, setPlanPurchasing] = useState<string | null>(null);
  const [planPurchaseError, setPlanPurchaseError] = useState('');

  // Credits
  const [credits, setCredits] = useState<number | null>(null);
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [models, setModels] = useState<CreditModelInfo[]>([]);
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const loadLicenses = useCallback(async () => {
    setLicensesLoading(true);
    const result = await apiGetLicenses();
    if (result.success && result.licenses) {
      const all: License[] = result.licenses;
      const hasNonCommunity = all.some(l => l.license_type !== 'community');
      setLicenses(hasNonCommunity ? all.filter(l => l.license_type !== 'community') : all);
    }
    setLicensesLoading(false);
  }, []);

  const loadCredits = useCallback(async () => {
    setCreditsLoading(true);
    const [balanceResult, packsResult, modelsResult] = await Promise.all([
      apiGetCreditsBalance(),
      apiGetCreditPacks(),
      apiGetCreditModels(),
    ]);
    if (balanceResult.success) setCredits(balanceResult.credits ?? 0);
    if (packsResult.success && packsResult.packs) setPacks(packsResult.packs);
    if (modelsResult.success && modelsResult.models) setModels(modelsResult.models);
    setCreditsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadLicenses();
      loadCredits();
    }
  }, [isLoggedIn, loadLicenses, loadCredits]);

  useEffect(() => {
    apiGetPrices().then(result => {
      if (result.success && result.prices && Object.keys(result.prices).length > 0) {
        setPlanPrices(result.prices);
      } else {
        setPlanPricesError(true);
      }
      setPlanPricesLoading(false);
    });
    fetch(`/latest-release.json?cacheBust=${Date.now()}`)
      .then(r => r.json())
      .then((data: { version: string }) => {
        const [major, minor] = data.version.split('.');
        setLifetimeVersionSeries(`${major}.${minor}.x`);
        setLifetimeNextMinor(`${major}.${Number(minor) + 1}`);
      })
      .catch(() => {});
  }, []);

  // const handleValidatePlanCoupon = async () => {
  //   const code = planCouponCode.trim();
  //   if (!code) return;
  //   setValidatingPlanCoupon(true);
  //   setPlanCouponError('');
  //   setPlanCouponInfo(null);
  //   const result = await apiValidateCoupon(code);
  //   setValidatingPlanCoupon(false);
  //   if (result.success && result.coupon) {
  //     setPlanCouponInfo(result.coupon);
  //   } else {
  //     setPlanCouponError(result.error || 'Invalid or expired coupon.');
  //   }
  // };

  const handlePlanPurchase = async (licenseType: string, licenseDuration: string) => {
    const key = `${licenseType}_${licenseDuration}`;
    setPlanPurchasing(key);
    setPlanPurchaseError('');
    const result = await apiCreateCheckoutSession(
      licenseType,
      licenseDuration,
      undefined
    );
    setPlanPurchasing(null);
    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      setPlanPurchaseError(result.error || 'Failed to start checkout. Please try again.');
    }
  };

  const getPlanPrice = (priceKey: string): number | null =>
    planPrices[priceKey]?.amount ?? null;

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

  const [expiredExpanded, setExpiredExpanded] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<'plans' | 'credits'>('plans');

  if (!isLoggedIn) return <Navigate to="/login" />;

  const activeLicenses = licenses.filter(l => {
    if (l.status === 'active' || l.status === 'cancel_at_period_end') return true;
    // Cancelled but still within the paid period — show in active section so user can reactivate
    if (l.status === 'cancelled' && l.expiry_date && new Date(l.expiry_date) > new Date()) return true;
    return false;
  });
  const expiredLicenses = licenses.filter(l => l.status === 'expired' || (l.status === 'cancelled' && !(l.expiry_date && new Date(l.expiry_date) > new Date())));
  // true when user has no paid plan (either only community license, or no licenses at all)
  const onlyCommunity = licenses.length === 0 || (activeLicenses.length > 0 && activeLicenses.every(l => l.license_type === 'community'));
  // Block purchasing when user already has an active paid subscription
  const hasActiveSubscription = activeLicenses.some(
    l => l.license_type !== 'community' && l.status === 'active'
  );

  return (
    <div className="container">
      <SEO title="Dashboard – zStudio" description="Manage your zStudio license and seat allocation." noindex />
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

      {/* ── Tab Navigation ── */}
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab${dashboardTab === 'plans' ? ' active' : ''}`}
          onClick={() => setDashboardTab('plans')}
        >
          My Plans
        </button>
        <button
          className={`dashboard-tab${dashboardTab === 'credits' ? ' active' : ''}`}
          onClick={() => setDashboardTab('credits')}
        >
          AI Credits
        </button>
      </div>

      {/* ── License Section ── */}
      {dashboardTab === 'plans' && (
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>My Plans</h2>
        </div>

        {licensesLoading ? (
          <p className="loading-text">Loading licenses…</p>
        ) : licenses.length === 0 ? (
          <div className="license-card">
            <div className="license-card-header">
              <span className="tier-badge tier-community">Community</span>
              <span className="status-badge status-active">Active</span>
            </div>
            <p style={{ color: '#94a3b8', margin: '12px 0 4px' }}>You are on the free Community plan.</p>
            <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
              Up to 3 projects · 1 seat · Watermarked exports
            </p>
          </div>
        ) : (
          <>
            {activeLicenses.length > 0 ? (
              <div className="license-list">
                {activeLicenses.map(license => (
                  <LicenseCard key={license.id} license={license} onRefresh={loadLicenses} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No active licenses.</p>
              </div>
            )}

            {expiredLicenses.length > 0 && (
              <div className="expired-licenses-collapsible">
                <button
                  className="expired-licenses-toggle"
                  onClick={() => setExpiredExpanded(e => !e)}
                  aria-expanded={expiredExpanded}
                >
                  <span>Expired / Cancelled plans ({expiredLicenses.length})</span>
                  <span className={`collapsed-chevron${expiredExpanded ? ' open' : ''}`}>▾</span>
                </button>
                {expiredExpanded && (
                  <div className="license-list" style={{ marginTop: '12px' }}>
                    {expiredLicenses.map(license => (
                      <LicenseCard key={license.id} license={license} onRefresh={loadLicenses} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── Buy / Upgrade a Plan ── */}
        <div className="buy-plan-section">
          <h2>{onlyCommunity ? 'Upgrade Your Plan' : 'Get a Plan'}</h2>
          <p className="buy-credits-desc">Choose a plan to unlock more features. Billing is handled securely via Stripe.</p>

          <div className="billing-toggle" style={{ marginBottom: '16px' }}>
            <button
              className={`billing-option${pricingMode === 'monthly' ? ' active' : ''}`}
              onClick={() => setPricingMode('monthly')}
            >
              Monthly
            </button>
            <button
              className={`billing-option${pricingMode === 'lifetime' ? ' active' : ''}`}
              onClick={() => setPricingMode('lifetime')}
            >
              ⭐ Lifetime
            </button>
          </div>

          {pricingMode === 'lifetime' && (
            <p className="lifetime-global-note" style={{ marginBottom: '16px' }}>
              Lifetime licences cover all <strong>{lifetimeVersionSeries}</strong> patch updates.
              When the minor version increments (e.g. to {lifetimeNextMinor}), a new licence is required.
            </p>
          )}

          {planPricesLoading ? (
            <p className="loading-text">Loading prices…</p>
          ) : planPricesError ? (
            <div className="empty-state">
              <p>⚠️ Pricing information is temporarily unavailable.</p>
              <p style={{ marginTop: '8px', fontSize: '0.88rem', color: '#64748b' }}>
                Please try again in a moment or{' '}
                <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6' }}>contact us</a>.
              </p>
            </div>
          ) : (
            <>
              {hasActiveSubscription && (
                <div className="subscription-block-notice">
                  ⚠ You already have an active subscription. Cancel it first to purchase a different plan.
                </div>
              )}
              <div className="pricing-grid pricing-grid--4">
                {PLANS.map(plan => {
                  // ── Community card ──
                  if (plan.key === 'community') {
                    const isCurrentPlan = onlyCommunity && !licensesLoading;
                    return (
                      <div key={plan.key} className="plan-card">
                        {isCurrentPlan && <div className="plan-popular-badge plan-current-badge">Your Current Plan</div>}
                        <h2 className="plan-name">{plan.label}</h2>
                        <p className="plan-tagline">{plan.tagline}</p>
                        <div className="plan-price-block">
                          <span className="plan-price-amount">Free</span>
                        </div>
                        <ul className="plan-features">
                          {plan.features.map(f => (
                            <li key={f} className="plan-feature"><span className="feature-check">✓</span> {f}</li>
                          ))}
                        </ul>
                        <div className="plan-actions">
                          {isCurrentPlan && (
                            <button className="button button-outline" disabled>Current Plan</button>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // ── Enterprise card ──
                  if (plan.key === 'enterprise') {
                    return (
                      <div key={plan.key} className="plan-card">
                        <h2 className="plan-name">{plan.label}</h2>
                        <p className="plan-tagline">{plan.tagline}</p>
                        <div className="plan-price-block">
                          <span className="plan-price-na-note">Custom pricing</span>
                        </div>
                        <ul className="plan-features">
                          {plan.features.map(f => (
                            <li key={f} className="plan-feature"><span className="feature-check">✓</span> {f}</li>
                          ))}
                        </ul>
                        <div className="plan-actions">
                          <a href="mailto:jonzohar@zstudiosltd.com" className="button button-outline">Contact Us</a>
                        </div>
                      </div>
                    );
                  }

                  // ── Paid plans (Individual Pro, Studio Team) ──
                  const monthlyAmount = plan.monthlyKey ? getPlanPrice(plan.monthlyKey) : null;
                  const lifetimeAmount = plan.lifetimeKey ? getPlanPrice(plan.lifetimeKey) : null;
                  const hasLifetime = plan.lifetimeKey != null;
                  const showLifetime = pricingMode === 'lifetime' && hasLifetime;
                  const rawAmount = showLifetime ? lifetimeAmount : monthlyAmount;
                  const duration = showLifetime ? 'lifetime' : 'monthly';
                  const purchaseKey = `${plan.licenseType}_${duration}`;
                  const isProcessing = planPurchasing === purchaseKey;
                  const isBlocked = hasActiveSubscription;

                  return (
                    <div key={plan.key} className={`plan-card${plan.highlighted ? ' plan-card-featured' : ''}`}>
                      {plan.highlighted && <div className="plan-popular-badge">Most Popular</div>}
                      <h2 className="plan-name">{plan.label}</h2>
                      <p className="plan-tagline">{plan.tagline}</p>
                      <div className="plan-price-block">
                        {rawAmount !== null ? (
                          <>
                            <span className="plan-price-amount">
                              {`$${(rawAmount / 100).toFixed(0)}`}
                            </span>
                            <span className="plan-price-period">{showLifetime ? 'one-time' : '/ month'}</span>
                          </>
                        ) : pricingMode === 'lifetime' && !hasLifetime ? (
                          <span className="plan-price-na-note">Monthly only</span>
                        ) : (
                          <span className="plan-price-amount plan-price-na">—</span>
                        )}
                      </div>
                      <ul className="plan-features">
                        {plan.features.map(f => (
                          <li key={f} className="plan-feature"><span className="feature-check">✓</span> {f}</li>
                        ))}
                      </ul>
                      <div className="plan-actions">
                        <button
                          className={`button${plan.highlighted ? '' : ' button-outline'}`}
                          onClick={() => handlePlanPurchase(plan.licenseType, duration)}
                          disabled={isProcessing || isBlocked || (pricingMode === 'lifetime' && !hasLifetime)}
                          title={isBlocked ? 'Cancel your active subscription first' : undefined}
                        >
                          {isProcessing ? 'Processing…' : showLifetime ? 'Get Lifetime' : 'Get Monthly'}
                        </button>
                        {pricingMode === 'lifetime' && !hasLifetime && (
                          <p className="lifetime-version-note">No lifetime option available</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Coupon section hidden for now — re-enable when ready */}
          {planPurchaseError && <p className="pricing-purchase-error">{planPurchaseError}</p>}
        </div>
      </section>
      )}

      {/* ── Credits Section ── */}
      {dashboardTab === 'credits' && (
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <h2>AI Image Credits</h2>
        </div>

        {creditsLoading ? (
          <p className="loading-text">Loading credits…</p>
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
                      onClick={() => handleBuyCredits(pack.id)}
                      disabled={purchasing !== null}
                    >
                      {purchasing === pack.id ? 'Processing…' : 'Buy Now'}
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
            </div>
          </>
        )}
      </section>
      )}

      {/* ── Danger Zone ── */}
      <section className="dashboard-section danger-zone-section">
        <h2 className="danger-zone-title">Danger Zone</h2>
        <p style={{ marginBottom: '1rem', color: '#94a3b8' }}>
          Once you delete your account, there is no going back. All licenses and subscriptions will be cancelled immediately.
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
              This action is <strong style={{ color: '#e2e8f0' }}>permanent and cannot be undone</strong>. All licenses,
              subscriptions, and AI credits will be permanently removed.
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