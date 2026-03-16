import React from 'react';

const SwfImporter: React.FC = () => {
  return (
    <div>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-layout">
              {/* VIDEO */}
              <div className="hero-logo">
                <div className="hero-video-embed">
                  <iframe
                    src="https://www.youtube.com/embed/MTu5AIZwJS4"
                    title="Import Flash SWF files into zStudio"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className="hero-text">
                <h1>
                  <span className="title-gradient">Import Flash SWF Files Directly into zStudio</span>
                </h1>
                <p className="intro">
                  Have old Flash assets collecting dust? Still using Adobe Animate and worried it won't be supported much longer?
                  <br /><br />
                  zStudio solves your problem. Simply drag a <code style={{ background: 'rgba(255,255,255,0.1)', padding: '0.15em 0.4em', borderRadius: '4px', color: '#14b8a6' }}>.swf</code> file into zStudio and get a fully editable scene — ready to keep working on and export to modern web technologies like <strong style={{ color: '#14b8a6' }}>Pixi.js</strong> and <strong style={{ color: '#f59e0b' }}>Phaser</strong>.
                </p>
                <div className="hero-cta-section">
                  <div className="value-props">
                    {[
                      'Rescue and reuse your existing Flash / Adobe Animate assets',
                      'No need to rebuild scenes from scratch — drag, drop, done',
                      'Keep working on the imported scene inside zStudio',
                      'Export to Pixi.js, Phaser, or plain HTML in one click',
                      'Future-proof your Flash content before support ends',
                    ].map((text) => (
                      <div key={text} className="value-prop">
                        <span className="checkmark">✓</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          {/* HOW IT WORKS */}
          <section style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ color: '#14b8a6', fontSize: '2em', marginBottom: '2rem', textAlign: 'center' }}>How It Works</h2>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                {
                  step: '01',
                  title: 'Prepare Your SWF',
                  desc: 'Export your .fla as a .swf from Adobe Animate.',
                },
                {
                  step: '02',
                  title: 'Drag Into zStudio',
                  desc: 'Simply drag and drop the .swf file directly into the zStudio editor. The Flash importer is bundled — no extra installation needed.',
                },
                {
                  step: '03',
                  title: 'Get a Ready Scene',
                  desc: 'Your Flash content is converted into a fully editable zStudio scene, preserving positions, rotations, scales, alphas, and animation data.',
                },
                {
                  step: '04',
                  title: 'Export to Modern Web',
                  desc: 'Continue editing the scene in zStudio, then export to Pixi.js, Phaser, or plain HTML — ready for production.',
                },
              ].map(({ step, title, desc }) => (
                <div key={step} style={{
                  flex: '1',
                  minWidth: '220px',
                  maxWidth: '280px',
                  backgroundColor: '#1e293b',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  border: '1px solid rgba(20, 184, 166, 0.25)',
                  boxShadow: '0 4px 16px rgba(20, 184, 166, 0.1)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    display: 'inline-block',
                    fontSize: '2.5em',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #14b8a6, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem',
                  }}>{step}</div>
                  <h3 style={{ color: '#f1f5f9', marginBottom: '0.75rem', fontSize: '1.1em' }}>{title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.95em', lineHeight: '1.6', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* GITHUB CTA */}
          <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(245,158,11,0.1))',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              borderRadius: '12px',
              padding: '2rem 2.5rem',
              boxShadow: '0 4px 20px rgba(20,184,166,0.15)',
              maxWidth: '640px',
            }}>
              <h3 style={{ color: '#f1f5f9', fontSize: '1.4em', marginBottom: '0.75rem' }}>
                The Flash Importer is Bundled with zStudio
              </h3>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                No extra download required — just drag your <code style={{ background: '#0f172a', padding: '0.1em 0.4em', borderRadius: '4px', color: '#14b8a6' }}>.swf</code> straight into zStudio and you're good to go.
                <br /><br />
                For more information, troubleshooting, and to download the standalone exporter, visit the GitHub repository.
              </p>
              <a
                href="https://github.com/yonnyzohar/FlashToZStudio"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#14b8a6',
                  color: '#0f172a',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1em',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0f766e')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#14b8a6')}
              >
                View on GitHub
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SwfImporter;
