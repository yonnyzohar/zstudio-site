import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { FiMousePointer, FiLayers, FiPlay, FiSmartphone, FiLink, FiImage, FiCpu, FiBookOpen } from 'react-icons/fi';

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
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    };
  }, []);

  return (
    <div>
      <SEO
        title="zStudio – AI-Ready Scene Editor for Pixi.js & Phaser Games"
        description="zStudio is a visual scene editor for web games that your AI can drive. Connect Claude Code, Cursor or any MCP client to build responsive scenes, generate art with local models, and export to Pixi.js, Phaser or HTML. Free to download."
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'zStudio',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          url: 'https://zstudiosltd.com',
          description: 'A visual scene editor for web games with a built-in MCP server, local AI image models and custom AI skills. Build scenes by hand or with your AI, then export them to Pixi.js, Phaser, or plain HTML.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          publisher: {
            '@type': 'Organization',
            name: 'zStudios Ltd',
            url: 'https://zstudiosltd.com',
          },
        }}
      />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-layout">
              <div className="hero-logo">
                <div className="hero-video-embed">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/Td-eqcHaIt4?rel=0&modestbranding=1"
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
                  <span className="title-gradient">The Game Scene Editor Your AI Can Drive</span>
                </h1>

                <p className="intro">
                  Build responsive scenes for Pixi.js, Phaser and HTML by hand, or hand the job to Claude Code, Cursor or any MCP client. Your AI lays out portrait and landscape, generates the art, builds the buttons and animates the timeline. You review it visually and ship.
                </p>

                <Link to="/ai" className="ai-badges">
                  <span className="ai-badge">Built-in MCP server</span>
                  <span className="ai-badge">Local AI image models</span>
                  <span className="ai-badge">Custom skills</span>
                </Link>

                <div className="hero-cta-section">
                  <div className="value-props">
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Your AI builds full scenes through the built-in MCP server</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Generate and reskin art with local models: no credits, no uploads</span>
                    </div>
                    <div className="value-prop">
                      <span className="checkmark">✓</span>
                      <span>Review and fine-tune in the editor, then load it in a few lines of code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <div className="container">

          {/* AI WORKFLOW */}
          <section className="ai-ready-section" id="ai-ready">
            <h2 className="ai-ready-heading">From Prompt to Playable Scene</h2>
            <p className="ai-ready-lead">
              zStudio has an MCP server built in. MCP is the open standard that lets AI assistants operate apps, so the AI tool you already use can drive zStudio directly, on your own subscription.
            </p>
            <div className="ai-prompt">
              <span className="ai-prompt-label">You ask</span>
              <p>"Build a Halloween version of our slot machine, portrait and landscape, using our slot skill."</p>
            </div>
            <div className="ai-flow">
              <div className="ai-flow-step">
                <span className="ai-flow-number">1</span>
                <h3>Loads your skills</h3>
                <p>Your AI reads how your studio builds a slot machine: hierarchy, naming, components.</p>
              </div>
              <div className="ai-flow-step">
                <span className="ai-flow-number">2</span>
                <h3>Generates the art</h3>
                <p>New symbols and backgrounds come from image models running on your own machine.</p>
              </div>
              <div className="ai-flow-step">
                <span className="ai-flow-number">3</span>
                <h3>Builds the scene</h3>
                <p>It imports assets, anchors portrait and landscape, builds buttons and animates the timeline.</p>
              </div>
              <div className="ai-flow-step">
                <span className="ai-flow-number">4</span>
                <h3>You review and export</h3>
                <p>Open the result in the editor, tweak anything by hand, and export to Pixi.js, Phaser or HTML.</p>
              </div>
            </div>
            <div className="ai-ready-grid">
              <div className="ai-ready-card">
                <FiCpu className="ai-ready-icon" />
                <h3>MCP Server Built In</h3>
                <p>Connect Claude Code, Cursor, Antigravity, VS Code, Windsurf, Gemini CLI or any other MCP client. Through MCP your AI can do almost anything you can do in the editor. You use your own AI subscription, not zStudio credits.</p>
              </div>
              <div className="ai-ready-card">
                <FiImage className="ai-ready-icon" />
                <h3>Local AI Image Models</h3>
                <p>Add Stable Diffusion, FLUX, Z-Image or Qwen-Image models and generate or reskin art right in the scene. Everything runs on your own computer, so there are no credits and nothing is uploaded.</p>
              </div>
              <div className="ai-ready-card">
                <FiBookOpen className="ai-ready-icon" />
                <h3>Skills: Your Studio's Playbook</h3>
                <p>Skills are short Markdown files that describe how your studio builds a slot machine, a popup or a menu. Your AI loads the ones it needs and builds the scene your way. It can even write them for you from your existing scenes.</p>
              </div>
            </div>
            <p className="ai-ready-note">
              All three are free on every plan, Community included. Paid plans also get a built-in AI Chat inside zStudio.{' '}
              <Link to="/ai">See how it works</Link>
            </p>
          </section>

          {/* WHY A VISUAL EDITOR */}
          <section className="team-section">
            <h2 className="team-heading">AI Does the Bulk. You Sign Off.</h2>
            <p className="team-lead">
              AI-written layout code is hard to review. A zStudio scene isn't: anyone on the team can open what the AI built, see it on every screen size and fix it by hand. The developer still gets a clean scene that loads in a few lines.
            </p>
            <div className="team-grid">
              <div className="team-card">
                <h3>AI</h3>
                <p>Builds and reskins scenes from a prompt</p>
                <pre className="team-prompt">
                  <code>
{`> Reskin the main menu for our
  winter event. Keep the layout,
  regenerate the buttons and
  background, add a snow loop
  on the timeline.`}
                  </code>
                </pre>
              </div>
              <div className="team-card">
                <h3>Designer</h3>
                <p>Reviews and fine-tunes visually, no code</p>
                <img src="/assets/Screenshot 2026-01-16 at 23.19.46.png" alt="A scene open in the zStudio editor" />
              </div>
              <div className="team-card">
                <h3>Developer</h3>
                <p>Loads the scene in a few lines and ships</p>
                <pre className="team-code">
                  <code className="language-typescript">
{`let scene = new ZScene("myScene");
scene.load(loadPath, () => {
  ZSceneStack.push(scene);
  scene.loadStage(this.stage);

  let btn = scene.sceneStage
    .get("myBTN") as ZButton;
  btn.setCallback(() => play());
});`}
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="features">
            <div className="features-header">
              <h2>Everything You Can Do, Your AI Can Do Too</h2>
              <p className="features-subtitle">A full visual editor for game scenes. Almost every tool below is also available to your AI over MCP.</p>
            </div>
            <div className="features-container">
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[0] = el; }} videoId="EypJ2ZRc4DI" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[0] = el; }}>
                  <div className="feature-number">01</div>
                  <FiSmartphone className="feature-icon" />
                  <h3>Responsive Layout Without Layout Code</h3>
                  <p>An anchor system for relative positioning that adapts to any screen size. Portrait, landscape, desktop and every ad network size, set once by you or by your AI.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[1] = el; }}>
                  <div className="feature-number">02</div>
                  <FiImage className="feature-icon" />
                  <h3>AI Art, Right in the Scene</h3>
                  <p>Text to image, image to image, and reskin in place. Use local models for free, or cloud models when you need transparent backgrounds. Final art or placeholders, your layout work never waits on an asset request.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[1] = el; }} videoId="liejf2lnoGM" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[2] = el; }} videoId="ZINRf2fgfQs" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[2] = el; }}>
                  <div className="feature-number">03</div>
                  <FiLink className="feature-icon" />
                  <h3>Pixi.js, Phaser & HTML Export</h3>
                  <p>Export your scene as JSON and load it with our open-source zImporter in a few lines of code. Positions, anchors, animations and hierarchies are all preserved. No engine lock-in.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[3] = el; }}>
                  <div className="feature-number">04</div>
                  <FiPlay className="feature-icon" />
                  <h3>Visual Animation Timeline</h3>
                  <p>Keyframes, easing, cue points and playback controls: the visual workflow you remember from Flash, rebuilt for modern web exports.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[3] = el; }} videoId="dkFNVOs7hSI" />
                </div>
              </div>
              <div className="feature-row">
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[4] = el; }} videoId="URx6OGJs5dQ" />
                </div>
                <div className="feature-item" ref={(el) => { featureRefs.current[4] = el; }}>
                  <div className="feature-number">05</div>
                  <FiLayers className="feature-icon" />
                  <h3>Rich Component Library</h3>
                  <p>Sprites, buttons, text, bitmap fonts, particles, Spine animations, sliders and toggles: everything you need for interactive game UI and playable ads.</p>
                </div>
              </div>
              <div className="feature-row">
                <div className="feature-item" ref={(el) => { featureRefs.current[5] = el; }}>
                  <div className="feature-number">06</div>
                  <FiMousePointer className="feature-icon" />
                  <h3>Drag-and-Drop Asset Management</h3>
                  <p>Drag in images, sprite sheets, Spine animations and bitmap fonts, or import straight from Photoshop. Organise everything into a clean hierarchy without touching a config file.</p>
                </div>
                <div className="image-container">
                  <YouTubeVideo ref={(el) => { videoRefs.current[5] = el; }} videoId="Q4AYpWcXzC8" />
                </div>
              </div>
            </div>
          </section>

          {/* FLASH STRIP */}
          <section className="flash-strip">
            <p>
              <strong>Coming from Flash or Adobe Animate?</strong> Drag a <code>.swf</code> into zStudio and keep working on it as an editable scene.{' '}
              <Link to="/swf-importer">SWF importer</Link>
            </p>
          </section>

          {/* IMPORT SECTION */}
          <section style={{ textAlign: 'center', margin: '3rem 0', padding: '2rem' }}>
            <h2 style={{ color: '#14b8a6', marginBottom: '1rem', fontSize: '2em' }}>Drop the Scene Into Your Game</h2>
            <p style={{ color: '#e5e7eb', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Whether you built it or your AI did, the open-source zImporter loads the scene into Pixi.js, Phaser or plain HTML in a few lines of code.
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
              Get zImporter
            </Link>
          </section>

          {/* SOCIAL PROOF */}
          <section className="social-proof">
            <div className="social-proof-content">
              <h2>What Our Users Say</h2>
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