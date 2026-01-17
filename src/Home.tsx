import React, { useEffect, useRef, useState } from 'react';
import { FiZap, FiMousePointer, FiLayers, FiPlay, FiSmartphone, FiLink, FiGrid, FiSettings } from 'react-icons/fi';

declare global {
  interface Window {
    Prism: any;
  }
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
        src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${startTime}&autoplay=1&controls=0&disablekb=1&enablejsapi=1&fs=0&iv_load_policy=3&loop=1&modestbranding=1&mute=1&playsinline=1&rel=0&cc_load_policy=0&autohide=1&playlist=${videoId}&hl=en&showinfo=0&theme=dark&color=white&wmode=opaque&playerapiid=ytplayer`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        playbackRate={2}
      />
    </div>
  );
}
);

interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
}

const Home: React.FC = () => {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-logo">
                <img
                  src="/assets/logo.webp"
                  alt="zStudio Logo"
                  className="logo-image"
                />
              </div>
              <div className="hero-text">
                <h1>
                  <span className="title-gradient">Create Stunning 2D Games</span><br />
                  <span className="title-accent">Visually & Instantly</span>
                </h1>

                <p className="intro">
                  The ultimate visual UI & 2D scene authoring tool for web game developers.<br /> Build professional scenes in minutes with Pixi.js integration.
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
                  </div>

                  <div className="hero-downloads">
                    <div className="download-header" style={{ textAlign: 'center' }}>
                      <a href="https://www.npmjs.com/package/zimporter-pixi" target="_blank" rel="noopener noreferrer">
                        <img
                          src="https://img.shields.io/npm/dt/zimporter-pixi?style=flat-square"
                          alt="Total downloads"
                          style={{ height: '28px' }}
                        />
                      </a>
                      <p className="latest-release">
                        Latest stable release: {releaseData ? `v${releaseData.version}` : '--'}
                      </p>
                    </div>

                    <div className="downloads-buttons">
                      <a className="button primary cta-main" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
                        🚀 Download for macOS
                      </a>
                      <a className="button primary cta-main" href={releaseData?.windows || '#'} target="_blank" rel="noopener noreferrer">
                        🚀 Download for Windows
                      </a>
                    </div>

                    <p className="urgency-text">
                      ⚡ Build games better and faster
                    </p>
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
              <h2>Turbo-charge your game creation pipeline with zStudio</h2>
              <p className="features-subtitle">Join the revolution in game development. Build faster, ship sooner, earn more.</p>
            </div>
            <div className="features-container">
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[0] = el; }} videoId="BHWw6DEsxyA" />
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
                  <YouTubeVideo ref={(el) => { videoRefs.current[1] = el; }} videoId="6Onv-P2Fjyo" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[2] = el; }} videoId="_GE3LhaHCno" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[2] = el; }}>
                  <div className="feature-number">03</div>
                  <FiLayers className="feature-icon" />
                  <h3>Rich Component Library</h3>
                  <p>Sprites, buttons, text, particles, spine animations, sliders, toggles – everything you need for interactive UI and game elements.</p>
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
                  <YouTubeVideo ref={(el) => { videoRefs.current[3] = el; }} videoId="6kYR-U61-nI" />
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
                  <h3>Seamless Pixi.js Integration</h3>
                  <p>Export scenes as JSON data and import into your Pixi.js projects with our zImporter package. Maintains all relationships and hierarchies.</p>
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
                  <p>Templates, filters, inspectors, and extensibility. Everything you need for production-ready game development.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[7] = el; }} videoId="IPQCnAhPSzA" />
                </div>
              </div>
            </div>
          </section>

          {/* SOCIAL PROOF */}
          <section className="social-proof">
            <div className="social-proof-content">
              <h2>Trusted by Artists and Developers</h2>
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
              </div>
            </div>
          </section>

          {/* CODE EXAMPLE */}
          <section className="code-example">
            <h2>Focus on game logic</h2>
            <p>Import complete scene into your project and focus only on logic.</p>
            <pre style={{
              backgroundColor: '#2d2d2d',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto',
              textAlign: 'left',
              margin: '0 auto',
              maxWidth: '600px',
              fontSize: '0.9rem'
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;