import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetPrices, apiValidateCoupon, apiCreateCheckoutSession, apiGetCreditPacks, apiPurchaseCreditsCheckout, apiGetCreditModels } from './api';
import type { PriceInfo, CouponInfo, CreditPack, CreditModelInfo } from './api';
import SEO from './SEO';

function deriveVersionSeries(version: string): { series: string; nextMinor: string } {
  const [major, minor] = version.split('.');
  return {
    series: `${major}.${minor}.x`,
    nextMinor: `${major}.${Number(minor) + 1}`,
  };
}

interface PlanDef {
  key: string;
  licenseType: string;
  label: string;
  tagline: string;
  features: string[];
  monthlyKey: string;
  lifetimeKey?: string;
  highlighted?: boolean;
}

export const PLANS: PlanDef[] = [
  {
    key: 'community',
    licenseType: 'community',
    label: 'Community',
    tagline: 'Get started for free',
    features: [
      '1 seat',
      'Watermarked exports',
      'Pixi.js & Phaser export'
    ],
    monthlyKey: '',
  },
  {
    key: 'individual_pro',
    licenseType: 'individual_pro',
    label: 'Individual Pro',
    tagline: 'For professional developers',
    features: [
      '1 seat',
      'No watermarks',
      'Photoshop Importer',
      'AI image generation',
      'MCP Server',
      'Copying between scenes',
      'Email support',
    ],
    monthlyKey: 'individual_pro_monthly',
    lifetimeKey: 'individual_pro_lifetime',
    highlighted: true,
  },
  {
    key: 'team',
    licenseType: 'team',
    label: 'Studio Team',
    tagline: 'For game studios',
    features: [
      '5 seats',
      'No watermarks',
      'Photoshop Importer',
      'AI image generation',
      'MCP Server',
      'Copying between scenes',
      'Priority support'
    ],
    monthlyKey: 'team_monthly',
    lifetimeKey: 'team_lifetime',
  },
  {
    key: 'enterprise',
    licenseType: 'enterprise',
    label: 'Enterprise',
    tagline: 'For large teams & studios',
    features: ['Unlimited seats', 'Dedicated support', 'Custom integrations', 'Priority onboarding'],
    monthlyKey: '',
  }
];

function applyDiscount(amount: number, coupon: CouponInfo | null): number {
  if (!coupon) return amount;
  if (coupon.percent_off) return amount * (1 - coupon.percent_off / 100);
  if (coupon.amount_off) return Math.max(0, amount - coupon.amount_off);
  return amount;
}

