import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiMousePointer, FiLayers, FiPlay, FiSmartphone, FiLink, FiGrid, FiSettings } from 'react-icons/fi';

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
    fetch('/latest-release.json')
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
                        <a className="button primary cta-main compact" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
                          macOS
                        </a>
                        <a className="button primary cta-main compact" href={releaseData?.windows || '#'} target="_blank" rel="noopener noreferrer">
                          Windows
                        </a>
                        <a className="button primary cta-main compact" href={releaseData?.linux || '#'} target="_blank" rel="noopener noreferrer">
                          Linux
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-text">
                <h1>
                  <span className="title-gradient">Create Stunning 2D Interactive Experiences Visually & Instantly
                  </span>
                </h1>

                <p className="intro">
                  zStudio is the ultimate visual UI & 2D scene authoring tool for web game developers and ad creators.<br /> Build professional scenes in minutes with Pixi.js, Phaser, and plain HTML integration.
                </p>

                <div className="hero-cta-section">
                  <div className="value-props">
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Empower artists to build responsive scenes and own their creative vision</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>No coding required</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Frees developers to focus on what they do best</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="container">

          {/* FEATURES */}
          <section className="features">
            <div className="features-header">
              <h2>Turbo-charge your game and ad creation pipeline with zStudio</h2>
              <p className="features-subtitle">Join the revolution in interactive content creation. Build faster, ship sooner, earn more.</p>
            </div>
            <div className="features-container">
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[0] = el; }} videoId="er8oFDWHdeo" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[0] = el; }}>
                  <div className="feature-number">01</div>
                  <FiZap className="feature-icon" />
                  <h3>Lightning Fast Scene Creation</h3>
                  <p>Build complex 2D scenes visually for multiple resolutions, aspect ratios, and devices.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[1] = el; }}>
                  <div className="feature-number">02</div>
                  <FiMousePointer className="feature-icon" />
                  <h3>Drag-and-Drop Asset Management</h3>
                  <p>Easily import images, animations, and assets with drag-and-drop.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[1] = el; }} videoId="Q4AYpWcXzC8" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[2] = el; }} videoId="URx6OGJs5dQ" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[2] = el; }}>
                  <div className="feature-number">03</div>
                  <FiLayers className="feature-icon" />
                  <h3>Rich Component Library</h3>
                  <p>Sprites, buttons, text, bitmap fonts, particles, spine animations, sliders, toggles – everything you need for interactive UI, game elements, and ad components.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[3] = el; }}>
                  <div className="feature-number">04</div>
                  <FiPlay className="feature-icon" />
                  <h3>Powerful Animation System</h3>
                  <p>Keyframe-based timeline with easing functions, cue points, and playback controls. Create smooth, professional animations effortlessly.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[3] = el; }} videoId="dkFNVOs7hSI" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[4] = el; }} videoId="EypJ2ZRc4DI" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[4] = el; }}>
                  <div className="feature-number">05</div>
                  <FiSmartphone className="feature-icon" />
                  <h3>Responsive Design Tools</h3>
                  <p>Anchor system for relative positioning that adapts to different screen sizes. Perfect layouts that work everywhere.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[5] = el; }}>
                  <div className="feature-number">06</div>
                  <FiLink className="feature-icon" />
                  <h3>Seamless Pixi.js, Phaser & HTML Integration</h3>
                  <p>Export scenes as JSON data and import into your Pixi.js, Phaser, or plain HTML projects with our zImporter package. Maintains all relationships and hierarchies.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[5] = el; }} videoId="ZINRf2fgfQs" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[6] = el; }} videoId="qsiRDy4g-MU" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[6] = el; }}>
                  <div className="feature-number">07</div>
                  <FiGrid className="feature-icon" />
                  <h3>Intuitive User Interface</h3>
                  <p>Draggable panels, context menus, hotkeys, undo, and test mode. Designed for efficiency and ease of use.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[7] = el; }}>
                  <div className="feature-number">08</div>
                  <FiSettings className="feature-icon" />
                  <h3>Professional Workflow Features</h3>
                  <p>Templates, filters, inspectors, and extensibility. Everything you need for production-ready game and ad development.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[7] = el; }} videoId="IPQCnAhPSzA" />
                </div>
              </div>
            </div>
          </section>

          {/* WORKFLOW */}
          <section className="workflow">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#14b8a6', fontSize: '2.5em', fontWeight: '700', background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Creative Workflow</h2>
            <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
              <div className="workflow-row" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '1.5rem' : '2rem', alignItems: 'stretch', maxWidth: isMobile ? '100%' : '934px', margin: '0 auto', backgroundColor: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)', border: '1px solid rgba(20, 184, 166, 0.3)', padding: isMobile ? '1.5rem' : '2rem' }}>
              <div className="workflow-item" style={{ flex: '1', maxWidth: isMobile ? '100%' : '400px', padding: isMobile ? '0 1rem' : '0 2rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: '#14b8a6', fontSize: '1.5em' }}>Designer</h3>
                <p style={{ marginBottom: '1.5rem', color: '#e5e7eb' }}>Focuses on his creative vision</p>
                <img src="/assets/Screenshot 2026-01-16 at 23.19.46.png" alt="Designer" style={{ maxWidth: '100%', maxHeight: '350px', height: 'auto', borderRadius: '8px', objectFit: 'contain' }} />
              </div>
              <div className="workflow-item" style={{ flex: '1', maxWidth: isMobile ? '100%' : '400px', padding: isMobile ? '0 1rem' : '0 2rem', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '1rem', color: '#14b8a6', fontSize: '1.5em' }}>Developer</h3>
                <p style={{ marginBottom: '1.5rem', color: '#e5e7eb' }}>focuses on game logic.</p>
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
              <h2>Trusted by Artists, Developers, and Ad Creators</h2>
              <div className="testimonials">
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"As an artist, I no longer need a developer to create responsive scenes. zStudio gives me full ownership of my creative vision!"</p>
                  <cite>- Game Artist</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"Now I can focus purely on attaching logic since the scene has been perfectly made for me. Game development just got easier!"</p>
                  <cite>- Game Developer</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"Skinning games has become much easier and more powerful with zStudio. It's a total game-changer!"</p>
                  <cite>- Tech Artist</cite>
                </div>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>
                  <p>"zStudio makes creating engaging playable ads a breeze. I can design interactive experiences that captivate users before they even download the app!"</p>
                  <cite>- Ad Creative</cite>
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