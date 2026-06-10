import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from './SEO';
import { releaseNotes } from './releaseNotesData';

const ReleaseNotePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const index = releaseNotes.findIndex(p => p.slug === slug);

  if (index === -1) return <Navigate to="/release-notes" />;

  const post = releaseNotes[index];
  const prev = index > 0 ? releaseNotes[index - 1] : null;
  const next = index < releaseNotes.length - 1 ? releaseNotes[index + 1] : null;

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <SEO
        title={`${post.title} — zStudio Release Notes`}
        description={post.body.slice(0, 155)}
        canonical={`/release-notes/${post.slug}`}
      />

      {/* Back link */}
      <Link to="/release-notes" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
        color: '#64748b', fontSize: '0.85rem', fontWeight: 600,
        textDecoration: 'none', marginBottom: '2rem',
        transition: 'color 0.2s ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#14b8a6')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
      >
        ← All release notes
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {post.date}
          </span>
          {post.tag && (
            <span style={{
              background: 'rgba(20,184,166,0.15)',
              color: '#14b8a6',
              border: '1px solid #14b8a6',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '2px 12px',
            }}>
              {post.tag}
            </span>
          )}
        </div>
        <h1 style={{ margin: 0, fontSize: '1.9rem', fontWeight: 800, color: '#e2e8f0', lineHeight: 1.25 }}>
          {post.title}
        </h1>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#1e293b', marginBottom: '1.75rem' }} />

      {/* Body */}
      <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
        {post.body}
      </p>

      {/* Highlights */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid #1e293b',
        borderRadius: '10px',
        padding: '1.25rem 1.5rem',
        marginBottom: '3rem',
      }}>
        <p style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 1rem' }}>
          Highlights
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {post.highlights.map((item) => (
            <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.93rem', lineHeight: 1.5 }}>
              <span style={{ color: '#14b8a6', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Prev / Next navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        {prev ? (
          <Link to={`/release-notes/${prev.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <div style={{
              background: '#1e293b', border: '1px solid #334155', borderRadius: '10px',
              padding: '0.9rem 1.1rem', transition: 'border-color 0.2s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#14b8a6')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}
            >
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>← Previous</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>{prev.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{prev.date}</div>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}

        {next ? (
          <Link to={`/release-notes/${next.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
            <div style={{
              background: '#1e293b', border: '1px solid #334155', borderRadius: '10px',
              padding: '0.9rem 1.1rem', textAlign: 'right', transition: 'border-color 0.2s ease',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#14b8a6')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#334155')}
            >
              <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>Next →</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: 600 }}>{next.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{next.date}</div>
            </div>
          </Link>
        ) : <div style={{ flex: 1 }} />}
      </div>
    </div>
  );
};

export default ReleaseNotePost;
