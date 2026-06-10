import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { releaseNotes } from './releaseNotesData';

const ReleaseNotes: React.FC = () => {
  const posts = [...releaseNotes].reverse();

  return (
    <div className="container">
      <SEO
        title="Release Notes — zStudio"
        description="Follow the development history of zStudio — from the first commits to the latest release. New posts with every update."
        canonical="/release-notes"
      />

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
          Release Notes
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: 600 }}>
          A full history of zStudio — from the first lines of code to today.
          {' '}{posts.length} posts covering{' '}
          {posts[posts.length - 1].date} through {posts[0].date}.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/release-notes/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              border: '1px solid #334155',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#14b8a6';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(20,184,166,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#334155';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {post.date}
                </span>
                {post.tag && (
                  <span style={{
                    background: 'rgba(20,184,166,0.15)',
                    color: '#14b8a6',
                    border: '1px solid #14b8a6',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '1px 10px',
                  }}>
                    {post.tag}
                  </span>
                )}
              </div>
              <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>
                {post.title}
              </h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6,
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}>
                {post.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReleaseNotes;
