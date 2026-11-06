import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SEO from './SEO';
import { CHAPTERS, ENGINES } from './importerGuideData';
import type { Block, CodeMap, Engine } from './importerGuideData';

const ENGINE_KEY = 'zimporter-guide-engine';
const GUIDE_PATH = '/z-importer/guide';

const readSavedEngine = (): Engine => {
  try {
    const saved = localStorage.getItem(ENGINE_KEY);
    if (ENGINES.some(e => e.id === saved)) return saved as Engine;
  } catch { /* storage blocked, use the default */ }
  return 'pixi7';
};

const pickCode = (code: CodeMap, engine: Engine): string | undefined => {
  const isPixi = engine === 'pixi7' || engine === 'pixi8';
  return code[engine] ?? (isPixi ? code.pixi : undefined) ?? code.all;
};

/** Renders `code`, **bold** and [links](/path) inside guide text. */
const Inline: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith('**')) return <strong key={i}><Inline text={part.slice(2, -2)} /></strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return link[2].startsWith('/')
            ? <Link key={i} to={link[2]}>{link[1]}</Link>
            : <a key={i} href={link[2]}>{link[1]}</a>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};

const CodeBlock: React.FC<{ code: string; lang: string }> = ({ code, lang }) => {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ref.current && window.Prism) window.Prism.highlightElement(ref.current);
  }, [code, lang]);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="guide-code">
      <button className="guide-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      {/* The key remounts <code> so Prism's markup never conflicts with React's. */}
      <pre><code key={code} ref={ref} className={`language-${lang}`}>{code}</code></pre>
    </div>
  );
};

const GuideBlock: React.FC<{ block: Block; engine: Engine }> = ({ block, engine }) => {
  if (block.only && !block.only.includes(engine)) return null;
  switch (block.t) {
    case 'h':
      return <h2><Inline text={block.text} /></h2>;
    case 'p':
      return <p><Inline text={block.text} /></p>;
    case 'code': {
      const code = pickCode(block.code, engine);
      return code ? <CodeBlock code={code} lang={block.lang || 'typescript'} /> : null;
    }
    case 'tree':
      return <pre className="guide-tree">{block.text}</pre>;
    case 'note':
      return (
        <div className={`guide-note guide-note-${block.kind}`}>
          <Inline text={block.text} />
        </div>
      );
    case 'ul':
      return <ul>{block.items.map(item => <li key={item}><Inline text={item} /></li>)}</ul>;
    case 'table':
      return (
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead><tr>{block.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {block.rows.map(row => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}><Inline text={cell} /></td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
};

const EngineSwitcher: React.FC<{ engine: Engine; onChange: (e: Engine) => void }> = ({ engine, onChange }) => (
  <div className="guide-engines" role="group" aria-label="Choose your engine">
    <span>Showing code for</span>
    {ENGINES.map(e => (
      <button
        key={e.id}
        className={e.id === engine ? 'active' : ''}
        aria-pressed={e.id === engine}
        onClick={() => onChange(e.id)}
      >
        {e.label}
      </button>
    ))}
  </div>
);

const ZImporterGuide: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [engine, setEngine] = useState<Engine>(readSavedEngine);

  const chooseEngine = (next: Engine) => {
    setEngine(next);
    try { localStorage.setItem(ENGINE_KEY, next); } catch { /* storage blocked */ }
  };

  const index = CHAPTERS.findIndex(c => c.slug === slug);
  if (slug && index < 0) return <Navigate to={GUIDE_PATH} replace />;

  const chapter = index >= 0 ? CHAPTERS[index] : null;
  const prev = index > 0 ? CHAPTERS[index - 1] : null;
  const next = index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null;
  const engineInfo = ENGINES.find(e => e.id === engine)!;

  return (
    <div className="container guide-page">
      <SEO
        title={chapter ? `${chapter.title} – zImporter Guide` : 'zImporter Guide – Load and Control zStudio Scenes in Code'}
        description={chapter
          ? `${chapter.summary} Examples for Pixi.js, Phaser and HTML.`
          : 'Step-by-step zImporter tutorials: load a scene, use buttons, toggles, sliders and scrollbars, and move assets without breaking the responsive layout. Examples for Pixi.js, Phaser and HTML.'}
        canonical={chapter ? `${GUIDE_PATH}/${chapter.slug}` : GUIDE_PATH}
      />

      <div className="guide-layout">
        <nav className="guide-sidebar" aria-label="Guide chapters">
          <Link to={GUIDE_PATH} className={`guide-sidebar-title${chapter ? '' : ' active'}`}>zImporter Guide</Link>
          <select
            className="guide-chapter-select"
            aria-label="Choose a chapter"
            value={slug || ''}
            onChange={(e) => navigate(e.target.value ? `${GUIDE_PATH}/${e.target.value}` : GUIDE_PATH)}
          >
            <option value="">All chapters</option>
            {CHAPTERS.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
          </select>
          <ol>
            {CHAPTERS.map(c => (
              <li key={c.slug}>
                <Link to={`${GUIDE_PATH}/${c.slug}`} className={c.slug === slug ? 'active' : ''}>{c.title}</Link>
              </li>
            ))}
          </ol>
          <div className="guide-sidebar-links">
            <a href={engineInfo.docs} target="_blank" rel="noopener noreferrer">API reference</a>
            <Link to="/z-importer">Downloads and repos</Link>
          </div>
        </nav>

        <main className="guide-main">
          <EngineSwitcher engine={engine} onChange={chooseEngine} />

          {chapter ? (
            <article>
              <h1><span className="title-gradient">{chapter.title}</span></h1>
              <p className="guide-summary">{chapter.summary}</p>
              {chapter.blocks.map((block, i) => <GuideBlock key={i} block={block} engine={engine} />)}

              <div className="guide-pager">
                {prev ? <Link to={`${GUIDE_PATH}/${prev.slug}`}>← {prev.title}</Link> : <span />}
                {next ? <Link to={`${GUIDE_PATH}/${next.slug}`}>{next.title} →</Link> : <span />}
              </div>
            </article>
          ) : (
            <article>
              <h1><span className="title-gradient">zImporter Guide</span></h1>
              <p className="guide-summary">
                How to use a zStudio scene from your code, with examples you can copy for Pixi.js, Phaser and HTML. For the full list of classes and methods, see the <a href={engineInfo.docs} target="_blank" rel="noopener noreferrer">API reference</a>.
              </p>
              <div className="guide-cards">
                {CHAPTERS.map(c => (
                  <Link key={c.slug} to={`${GUIDE_PATH}/${c.slug}`} className="guide-card">
                    <h2>{c.title}</h2>
                    <p>{c.summary}</p>
                  </Link>
                ))}
              </div>
              <div className="guide-note guide-note-tip">
                <strong>Building with AI?</strong> Every importer package now includes skills, so your AI tool writes code that follows these same rules. <Link to={`${GUIDE_PATH}/ai-skills`}>See how to use them</Link>.
              </div>
            </article>
          )}
        </main>
      </div>
    </div>
  );
};

export default ZImporterGuide;
