import React, { useEffect } from 'react';

declare global {
  interface Window {
    Prism: any;
  }
}

const ZImporter: React.FC = () => {
  useEffect(() => {
    // Initialize Prism.js highlighting
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);
  return (
    <div className="container">
      {/* HERO SECTION */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '1rem', textAlign: 'center', background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          zImporter
        </h1>
        <p style={{ fontSize: '1.2em', color: '#e5e7eb', marginBottom: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
          The second part of zStudio - seamlessly load your designed scenes into your Pixi.js games and interactive ads. Export from zStudio, import with zImporter, and bring your UI to life in code.
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* VIDEO SECTION */}
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h2 style={{ color: '#14b8a6', marginBottom: '1rem', textAlign: 'center' }}>Quick Start Tutorial</h2>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
              <iframe
                src="https://www.youtube.com/embed/ZINRf2fgfQs"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                allowFullScreen
                title="zImporter - Importing zStudio scenes"
              />
            </div>
          </div>
          
          {/* DOWNLOAD SECTION */}
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>Download for Pixi.js Environment</h2>
            <p style={{ color: '#e5e7eb', marginBottom: '1.5rem' }}>
              Get the zImporter package and example project to start integrating zStudio scenes into your games and ads.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://github.com/yonnyzohar/zImporter_PIXI" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: '#14b8a6', 
                  color: '#0f172a', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  textDecoration: 'none', 
                  fontWeight: '600', 
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
              >
                📦 zImporter Package
              </a>
              <a 
                href="https://github.com/yonnyzohar/zImporter_PIXI_Example" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: '#f59e0b', 
                  color: '#0f172a', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  textDecoration: 'none', 
                  fontWeight: '600', 
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d97706'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}
              >
                🚀 Example Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPORTED FILES */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>What You Get After Exporting</h2>
        <p style={{ color: '#e5e7eb', marginBottom: '1.5rem' }}>
          Once you export your scene in zStudio, you'll have these essential files ready for import:
        </p>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
          <pre style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-bash">
{`./scene/
    placements.json --> Scene positioning and hierarchy structure
    ta.json --> Texture Atlas coordinates
    ta.png --> The texture atlas image`}
            </code>
          </pre>
          <p style={{ color: '#e5e7eb', marginTop: '1rem', fontSize: '0.9em' }}>
            You can also export with individual images instead of a texture atlas.
          </p>
        </div>
      </section>

      {/* INSTALLATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>Installation</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Add to package.json</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"dependencies": {
  "zimporter-pixi": "latest"
}`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Optional Dependencies</h3>
            <p style={{ color: '#e5e7eb', marginBottom: '1rem', fontSize: '0.9em' }}>
              For advanced features like particles and spine animations:
            </p>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"peerDependencies": {
  "@pixi-spine/all-4.0": "^4.0.4",
  "@pixi-spine/base": "^4.0.5",
  "@pixi/filter-drop-shadow": "^5.2.0",
  "@pixi/particle-emitter": "^5.0.8",
  "pixi.js": "^7.4.2"
}`}
              </code>
            </pre>
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', marginTop: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Install Dependencies</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-bash">npm install</code>
          </pre>
        </div>
      </section>

      {/* INTEGRATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>zImporter Integration</h2>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Import the Classes</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { ZButton, ZContainer, ZScene, ZState, ZSceneStack } from 'zimporter-pixi';`}
            </code>
          </pre>
        </div>
      </section>

      {/* EXAMPLES */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>Code Examples</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>App Setup (app.ts)</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { Game } from "./Game";
import { ZSceneStack, ZUpdatables } from 'zimporter-pixi';

const app = new PIXI.Application({
  backgroundColor: 0x000000,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  antialias: true
});
document.body.appendChild(app.view as any);

window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  ZSceneStack.resize(window.innerWidth, window.innerHeight);
});

const game = new Game(app.stage);
ZUpdatables.init(24);

app.ticker.add(() => {
  const deltaMS = PIXI.Ticker.shared.deltaMS / 1000;
  game.update(deltaMS);
  ZUpdatables.update();
});`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Loading a Scene (Game.ts)</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { ZScene, ZSceneStack } from 'zimporter-pixi';

export class Game {
    stage: PIXI.Container;
    
    constructor(stage: PIXI.Container) {
        this.stage = stage;
        const loadPath = "./assets/testScene/";
        
        const scene = new ZScene("testScene");
        scene.load(loadPath, () => {
            ZSceneStack.push(scene);
            scene.loadStage(this.stage);
        });
    }

    update(deltaMS: number) {
        // Your game logic here
    }
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* PHASER */}
      <section>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)', textAlign: 'center' }}>
          <h2 style={{ color: '#14b8a6', marginBottom: '1rem' }}>Phaser Support</h2>
          <p style={{ color: '#e5e7eb' }}>Coming soon...</p>
        </div>
      </section>
    </div>
  );
};

export default ZImporter;