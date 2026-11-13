import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { apiGetCreditPacks, apiPurchaseCreditsCheckout } from './api';
import type { CreditPack } from './api';
import { useAuth } from './AuthContext';
import AICosts from './AICosts';
import CreditPrices from './CreditPrices';

// zStudio has no plans. The only thing for sale is AI credits,
// which pay for zStudio Cloud (in-app AI chat and cloud image models).
const FREE_FEATURES = [
  'The full scene editor: hierarchy, templates, anchors, portrait & landscape',
  'Timeline animation, particles, Spine, bitmap fonts, PSD import',
  'Pixi.js, Phaser & HTML export with the open-source zImporter',
  'Built-in MCP server: connect Claude, Cursor or any MCP client',
  'Custom AI skill libraries',
  'Local AI image models on your own machine',
  'Scene validation, copy between scenes, no watermark',
];

const Pricing: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [creditPacks, setCreditPacks] = useState<CreditPack[]>([]);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [purchasingCredit, setPurchasingCredit] = useState<string | null>(null);

  useEffect(() => {
    apiGetCreditPacks().then((packsResult) => {
      if (packsResult.success && packsResult.packs) setCreditPacks(packsResult.packs);
      setLoadingCredits(false);
    });
  }, []);

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

  return (
    <div className="container">
      <SEO
        title="Pricing – zStudio"
        description="zStudio is free to download and use. Pay only for optional cloud AI with credits that never expire."
        canonical="/pricing"
      />

      <div className="pricing-hero">
        <h1>Free to download and use</h1>
        <p className="pricing-subtitle">
          Everything in zStudio is free. You only pay if you want zStudio Cloud: the built-in AI Chat and cloud image models, paid for with credits.
        </p>
      </div>

      <div className="pricing-credits-section">
        <h2 className="pricing-credits-title">Free for everyone</h2>
        <p className="pricing-credits-subtitle">
          No account, no plan, no watermark.
        </p>
        <ul className="pricing-free-list" style={{ maxWidth: 640, margin: '1rem auto', lineHeight: 1.9 }}>
          {FREE_FEATURES.map(f => <li key={f}>✓ {f}</li>)}
        </ul>
      </div>

      {/* AI Requirements */}
      <div className="pricing-ai-costs">
        <h2 className="pricing-credits-title">What Each AI Feature Needs</h2>
        <p className="pricing-credits-subtitle">
          zStudio doesn't include an AI subscription. Connect an AI tool you already pay for (free), or use the built-in AI Chat and cloud image models with credits.
        </p>
        <AICosts showPricingLink={false} />
      </div>

      {/* AI Credits Section */}
      <div className="pricing-credits-section" id="credits">
        <h2 className="pricing-credits-title">AI Credits</h2>
        <p className="pricing-credits-subtitle">
          Credits pay for cloud image generation and the built-in AI Chat. Any zStudio account can buy them, and they never expire. You don't need credits to connect your own AI tool over MCP or to use local image models.
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

            <CreditPrices />
          </>
        )}
      </div>

    </div>
  );
};

export default Pricing;
