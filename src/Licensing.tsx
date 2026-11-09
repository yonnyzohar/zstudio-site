import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { CONTACT_EMAIL, EDITOR_REPO_URL, EDITOR_LICENSE_URL, COMMERCIAL_LICENSE_URL, CLA_URL, TRADEMARKS_URL } from './site';

// zStudio is dual-licensed: AGPL-3.0 for everyone, or a commercial licence from zStudios Ltd
// for anyone who can't (or doesn't want to) meet the AGPL's share-your-source terms.

const CASES: { situation: string; answer: 'free' | 'commercial' | 'talk'; note: string }[] = [
  { situation: 'Using zStudio to build games, including commercial ones', answer: 'free', note: 'Your scenes, assets and games are yours. The zImporter runtimes are MIT licensed.' },
  { situation: 'Changing zStudio for your own use, without giving it to anyone', answer: 'free', note: 'The AGPL’s obligations start when you share it or let others use it.' },
  { situation: 'Forking zStudio and publishing your changes under the AGPL-3.0', answer: 'free', note: 'Welcome. Use your own name and logo, not zStudio’s.' },
  { situation: 'Shipping a modified zStudio in a closed-source product, or to clients without the source', answer: 'commercial', note: 'The AGPL would require you to publish your full source.' },
  { situation: 'Offering a modified zStudio to users over a network without publishing the source', answer: 'commercial', note: 'Network use counts as distribution under the AGPL.' },
  { situation: 'A private studio fork shared across your team, contractors or partners', answer: 'talk', note: 'Depends on who uses it and how. We’ll help you pick the right option.' },
];

const ANSWER_LABEL = { free: 'Free (AGPL-3.0)', commercial: 'Commercial licence', talk: 'Talk to us' } as const;

const USE_CASES = [
  'Closed-source product or tool',
  'Online service',
  'Internal studio pipeline',
  'Support or custom development',
  'Something else',
];

const Licensing: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState(USE_CASES[0]);
  const [teamSize, setTeamSize] = useState('');
  const [message, setMessage] = useState('');

  // Opens the visitor's email app with the enquiry filled in (no data passes through our servers).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Commercial licence enquiry${company ? ` – ${company}` : ''}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Use: ${useCase}`,
      `Team size: ${teamSize || '-'}`,
      '',
      message,
    ].join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container licensing-page">
      <SEO
        title="Licensing – zStudio"
        description="zStudio is free and open source under the AGPL-3.0. Companies that can't share their changes can buy a commercial licence from zStudios Ltd."
        canonical="/licensing"
      />

      <h1><span className="title-gradient">Licensing</span></h1>
      <p className="licensing-lead">
        zStudio is free and open source under the <a href={EDITOR_LICENSE_URL} target="_blank" rel="noopener noreferrer">AGPL-3.0</a>.
        Anyone can use it, change it and fork it, as long as changes they share stay open source too.
        If that doesn’t work for your company, buy a commercial licence instead.
      </p>

      <div className="licensing-options">
        <div className="licensing-card">
          <h2>Free: AGPL-3.0</h2>
          <ul>
            <li>Use zStudio for any project, including commercial games.</li>
            <li>Change it, fork it and share it.</li>
            <li>If you give a modified zStudio to anyone, or let people use it over a network, you must publish your full source code under the AGPL-3.0.</li>
          </ul>
          <a className="licensing-link" href={EDITOR_REPO_URL} target="_blank" rel="noopener noreferrer">Source code on GitHub</a>
        </div>
        <div className="licensing-card licensing-card-commercial">
          <h2>Commercial licence</h2>
          <ul>
            <li>Keep your changes private: embed zStudio in a closed-source product, a client project or an online service.</li>
            <li>No obligation to publish your source.</li>
            <li>Optional priority support, custom development and help integrating zStudio into your pipeline.</li>
          </ul>
          <a className="licensing-link" href="#licensing-contact">Ask about a commercial licence</a>
        </div>
      </div>

      <h2 className="licensing-heading">Do I need a commercial licence?</h2>
      <div className="licensing-table" role="table" aria-label="Which licence you need">
        {CASES.map(c => (
          <div key={c.situation} className="licensing-row" role="row">
            <span role="cell" className="licensing-situation">{c.situation}</span>
            <span role="cell" className={`licensing-answer licensing-answer-${c.answer}`}>{ANSWER_LABEL[c.answer]}</span>
            <span role="cell" className="licensing-note">{c.note}</span>
          </div>
        ))}
      </div>

      <h2 className="licensing-heading">Forks and contributions</h2>
      <div className="licensing-faq">
        <p>
          <strong>Forking.</strong> Forks are welcome on GitHub. A fork is covered by the AGPL-3.0 like zStudio itself, so anyone
          who distributes it or runs it for others must publish its source. Forks can’t use the zStudio name or logo: see the{' '}
          <a href={TRADEMARKS_URL} target="_blank" rel="noopener noreferrer">trademark policy</a>.
        </p>
        <p>
          <strong>Contributing.</strong> To send changes back to zStudio, open a pull request. On your first one, a bot asks you to agree to our{' '}
          <a href={CLA_URL} target="_blank" rel="noopener noreferrer">Contributor Licence Agreement</a>. You keep the copyright; the agreement
          lets zStudios Ltd offer your contribution under both licences.
        </p>
        <p>
          <strong>Your content.</strong> Neither licence covers what you make with zStudio. Your scenes and games are yours.
        </p>
      </div>

      <h2 className="licensing-heading" id="licensing-contact">Ask about a commercial licence</h2>
      <form className="licensing-form" onSubmit={handleSubmit}>
        <div className="licensing-form-row">
          <label>Name<input value={name} onChange={e => setName(e.target.value)} required autoComplete="name" /></label>
          <label>Company<input value={company} onChange={e => setCompany(e.target.value)} required autoComplete="organization" /></label>
        </div>
        <div className="licensing-form-row">
          <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></label>
          <label>Team size<input value={teamSize} onChange={e => setTeamSize(e.target.value)} placeholder="e.g. 12" /></label>
        </div>
        <label>What do you need it for?
          <select value={useCase} onChange={e => setUseCase(e.target.value)}>
            {USE_CASES.map(u => <option key={u}>{u}</option>)}
          </select>
        </label>
        <label>Tell us about your project
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required />
        </label>
        <button type="submit" className="button">Write to us</button>
        <p className="licensing-form-hint">
          This opens your email app with your details filled in. Or write directly to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </form>

      <p className="licensing-disclaimer">
        This page is a summary. The <a href={EDITOR_LICENSE_URL} target="_blank" rel="noopener noreferrer">AGPL-3.0 licence</a> and
        our <a href={COMMERCIAL_LICENSE_URL} target="_blank" rel="noopener noreferrer">commercial licence terms</a> are what apply.
        See also our <Link to="/terms">terms</Link>.
      </p>
    </div>
  );
};

export default Licensing;