const Pricing: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();


  const [prices, setPrices] = useState<Record<string, PriceInfo>>({});
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [pricesError, setPricesError] = useState(false);
  const [lifetimeVersionSeries, setLifetimeVersionSeries] = useState('…');
  const [lifetimeNextMinor, setLifetimeNextMinor] = useState('…');
  const [pricingMode, setPricingMode] = useState<'monthly' | 'lifetime'>('monthly');

  const [couponCode, setCouponCode] = useState('');
  const [couponInfo, setCouponInfo] = useState<CouponInfo | null>(null);
  const [couponError, setCouponError] = useState('');
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState('');

  const [creditPacks, setCreditPacks] = useState<CreditPack[]>([]);
  const [creditModels, setCreditModels] = useState<CreditModelInfo[]>([]);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [purchasingCredit, setPurchasingCredit] = useState<string | null>(null);

  useEffect(() => {
    apiGetPrices().then(result => {
      if (result.success && result.prices && Object.keys(result.prices).length > 0) {
        setPrices(result.prices);
      } else {
        setPricesError(true);
      }
      setLoadingPrices(false);
    });

    fetch(`/latest-release.json?cacheBust=${Date.now()}`)
      .then(r => r.json())
      .then((data: { version: string }) => {
        const { series, nextMinor } = deriveVersionSeries(data.version);
        setLifetimeVersionSeries(series);
        setLifetimeNextMinor(nextMinor);
      })
      .catch(() => { /* keep placeholder */ });

    Promise.all([apiGetCreditPacks(), apiGetCreditModels()]).then(([packsResult, modelsResult]) => {
      if (packsResult.success && packsResult.packs) setCreditPacks(packsResult.packs);
      if (modelsResult.success && modelsResult.models) setCreditModels(modelsResult.models);
      setLoadingCredits(false);
    });
  }, []);

  const handleValidateCoupon = async () => {
    const code = couponCode.trim();
    if (!code) return;
    setValidatingCoupon(true);
    setCouponError('');
    setCouponInfo(null);
    const result = await apiValidateCoupon(code);
    setValidatingCoupon(false);
    if (result.success && result.coupon) {
      setCouponInfo(result.coupon);
    } else {
      setCouponError(result.error || 'Invalid or expired coupon.');
    }
  };

  const handlePurchase = async (licenseType: string, licenseDuration: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const key = `${licenseType}_${licenseDuration}`;
    setPurchasing(key);
    setPurchaseError('');
    const result = await apiCreateCheckoutSession(
      licenseType,
      licenseDuration,
      couponInfo ? couponCode.trim() : undefined
    );
    setPurchasing(null);
    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      setPurchaseError(result.error || 'Failed to start checkout. Please try again.');
    }
  };

  const handleBuyCredits = async (packId: string) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setPurchasingCredit(packId);
    const result = await apiPurchaseCreditsCheckout(packId);
    setPurchasingCredit(null);
    if (result.success && result.url) {
      window.location.href = result.url;
    } else {
      alert(result.error || 'Failed to start checkout. Please try again.');
    }
  };

  const getPrice = (priceKey: string): number | null => {
    return prices[priceKey]?.amount ?? null;
  };

  const discountLabel = couponInfo
    ? couponInfo.percent_off
      ? `${couponInfo.percent_off}% off`
      : couponInfo.amount_off
        ? `$${(couponInfo.amount_off / 100).toFixed(2)} off`
        : ''
    : '';

  return (
    <div className="container">
      <SEO
        title="Pricing – zStudio Plans"
        description="Choose the right zStudio plan for you. Free Community, Individual Pro, and Studio Team plans available. Monthly, yearly, and lifetime options."
        canonical="/pricing"
      />

      <div className="pricing-hero">
        <h1>Simple, transparent pricing</h1>
        <p className="pricing-subtitle">
          Start free. Upgrade when you need more power.
        </p>

        <div className="billing-toggle">
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
          <p className="lifetime-global-note">
            Lifetime licences cover all <strong>{lifetimeVersionSeries}</strong> patch updates.
            When the minor version increments (e.g. to {lifetimeNextMinor}),
            a new licence is required to continue receiving updates.
          </p>
        )}
      </div>

      {loadingPrices ? (
        <p className="loading-text" style={{ textAlign: 'center' }}>Loading prices…</p>
      ) : pricesError ? (
        <div className="empty-state" style={{ marginBottom: '40px' }}>
          <p>⚠️ Pricing information is temporarily unavailable.</p>
          <p style={{ marginTop: '8px', fontSize: '0.88rem', color: '#64748b' }}>
            Please try again in a moment or{' '}
            <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6' }}>contact us</a> to purchase.
          </p>
        </div>
      ) : (
        <div className="pricing-grid">
          {PLANS.map(plan => {
            const isFree = plan.key === 'community';
            const monthlyAmount = plan.monthlyKey ? getPrice(plan.monthlyKey) : null;
            const lifetimeAmount = plan.lifetimeKey ? getPrice(plan.lifetimeKey) : null;
            const hasLifetime = plan.lifetimeKey != null;
            const showLifetime = pricingMode === 'lifetime' && hasLifetime;
            const rawAmount = showLifetime ? lifetimeAmount : monthlyAmount;
            const discountedAmount = rawAmount !== null ? applyDiscount(rawAmount, couponInfo) : null;
            const duration = showLifetime ? 'lifetime' : 'monthly';
            const purchaseKey = `${plan.licenseType}_${duration}`;
            const isProcessing = purchasing === purchaseKey;

            return (
              <div key={plan.key} className={`plan-card${plan.highlighted ? ' plan-card-featured' : ''}`}>
                {plan.highlighted && <div className="plan-popular-badge">Most Popular</div>}

                <h2 className="plan-name">{plan.label}</h2>
                <p className="plan-tagline">{plan.tagline}</p>

                <div className="plan-price-block">
                  {isFree ? (
                    <>
                      <span className="plan-price-amount">Free</span>
                      <span className="plan-price-period">forever</span>
                    </>
                  ) : rawAmount !== null ? (
                    <>
                      <span className="plan-price-amount">
                        {couponInfo && discountedAmount !== rawAmount ? (
                          <>
                            <span className="plan-price-original">${(rawAmount / 100).toFixed(0)}</span>
                            ${(discountedAmount! / 100).toFixed(0)}
                          </>
                        ) : (
                          `$${(rawAmount / 100).toFixed(0)}`
                        )}
                      </span>
                      <span className="plan-price-period">
                        {showLifetime ? 'one-time' : '/ month'}
                      </span>
                    </>
                  ) : pricingMode === 'lifetime' && !hasLifetime ? (
                    <span className="plan-price-na-note">Monthly only</span>
                  ) : (
                    <span className="plan-price-amount plan-price-na">—</span>
                  )}
                </div>

                <ul className="plan-features">
                  {plan.features.map(f => (
                    <li key={f} className="plan-feature">
                      <span className="feature-check">✓</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="plan-actions">
                  {isFree ? (
                    isLoggedIn ? (
                      <Link to="/dashboard" className="button button-outline">Go to Dashboard</Link>
                    ) : (
                      <Link to="/login" className="button button-outline">Get Started Free</Link>
                    )
                  ) : (
                    <>
                      <button
                        className={`button${plan.highlighted ? '' : ' button-outline'}`}
                        onClick={() => handlePurchase(plan.licenseType, duration)}
                        disabled={isProcessing || (pricingMode === 'lifetime' && !hasLifetime)}
                      >
                        {isProcessing
                          ? 'Processing…'
                          : isLoggedIn
                            ? showLifetime ? 'Get Lifetime' : 'Get Monthly'
                            : 'Sign in to purchase'}
                      </button>
                      {pricingMode === 'lifetime' && !hasLifetime && (
                        <p className="lifetime-version-note">No lifetime option available</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Credits Section */}
      <div className="pricing-credits-section">
        <h2 className="pricing-credits-title">AI Image Credits</h2>
        <p className="pricing-credits-subtitle">
          Power AI image generation inside zStudio. Credits work across all plans and never expire.
        </p>

        {loadingCredits ? (
          <p className="loading-text" style={{ textAlign: 'center' }}>Loading credit packs…</p>
        ) : creditPacks.length === 0 ? (
          <div className="empty-state">
            <p>Credit packs are temporarily unavailable.</p>
          </div>
        ) : (
          <>
            <div className="credit-packs">
              {creditPacks.map(pack => (
                <div key={pack.id} className={`credit-pack-card${pack.id === 'pro' ? ' credit-pack-featured' : ''}`}>
                  {pack.id === 'pro' && <div className="pack-badge">Most Popular</div>}
                  <h3 className="pack-name">{pack.label || (pack.id.charAt(0).toUpperCase() + pack.id.slice(1))}</h3>
                  <div className="pack-credits">{pack.credits.toLocaleString()} credits</div>
                  <div className="pack-price">${(pack.priceUsdCents / 100).toFixed(0)}</div>
                  <div className="pack-value">{((pack.priceUsdCents / pack.credits) / 100 * 100).toFixed(1)}¢ per credit</div>
                  <button
                    className="button"
                    onClick={() => handleBuyCredits(pack.id)}
                    disabled={purchasingCredit !== null}
                  >
                    {purchasingCredit === pack.id
                      ? 'Processing…'
                      : isLoggedIn
                        ? 'Buy Now'
                        : 'Sign in to purchase'}
                  </button>
                </div>
              ))}
            </div>

            {creditModels.length > 0 && (() => {
              const grouped = creditModels.reduce<Record<number, string[]>>((acc, m) => {
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
          </>
        )}
      </div>

      {/* Coupon code */}
      {!loadingPrices && (
        <div className="coupon-section">
          <h3>Have a coupon code?</h3>
          {couponInfo ? (
            <div className="coupon-applied">
              <span className="coupon-success">✓ Coupon applied: <strong>{couponInfo.name}</strong> — {discountLabel}</span>
              <button
                className="coupon-remove-btn"
                onClick={() => { setCouponInfo(null); setCouponCode(''); }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="coupon-row">
              <input
                type="text"
                className="coupon-input"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={e => { setCouponCode(e.target.value); setCouponError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleValidateCoupon()}
                disabled={validatingCoupon}
              />
              <button
                className="button"
                onClick={handleValidateCoupon}
                disabled={validatingCoupon || !couponCode.trim()}
              >
                {validatingCoupon ? 'Checking…' : 'Apply'}
              </button>
            </div>
          )}
          {couponError && <p className="coupon-error">{couponError}</p>}
        </div>
      )}

      {purchaseError && (
        <p className="pricing-purchase-error">{purchaseError}</p>
      )}

      {/* Feature comparison note */}
      <div className="pricing-footer-note">
        <p>All plans include access to the full zStudio desktop editor. AI credits are purchased separately and work across all plans.</p>
        <p style={{ marginTop: '0.5rem' }}>
          Need enterprise pricing?{' '}
          <a href="mailto:jonzohar@zstudiosltd.com" style={{ color: '#14b8a6' }}>Contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
