import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { apiGetCreditsBalance, apiGetCreditPacks, apiPurchaseCreditsCheckout } from './api';
import type { CreditPack } from './api';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    setLoading(true);
    const [balanceResult, packsResult] = await Promise.all([
      apiGetCreditsBalance(),
      apiGetCreditPacks(),
    ]);
    if (balanceResult.success) setCredits(balanceResult.credits ?? 0);
    if (packsResult.success && packsResult.packs) setPacks(packsResult.packs);
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
          Credits power AI image generation inside zStudio. Each generation costs 1–3 credits depending on the model.
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

        <div className="credits-model-info">
          <h3>Credit costs per model</h3>
          <ul>
            <li><span className="cost-badge cost-1">1 credit</span> Lightning XL · Diffusion XL · AlbedoBase XL · Phoenix</li>
            <li><span className="cost-badge cost-2">2 credits</span> FLUX.1 Kontext · Gemini Flash</li>
            <li><span className="cost-badge cost-3">3 credits</span> GPT Image 1.5</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;