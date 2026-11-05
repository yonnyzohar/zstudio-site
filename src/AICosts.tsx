import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetCreditModels, apiGetCreditPacks } from './api';
import type { CreditModelInfo, CreditPack } from './api';

interface AICostsProps {
  showPricingLink?: boolean;
}

// Spells out what each AI feature needs (plan, cost, outside subscription,
// hardware) so nobody is surprised after installing. Credit figures are live.
const AICosts: React.FC<AICostsProps> = ({ showPricingLink = true }) => {
  const [packs, setPacks] = useState<CreditPack[]>([]);
  const [models, setModels] = useState<CreditModelInfo[]>([]);

  useEffect(() => {
    apiGetCreditPacks().then(r => { if (r.success && r.packs) setPacks(r.packs); });
    apiGetCreditModels().then(r => { if (r.success && r.models) setModels(r.models); });
  }, []);

  const cheapestPack = packs.length ? packs.reduce((a, b) => (a.priceUsdCents <= b.priceUsdCents ? a : b)) : null;
  const centsPerCredit = cheapestPack ? cheapestPack.priceUsdCents / cheapestPack.credits : null;
  const imageCredits = models.map(m => m.credits);
  const minImage = imageCredits.length ? Math.min(...imageCredits) : null;
  const maxImage = imageCredits.length ? Math.max(...imageCredits) : null;

  const imageCost = minImage !== null && maxImage !== null
    ? `${minImage}–${maxImage} credits per image${centsPerCredit ? ` (about $${(minImage * centsPerCredit / 100).toFixed(2)}–$${(maxImage * centsPerCredit / 100).toFixed(2)})` : ''}`
    : 'Credits per image, depending on the model';

  const rows = [
    {
      feature: 'Connect your own AI (MCP)',
      plan: 'Every plan',
      cost: 'Free in zStudio. You pay your AI tool.',
      needs: 'An AI tool that supports MCP, on its own subscription. zStudio does not include one.',
    },
    {
      feature: 'Custom skills',
      plan: 'Every plan',
      cost: 'Free',
      needs: 'Used by your connected AI tool or the built-in AI Chat.',
    },
    {
      feature: 'Local image models',
      plan: 'Every plan',
      cost: 'Free',
      needs: 'Model files you download yourself. SD 1.5 runs on most machines; SDXL, FLUX and Z-Image want 12–24 GB of memory. Images come out without transparency.',
    },
    {
      feature: 'Cloud image models',
      plan: 'Individual Pro and up',
      cost: imageCost,
      needs: 'A paid plan plus credits, bought separately. Supports transparent backgrounds.',
    },
    {
      feature: 'Built-in AI Chat',
      plan: 'Individual Pro and up',
      cost: 'Credits per request, depending on the AI model you pick',
      needs: 'A paid plan plus credits. No outside AI subscription needed.',
    },
  ];

  return (
    <div className="ai-costs">
      <div className="ai-costs-table" role="table" aria-label="What each AI feature needs">
        <div className="ai-costs-row ai-costs-head" role="row">
          <span role="columnheader">Feature</span>
          <span role="columnheader">Plan</span>
          <span role="columnheader">Cost</span>
          <span role="columnheader">What you need</span>
        </div>
        {rows.map(r => (
          <div key={r.feature} className="ai-costs-row" role="row">
            <strong role="cell">{r.feature}</strong>
            <span role="cell" data-label="Plan">{r.plan}</span>
            <span role="cell" data-label="Cost">{r.cost}</span>
            <span role="cell" data-label="What you need">{r.needs}</span>
          </div>
        ))}
      </div>
      <p className="ai-costs-note">
        Credits are bought separately from your plan and never expire
        {cheapestPack && centsPerCredit
          ? `. Packs start at $${(cheapestPack.priceUsdCents / 100).toFixed(0)} for ${cheapestPack.credits} credits (about ${centsPerCredit.toFixed(1)}¢ each).`
          : '.'}
        {showPricingLink && <> <Link to="/pricing">See credit packs</Link></>}
      </p>
    </div>
  );
};

export default AICosts;
