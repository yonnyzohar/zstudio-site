import React, { useEffect, useState } from 'react';
import { apiGetCreditModels, apiGetChatModels } from './api';
import type { CreditModelInfo, ChatModelInfo } from './api';

// Live AI prices from the server: credits per cloud image model (plus the transparent-
// background extra) and typical credits per AI Chat step. Used on the pricing page and the
// dashboard, so both always show the same, current numbers. Renders nothing until loaded.
const CreditPrices: React.FC = () => {
  const [imageModels, setImageModels] = useState<CreditModelInfo[]>([]);
  const [transparentCredits, setTransparentCredits] = useState<number | null>(null);
  const [chatModels, setChatModels] = useState<ChatModelInfo[]>([]);

  useEffect(() => {
    apiGetCreditModels().then(r => {
      if (r.success && r.models) setImageModels(r.models);
      if (r.success && typeof r.transparentBackgroundCredits === 'number') setTransparentCredits(r.transparentBackgroundCredits);
    });
    apiGetChatModels().then(r => { if (r.success && r.models) setChatModels(r.models); });
  }, []);

  const grouped = imageModels.reduce<Record<number, string[]>>((acc, m) => {
    (acc[m.credits] = acc[m.credits] || []).push(m.name);
    return acc;
  }, {});
  const sortedCosts = Object.keys(grouped).map(Number).sort((a, b) => a - b);
  const plural = (n: number) => (n === 1 ? 'credit' : 'credits');

  return (
    <>
      {sortedCosts.length > 0 && (
        <div className="credits-model-info">
          <h3>Cloud image models: credits per image</h3>
          <ul>
            {sortedCosts.map((cost, i) => (
              <li key={cost}>
                <span className={`cost-badge cost-${i + 1}`}>{cost} {plural(cost)}</span>
                {grouped[cost].join(' · ')}
              </li>
            ))}
          </ul>
          {transparentCredits !== null && (
            <p className="credits-model-note">Transparent background: +{transparentCredits} credits per image.</p>
          )}
        </div>
      )}

      {chatModels.length > 0 && (
        <div className="credits-model-info">
          <h3>Built-in AI Chat: credits per AI step</h3>
          <ul>
            {[...chatModels].sort((a, b) => a.typicalStepCredits - b.typicalStepCredits).map(m => (
              <li key={m.modelId}>
                <span className="cost-badge cost-chat">about {m.typicalStepCredits} {plural(m.typicalStepCredits)}</span>
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
  );
};

export default CreditPrices;
