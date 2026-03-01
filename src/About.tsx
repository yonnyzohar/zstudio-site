import React, { useEffect, useState } from 'react';

interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
  linux: string;
}

const About: React.FC = () => {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fetch latest release data
    fetch('/latest-release.json')
      .then(res => res.json())
      .then(data => setReleaseData(data))
      .catch(err => console.error('Failed to load release info:', err));

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const imgStyle = {
    width: isMobile ? '100%' : '300px',
    maxWidth: isMobile ? '400px' : '300px',
    height: 'auto',
    borderRadius: '8px',
  };

  return (
    <div className="container">

      {/* ── HERO ── */}
      <div style={{ marginBottom: '3rem' }}>

        {/* Big statement */}
        <p style={{
          fontSize: isMobile ? '1.5rem' : '2rem',
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: '1.25rem',
          color: '#fff',
        }}>
          The world doesn't need another game engine.
        </p>

        {/* Supporting line */}
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary, #aaa)',
          maxWidth: '680px',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          There are already countless engines competing to be your "all-in-one" solution — scene editor, scripting
          environment, plugin ecosystem, asset pipeline, hosting platform, proprietary formats, and more.
        </p>

        {/* Two rhetorical questions as pull-quotes */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '1rem',
          marginBottom: '0.5rem',
        }}>
          {[
            "But what if you don't want to replace your entire pipeline?",
            'What if your team already has an established workflow that works — except for one bottleneck?',
          ].map(q => (
            <div key={q} style={{
              flex: 1,
              borderLeft: '3px solid #fbbb1a',
              paddingLeft: '1.1rem',
              color: '#e2e8f0',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}>
              {q}
            </div>
          ))}
        </div>
      </div>

      {/* ── THE REAL BOTTLENECK ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <img
          src="/assets/Lightning Fast Scene Creation.png"
          alt="Lightning Fast Scene Creation"
          style={{ ...imgStyle, order: isMobile ? 2 : 1 }}
        />
        <div style={{ flex: '1', textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>The Real Bottleneck</h2>
          <p style={{ marginBottom: '0.75rem' }}>
            For many studios, the friction isn't the engine. It's the <strong>translation of scene layout into runtime code</strong>.
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li>Designers create layouts. Developers implement them.</li>
            <li>Multi-resolution support complicates everything.</li>
            <li>Endless iteration cycles slow the team down.</li>
            <li>Developers don't enjoy building layouts.</li>
            <li>Designers don't enjoy depending on someone else to realise their vision.</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>This is where zStudio comes in.</p>
        </div>
      </div>

      {/* ── NON-INTRUSIVE BY DESIGN ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem',
        flexDirection: isMobile ? 'column' : 'row-reverse',
      }}>
        <img
          src="/assets/6_template_system.png"
          alt="Template System"
          style={{ ...imgStyle, order: isMobile ? 2 : 1 }}
        />
        <div style={{ flex: '1', textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Non-Intrusive by Design</h2>
          <p style={{ marginBottom: '0.75rem' }}>
            zStudio does not replace your engine. It does not dictate your architecture. It does not lock you into proprietary runtimes.
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            Whether you use Pixi, Phaser, plain HTML, or a custom framework — zStudio fits into your workflow.
          </p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2', marginBottom: '0.75rem' }}>
            <li>Create scenes visually.</li>
            <li>Export clean JSON.</li>
            <li>Load it at runtime using our open-source importers.</li>
          </ul>
          <p style={{ marginBottom: '0.5rem' }}>From there:</p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li>Use our runtime classes — or don't.</li>
            <li>Use our components — or your own.</li>
            <li>Instantiate full scenes — or minimal templates.</li>
            <li>Extend freely — <strong>no lock-in</strong>.</li>
          </ul>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#fbbb1a', marginBottom: '0.5rem' }}>Features</h2>
        <p style={{ color: 'var(--text-secondary, #aaa)', marginBottom: '1.5rem' }}>
          Everything you need to go from design to runtime — without changing your stack.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {[
            {
              icon: '🎨',
              title: 'Visual Scene Building',
              items: [
                'Drag & drop images, paste from clipboard',
                'Full transform controls',
                'Powerful multi-resolution layout tools',
                'Nine-slice support',
                'Copy complex hierarchies between scenes',
                'Built-in texture atlas generation on export',
                'Comprehensive template system',
                'Live scene testing',
              ],
            },
            {
              icon: '✍',
              title: 'Text Tools',
              items: [
                'Generate bitmap fonts (export to atlas + .fnt)',
                'Import existing bitmap fonts',
                'Full text editor with gradient support',
                'Glow, drop shadow, and advanced text effects',
              ],
            },
            {
              icon: '🖼',
              title: 'Photoshop Integration',
              items: ['Import scenes directly from Photoshop via plugin'],
            },
            {
              icon: '🦴',
              title: 'Spine Support',
              items: [
                'Spine atlases or individual images',
                'Attach any asset to Spine slots — including other Spine objects',
                'Auto-play animations on load',
              ],
            },
            {
              icon: '🎞',
              title: 'Animation System',
              items: [
                'Complete timeline-based animation system',
                'Old-school power with modern flexibility',
                'Cue points for triggering runtime code',
              ],
            },
            {
              icon: '✨',
              title: 'Particles',
              items: ['Full particle system support'],
            },
            {
              icon: '🧩',
              title: 'UI Components',
              items: ['Buttons', 'Toggles', 'Sliders', 'Scrollbars', 'Input fields'],
            },
            {
              icon: '🔌',
              title: 'Open Source Importers',
              items: [
                'Export once. Import anywhere.',
                'Open-source importers for Pixi, Phaser, HTML, and custom frameworks',
              ],
            },
          ].map(({ icon, title, items }) => (
            <div key={title} style={{
              background: 'var(--card-bg, #1e293b)',
              border: '1px solid var(--border, #2d3748)',
              borderRadius: '10px',
              padding: '1.25rem',
            }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.75rem', fontSize: '1rem' }}>
                <span style={{ marginRight: '0.4rem' }}>{icon}</span>{title}
              </h3>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: '1.8', fontSize: '0.9rem', color: 'var(--text-secondary, #bbb)' }}>
                {items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── BUILT FOR DESIGNERS ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <img
          src="/assets/4_transform_controls.png"
          alt="Transform Controls"
          style={{ ...imgStyle, order: isMobile ? 2 : 1 }}
        />
        <div style={{ flex: '1', textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Built for Designers. Loved by Developers.</h2>
          <p style={{ marginBottom: '1rem' }}>
            We focused obsessively on the editor experience — so designers can bring their vision to life
            independently, and developers can focus on game logic instead of layout plumbing.
          </p>
          <p style={{ marginBottom: '0.5rem' }}>Perfect for:</p>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '2' }}>
            <li><strong>Web Game Developers</strong> building with Pixi.js, Phaser, or custom 2D engines</li>
            <li><strong>Technical Artists</strong> who need precise control without boilerplate code</li>
            <li><strong>UI/UX Teams</strong> crafting dynamic, responsive interfaces</li>
            <li><strong>Ad Creators</strong> designing engaging playable ads for mobile and web</li>
            <li><strong>Studios</strong> looking to streamline workflows and reduce integration time</li>
          </ul>
        </div>
      </div>

      {/* ── PROVEN IN PRODUCTION ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem',
        flexDirection: isMobile ? 'column' : 'row-reverse',
      }}>
        <img
          src="/assets/3_Hierarchical_Composition.png"
          alt="Hierarchical Composition"
          style={{ ...imgStyle, order: isMobile ? 2 : 1 }}
        />
        <div style={{ flex: '1', textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Proven in Production</h2>
          <p style={{ marginBottom: '0.75rem' }}>
            zStudio isn't just a concept — it's a battle-tested tool actively used in commercial game studios. It has
            already powered multiple shipped titles, and continues to evolve through real-world feedback from
            professional developers and creatives.
          </p>
          <p>Built by a developer who lived these exact problems. Shaped by the studios who still face them every day.</p>
        </div>
      </div>

      {/* ── CLOSING ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem',
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        <img
          src="/assets/Screenshot 2026-01-16 at 23.17.42.png"
          alt="zStudio Interface"
          style={{ ...imgStyle, order: isMobile ? 2 : 1 }}
        />
        <div style={{ flex: '1', textAlign: isMobile ? 'center' : 'left', order: isMobile ? 1 : 2 }}>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Focus on Your Game — Not Layout Plumbing</h2>
          <p style={{ marginBottom: '0.75rem' }}>
            We're not replacing your engine. We're removing the friction between your team's vision and its
            implementation — so you can ship faster, iterate freely, and build the games you actually want to make.
          </p>
          <p>
            Join the growing community of developers and ad creators who trust zStudio to bring their work to life.
          </p>
        </div>
      </div>

      {/* FLOATING DOWNLOAD WIDGET */}
      <div style={{
        position: 'fixed',
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid rgba(20, 184, 166, 0.3)',
        boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)',
        zIndex: 1000,
        minWidth: '180px',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <h3 style={{ color: '#14b8a6', marginBottom: '1rem', textAlign: 'center', fontSize: '1.1em' }}>Download zStudio</h3>
        <a
          className="button primary compact mac"
          href={releaseData?.mac || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.9em',
            padding: '0.5rem 1rem',
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}
        >
          🍎 macOS
        </a>
        <a
          className="button primary compact windows"
          href={releaseData?.windows || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.9em',
            padding: '0.5rem 1rem',
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}
        >
          🪟 Windows
        </a>
        <a
          className="button primary compact linux"
          href={releaseData?.linux || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.9em',
            padding: '0.5rem 1rem',
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none',
            borderRadius: '6px',
            transition: 'all 0.3s ease'
          }}
        >
          🐧 Linux
        </a>
      </div>
    </div>
  );
};

export default About;