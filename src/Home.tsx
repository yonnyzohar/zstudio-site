import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiMousePointer, FiLayers, FiPlay, FiSmartphone, FiLink, FiGrid, FiSettings, FiImage } from 'react-icons/fi';

declare global {
  interface Window {
    Prism: any;
  }
}

interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
  linux: string;
}

interface YouTubeVideoProps {
  videoId: string;
  alt?: string;
  ref?: React.Ref<HTMLDivElement>;
}

const YouTubeVideo = React.forwardRef<HTMLDivElement, YouTubeVideoProps>(
  ({ videoId, alt }, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Start from middle of video (estimated 2-3 minutes, so start at 60-90 seconds)
  const startTime = Math.floor(Math.random() * 30) + 60; // Random start between 60-90 seconds

  return (
    <div
      className="video-container"
      ref={ref}
      title={alt}
    >
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${startTime}&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen={true}
      />
    </div>
  );
}
);

const Home: React.FC = () => {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 600);
  };

  useEffect(() => {
    // Fetch latest release data
    fetch(`/latest-release.json?cacheBust=${Date.now()}`)
      .then(res => res.json())
      .then(data => setReleaseData(data))
      .catch(err => console.error('Failed to load release info:', err));

    // Initialize Prism.js highlighting
    if (window.Prism) {
      window.Prism.highlightAll();
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const target = entry.target as HTMLElement;
          
          // Only fade based on visibility
          target.style.opacity = ratio.toString();
        });
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0 to 1 in 0.05 steps
      }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-logo">
                <div className="hero-video-embed">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/jgycNrETm0w?rel=0&modestbranding=1"
                    title="zStudio Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(245, 158, 11, 0.1))',
                  border: '1px solid rgba(20, 184, 166, 0.3)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(20, 184, 166, 0.15)'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #14b8a6, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Create scenes once, export to{' '}
                    <a 
                      href="/z-importer#pixi-section"
                      style={{
                        color: '#14b8a6',
                        textDecoration: 'none',
                        fontWeight: '700',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#0f766e'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#14b8a6'}
                    >
                      Pixi.js
                    </a>
                    {', '}
                    <a 
                      href="/z-importer#phaser-section"
                      style={{
                        color: '#f59e0b',
                        textDecoration: 'none',
                        fontWeight: '700',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#d97706'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#f59e0b'}
                    >
                      Phaser
                    </a>
                    {' & '}
                    <a 
                      href="/z-importer#html-section"
                      style={{
                        color: '#a855f7',
                        textDecoration: 'none',
                        fontWeight: '700',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#9333ea'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#a855f7'}
                    >
                      HTML
                    </a>
                    !
                  </p>
                </div>
                <div className="hero-downloads">
                  <div className="download-header">
                    <div className="download-left">
                      <div className="version-display">
                        <span className="version-text">
                          v{releaseData ? releaseData.version : '--'}
                        </span>
                      </div>
                      <div className="npm-badge">
                        <a href="https://www.npmjs.com/package/zimporter-pixi" target="_blank" rel="noopener noreferrer">
                          <img
                            src="https://img.shields.io/npm/dt/zimporter-pixi?style=flat-square"
                            alt="Total downloads"
                            style={{ height: '20px' }}
                          />
                        </a>
                      </div>
                    </div>
                    <div className="download-right">
                      <div className="downloads-buttons">
                        <a className="button primary cta-main compact mac" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
                          macOS
                        </a>
                        <a className="button primary cta-main compact windows" href={releaseData?.windows || '#'} target="_blank" rel="noopener noreferrer">
                          Windows
                        </a>
                        <a className="button primary cta-main compact linux" href={releaseData?.linux || '#'} target="_blank" rel="noopener noreferrer">
                          Linux
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-text">
                <h1>
                  <span className="title-gradient">The Responsive UI & Layout Engine for Web Games</span>
                </h1>

                <p className="intro">
                  Design complex, resolution-independent UI for Pixi.js and Phaser without writing a single line of layout code
                </p>

                <div className="hero-cta-section">
                  <div className="value-props">
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Stop manually repositioning sprites for every screen size</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>No layout code — artists own the pipeline from Day 1</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Developers load a full scene in 5 lines of code</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Import Adobe Animate projects — your legacy work, modernized</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="container">

          {/* PAIN POINTS */}
          <section className="pain-points-section">
            <h2 className="pain-points-heading">Does this sound familiar?</h2>
            <div className="pain-items-grid">
              <div className="pain-item">
                <span className="pain-quote">"Tired of manually repositioning 50 sprites for Portrait vs. Landscape?"</span>
              </div>
              <div className="pain-item">
                <span className="pain-quote">"Sick of the back-and-forth ping-pong between Art and Dev just for a button change?"</span>
              </div>
              <div className="pain-item">
                <span className="pain-quote">"Need to ship playable ads to 10+ networks with a single responsive export?"</span>
              </div>
            </div>
            <p className="pain-solution">zStudio was built to solve exactly these problems.</p>
          </section>

          {/* FEATURES */}
          <section className="features">
            <div className="features-header">
              <h2>Stop Hard-Coding Layouts. Build Once, Run Everywhere.</h2>
              <p className="features-subtitle">The layout tool that lets artists own the UI pipeline and lets developers focus on game logic — not pixel math.</p>
            </div>
            <div className="features-container">
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[0] = el; }} videoId="EypJ2ZRc4DI" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[0] = el; }}>
                  <div className="feature-number">01</div>
                  <FiSmartphone className="feature-icon" />
                  <h3>Responsive Layout Without a Single Line of Code</h3>
                  <p>Anchor system for relative positioning that adapts to any screen size. Design once — portrait, landscape, desktop, and every ad network dimension handled automatically.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[1] = el; }}>
                  <div className="feature-number">02</div>
                  <FiLink className="feature-icon" />
                  <h3>Seamless Pixi.js, Phaser & HTML Integration</h3>
                  <p>Export your scene as JSON. Load it in your project with 5 lines of code via our zImporter package. All positions, anchors, animations, and hierarchies preserved — pixel-perfect, every time.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[1] = el; }} videoId="ZINRf2fgfQs" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[2] = el; }} videoId="dkFNVOs7hSI" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[2] = el; }}>
                  <div className="feature-number">03</div>
                  <FiPlay className="feature-icon" />
                  <h3>Visual Animation Timeline</h3>
                  <p>Keyframe-based timeline with easing functions, cue points, and playback controls — the same visual workflow you remember from Flash, rebuilt for modern web exports.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[3] = el; }}>
                  <div className="feature-number">04</div>
                  <FiLayers className="feature-icon" />
                  <h3>Rich Component Library</h3>
                  <p>Sprites, buttons, text, bitmap fonts, particles, Spine animations, sliders, and toggles — everything you need for interactive game UI and playable ad components.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[3] = el; }} videoId="URx6OGJs5dQ" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[4] = el; }} videoId="er8oFDWHdeo" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[4] = el; }}>
                  <div className="feature-number">05</div>
                  <FiZap className="feature-icon" />
                  <h3>Lightning Fast Scene Creation</h3>
                  <p>Build complex 2D scenes visually for multiple resolutions, aspect ratios, and devices — in minutes, not hours.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[5] = el; }}>
                  <div className="feature-number">06</div>
                  <FiMousePointer className="feature-icon" />
                  <h3>Drag-and-Drop Asset Management</h3>
                  <p>Import images, sprite sheets, Spine animations, and bitmap fonts with drag-and-drop. Organise assets into a clean hierarchy without touching a config file.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[5] = el; }} videoId="Q4AYpWcXzC8" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[6] = el; }} videoId="qsiRDy4g-MU" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[6] = el; }}>
                  <div className="feature-number">07</div>
                  <FiGrid className="feature-icon" />
                  <h3>Intuitive Professional Interface</h3>
                  <p>Draggable panels, context menus, hotkeys, undo/redo, and live test mode. Designed for artists who move fast and need full creative control.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[7] = el; }}>
                  <div className="feature-number">08</div>
                  <FiSettings className="feature-icon" />
                  <h3>Production-Ready Workflow Features</h3>
                  <p>Templates, filters, inspectors, and extensibility. Everything needed to go from first sketch to shipped game or ad — without involving a developer for layout tweaks.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[7] = el; }} videoId="IPQCnAhPSzA" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[8] = el; }} videoId="liejf2lnoGM" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[8] = el; }}>
                  <div className="feature-number">09</div>
                  <FiImage className="feature-icon" />
                  <h3>Generate Placeholders Instantly</h3>
                  <p>Keep designing when the final art isn't ready yet. Generate AI placeholder images directly inside the scene editor — so layout work never blocks on an asset request.</p>
                </div>
              </div>
            </div>
          </section>

          {/* POST-FLASH */}
          <section className="post-flash-section">
            <div className="post-flash-content">
              <h2 className="post-flash-heading">The Workflow You Missed, Rebuilt for the Modern Web</h2>
              <p className="post-flash-lead">
                If you built in Flash, you know what a visual, instant-preview workflow feels like. That productivity never died — it just got orphaned.
              </p>
              <p className="post-flash-body">
                zStudio combines the drag-and-drop power of Flash's authoring tool with modern JSON-based exports that drop straight into Pixi.js and Phaser. Your Art Director stays in a visual editor. Your developer loads the scene in 5 lines of code. No Figma handoff. No hard-coded coordinates. No layout ping-pong.
              </p>
              <div className="post-flash-pillars">
                <div className="post-flash-pillar">
                  <span className="pillar-check">✓</span>
                  <span>Visual keyframe timeline — animate without touching code</span>
                </div>
                <div className="post-flash-pillar">
                  <span className="pillar-check">✓</span>
                  <span>One-click JSON export — the scene loads in 5 lines</span>
                </div>
                <div className="post-flash-pillar">
                  <span className="pillar-check">✓</span>
                  <span>Import Adobe Animate projects — your legacy work, modernized</span>
                </div>
              </div>
            </div>
          </section>

          {/* WORKFLOW */}
          <section className="workflow">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#14b8a6', fontSize: '2.5em', fontWeight: '700', background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Stop the Layout Ping-Pong</h2>
            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
              <div className="workflow-row" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1.5rem' : '2rem', alignItems: 'stretch', maxWidth: isMobile ? '100%' : '934px', margin: '0 auto', backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)', border: '1px solid rgba(20, 184, 166, 0.3)', padding: isMobile ? '1.5rem' : '2rem' }}>
              <div className="workflow-item" style={{ flex: '1', maxWidth: isMobile ? '100%' : '400px', padding: isMobile ? '0 1rem' : '0 2rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: '#14b8a6', fontSize: '1.5em' }}>Designer</h3>
                <p style={{ marginBottom: '1.5rem', color: '#e5e7eb' }}>Owns the full visual layout — without writing a line of code</p>
                <img src="/assets/Screenshot 2026-01-16 at 23.19.46.png" alt="Designer" style={{ maxWidth: '100%', maxHeight: '350px', height: 'auto', borderRadius: '8px', objectFit: 'contain' }} />
              </div>
              <div className="workflow-item" style={{ flex: '1', maxWidth: isMobile ? '100%' : '400px', padding: isMobile ? '0 1rem' : '0 2rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: '#14b8a6', fontSize: '1.5em' }}>Developer</h3>
                <p style={{ marginBottom: '1.5rem', color: '#e5e7eb' }}>Loads the entire scene in 5 lines — and ships the game</p>
                <pre style={{
                  backgroundColor: '#0f172a',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  overflow: 'auto',
                  textAlign: 'left',
                  margin: '0',
                  fontSize: '0.9rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <code className="language-typescript">
{`let scene: ZScene = new ZScene("myScene");
scene.load(loadPath, () => {
    ZSceneStack.push(scene);
    scene.loadStage(this.stage);

    let sceneStage: ZContainer = scene.sceneStage;
    let myBTN: ZButton = sceneStage.get("myBTN") as ZButton;

    myBTN.setLabel("Click Me");
    myBTN.setCallback(() => {
        console.log("Button clicked!");
    });
});`}
                  </code>
                </pre>
              </div>
            </div>
            </div>
          </section>

          {/* IMPORT SECTION */}
          <section style={{ textAlign: 'center', margin: '3rem 0', padding: '2rem' }}>
            <h2 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '2em' }}>Import Scene into Your Project</h2>
            <p style={{ color: '#e5e7eb', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Ready to bring your zStudio designs into your game or ad project? Download zImporter to seamlessly load your scenes into Pixi.js, Phaser, and plain HTML projects.
            </p>
            <Link 
              to="/z-importer"
              style={{ 
                backgroundColor: '#14b8a6', 
                color: '#0f172a', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '1.1em',
                display: 'inline-block',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
            >
              Download zImporter
            </Link>
          </section>

          {/* SOCIAL PROOF */}
          <section className="social-proof">
            <div className="social-proof-content">
              <h2>Trusted by iGaming & Ad Teams Worldwide</h2>
              <div className="testimonials">
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"As an artist, I no longer need a developer to create responsive scenes. zStudio gives me full ownership of my creative vision!"</p>
                  <cite>- Lead Artist, iGaming Studio</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"Now I can focus purely on attaching logic since the scene has been perfectly made for me. Game development just got easier!"</p>
                  <cite>- Senior Game Developer (Phaser)</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"Skinning games has become much easier and more powerful with zStudio. It's a total game-changer!"</p>
                  <cite>- Tech Artist, Ad Creative Studio</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"zStudio makes creating engaging playable ads a breeze. I can design interactive experiences that captivate users before they even download the app!"</p>
                  <cite>- Playable Ad Developer, Mobile Gaming</cite>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;