import React, { useEffect, useRef, useState } from 'react';
import { FiZap, FiMousePointer, FiLayers, FiPlay, FiSmartphone, FiLink, FiGrid, FiSettings } from 'react-icons/fi';

declare global {
  interface Window {
    Prism: any;
  }
}

interface YouTubeVideoProps {
  videoId: string;
  alt: string;
  ref?: React.Ref<HTMLDivElement>;
}

const YouTubeVideo = React.forwardRef<HTMLDivElement, YouTubeVideoProps>(
  ({ videoId, alt }, ref) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Start from middle of video (estimated 2-3 minutes, so start at 60-90 seconds)
  const startTime = Math.floor(Math.random() * 30) + 60; // Random start between 60-90 seconds

  useEffect(() => {
    // Try to set playback rate after iframe loads
    const setPlaybackRate = () => {
      if (iframeRef.current?.contentWindow) {
        // Wait a bit for the iframe to load, then try to set playback rate
        setTimeout(() => {
          try {
            iframeRef.current?.contentWindow?.postMessage(
              JSON.stringify({
                event: 'command',
                func: 'setPlaybackRate',
                args: [10]
              }),
              '*'
            );
          } catch (e) {
            console.log('Could not set playback rate');
          }
        }, 2000); // Wait 2 seconds for iframe to load
      }
    };

    setPlaybackRate();
  }, []);

  const handleMouseEnter = () => {
    // Try to play the video using postMessage
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
          }),
          '*'
        );
      } catch (e) {
        // Fallback: just change the src to autoplay
        const currentSrc = iframeRef.current.src;
        if (!currentSrc.includes('autoplay=1')) {
          iframeRef.current.src = currentSrc.replace('autoplay=0', 'autoplay=1');
        }
      }
    }
  };

  const handleMouseLeave = () => {
    // Try to pause the video using postMessage
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: []
          }),
          '*'
        );
      } catch (e) {
        // Fallback: reload iframe to pause
        const currentSrc = iframeRef.current.src;
        if (currentSrc.includes('autoplay=1')) {
          iframeRef.current.src = currentSrc.replace('autoplay=1', 'autoplay=0');
        }
      }
    }
  };

  return (
    <div
      className="video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      title={alt}
    >
      <iframe
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${startTime}&autoplay=0&controls=0&disablekb=1&enablejsapi=1&fs=0&iv_load_policy=3&loop=1&modestbranding=1&mute=1&playsinline=1&rel=0&showinfo=0&cc_load_policy=0&autohide=1&playlist=${videoId}&hl=en`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen={false}
        title={alt}
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
            <h1>
              <span className="title-gradient">Create Stunning 2D Games</span><br />
              <span className="title-accent">Visually & Instantly</span>
            </h1>

            <p className="intro">
              The ultimate visual UI & 2D scene authoring tool for web game developers.<br /> Build professional scenes in minutes with Pixi.js integration.
            </p>

            <p className="intro" style={{ marginTop: '20px', fontWeight: '600', color: '#10b981' }}>
              ✅ Used commercially in multiple real-money casino games
            </p>

            <div className="hero-cta">
              <a className="button primary" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
                Download for macOS
              </a>
              <a className="button primary" href={releaseData?.windows || '#'} target="_blank" rel="noopener noreferrer">
                Download for Windows
              </a>
            </div>
          </div>
          
        </section>

        <div className="container">

          {/* FEATURES */}
          <section className="features">
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
                  <p>Easily import images, animations, and assets with drag-and-drop. Automatic organization and wrapping for seamless hierarchy management.</p>
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

          {/* DOWNLOADS */}
          <section className="downloads">
            <a href="https://www.npmjs.com/package/zimporter-pixi" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.shields.io/npm/dt/zimporter-pixi?style=flat-square"
                alt="Total downloads"
                style={{ height: '28px' }}
              />
            </a>
            <h2>Download zStudio</h2>
            <p id="latest-release" style={{ marginBottom: '10px', marginTop: '-30px' }}>
              Latest stable release: {releaseData ? `v${releaseData.version}` : '--'}
            </p>

            <div className="buttons">
              <div className="button-row">
                <a className="button" id="dmgFile" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
                  Download for macOS
                </a>
                <a className="button" id="exeFile" href={releaseData?.windows || '#'} target="_blank" rel="noopener noreferrer">
                  Download for Windows
                </a>
              </div>

              <div className="button-row">
                <a className="button" href="https://github.com/yonnyzohar/zImporter_PIXI" target="_blank" rel="noopener noreferrer">
                  zImporter (PIXI)
                </a>
                <a className="button" href="https://github.com/yonnyzohar/zImporter_PIXI_Example" target="_blank" rel="noopener noreferrer">
                  Example Project
                </a>
              </div>

              <div className="button-row">
                <a className="button donate" href="https://buy.stripe.com/6oE7sx1d90t91BmaEE" target="_blank" rel="noopener noreferrer">
                  Donate / Pay What You Want
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;