import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Prism: any;
  }
}

interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
}

const Home: React.FC = () => {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);

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
  }, []);

  return (
    <div>
      {/* Video Background */}
      <div id="video-background">
        <iframe
          src="https://www.youtube.com/embed/EypJ2ZRc4DI?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=EypJ2ZRc4DI&modestbranding=1&playsinline=1&start=70&enablejsapi=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="zStudio Background Video"
        />
      </div>

      <main>
        <div className="container">
          {/* HERO */}
          <section className="hero">
            <h1>
              Build UI & 2D Scenes for Web Games <br />
              <span>
                Visually
              </span>
            </h1>

            <p className="intro">
              zStudio is a standalone visual layout and UI authoring tool for web game developers.
              It integrates seamlessly with Pixi.js and other 2D rendering engines.
              Designed for developers, technical artists, and animators.
            </p>

            <p className="intro" style={{ marginTop: '20px', fontWeight: '600', color: '#fbbb1a' }}>
              ✔ Used commercially in multiple real-money casino games
            </p>
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