import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';
import { apiGetCreditPacks, apiPurchaseCreditsCheckout, apiGetCreditModels, apiGetChatModels } from './api';
import type { CreditPack, CreditModelInfo, ChatModelInfo } from './api';
import { useAuth } from './AuthContext';
import AICosts from './AICosts';
import { EDITOR_REPO_URL, COMMERCIAL_LICENSE_URL } from './site';

// zStudio is open source with no plans. The only thing for sale is AI credits,
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
  const [creditModels, setCreditModels] = useState<CreditModelInfo[]>([]);
  const [transparentCredits, setTransparentCredits] = useState<number | null>(null);
  const [chatModels, setChatModels] = useState<ChatModelInfo[]>([]);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const [purchasingCredit, setPurchasingCredit] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([apiGetCreditPacks(), apiGetCreditModels(), apiGetChatModels()]).then(([packsResult, modelsResult, chatResult]) => {
      if (packsResult.success && packsResult.packs) setCreditPacks(packsResult.packs);
      if (modelsResult.success && modelsResult.models) setCreditModels(modelsResult.models);
      if (modelsResult.success && typeof modelsResult.transparentBackgroundCredits === 'number') setTransparentCredits(modelsResult.transparentBackgroundCredits);
      if (chatResult.success && chatResult.models) setChatModels(chatResult.models);
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
        description="zStudio is free and open source. Pay only for optional cloud AI with credits that never expire."
        canonical="/pricing"
      />

      <div className="pricing-hero">
        <h1>Free and open source</h1>
        <p className="pricing-subtitle">
          Everything in zStudio is free. You only pay if you want zStudio Cloud: the built-in AI Chat and cloud image models, paid for with credits.
        </p>
      </div>

      <div className="pricing-credits-section">
        <h2 className="pricing-credits-title">Free for everyone</h2>
        <p className="pricing-credits-subtitle">
          No account, no plan, no watermark. The source code is on{' '}
          <a href={EDITOR_REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6' }}>GitHub</a> under the AGPL-3.0.
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
                  <h3>Cloud image models: credits per image</h3>
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
                  {transparentCredits !== null && (
                    <p className="credits-model-note">Transparent background: +{transparentCredits} credits per image.</p>
                  )}
                </div>
              );
            })()}

            {chatModels.length > 0 && (
              <div className="credits-model-info">
                <h3>Built-in AI Chat: credits per AI step</h3>
                <ul>
                  {[...chatModels].sort((a, b) => a.typicalStepCredits - b.typicalStepCredits).map(m => (
                    <li key={m.modelId}>
                      <span className="cost-badge cost-chat">about {m.typicalStepCredits} {m.typicalStepCredits === 1 ? 'credit' : 'credits'}</span>
                      {m.label}
                    </li>
                  ))}
                </ul>
                <p className="credits-model-note">
                  The AI works in steps: each time it reads or changes your scene is one step, and one message usually takes a few.
                  Longer conversations cost a little more per step. You're charged for what each step actually uses, and never more than you have.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="pricing-credits-section">
        <h2 className="pricing-credits-title">Using zStudio in a closed-source product?</h2>
        <p className="pricing-credits-subtitle">
          The AGPL-3.0 requires you to share your changes if you distribute a modified zStudio or offer it over a network.
          If that doesn't work for your company, a{' '}
          <a href={COMMERCIAL_LICENSE_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#14b8a6' }}>commercial licence</a>{' '}
          is available, with optional support and custom development. <a href="/contact" style={{ color: '#14b8a6' }}>Contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
