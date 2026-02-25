import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    Prism: any;
  }
}

const ZImporter: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize Prism.js highlighting
    if (window.Prism) {
      window.Prism.highlightAll();
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
    <div className="container">
      {/* HERO SECTION */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3em', marginBottom: '1rem', textAlign: 'center', background: 'linear-gradient(135deg, #14b8a6 0%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          zImporter
        </h1>
        <p style={{ fontSize: '1.2em', color: '#e5e7eb', marginBottom: '2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
          The second part of zStudio - seamlessly load your designed scenes into your Pixi.js and Phaser games and interactive ads. Export from zStudio, import with zImporter, and bring your UI to life in code.
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

      {/* PIXI SECTION */}
      <section id="pixi-section" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '2rem', textAlign: 'center', color: '#14b8a6', borderBottom: '2px solid rgba(20, 184, 166, 0.3)', paddingBottom: '1rem' }}>
          🖼️ Pixi.js Integration
        </h1>
      </section>

      {/* PIXI DOWNLOAD */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(20, 184, 166, 0.3)', boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)' }}>
          <h2 style={{ color: '#14b8a6', marginBottom: '1rem', textAlign: 'center' }}>📦 Get Started with Pixi.js</h2>
          <p style={{ color: '#e5e7eb', marginBottom: '1.5rem', textAlign: 'center' }}>
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
            <a 
              href="/docs/pixi/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#6366f1', 
                color: '#ffffff', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: '600', 
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              📚 Documentation
            </a>
          </div>
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

      {/* PHASER SECTION */}
      <section id="phaser-section" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '2rem', textAlign: 'center', color: '#f59e0b', borderBottom: '2px solid rgba(245, 158, 11, 0.3)', paddingBottom: '1rem' }}>
          ⚡ Phaser Integration
        </h1>
      </section>

      {/* PHASER BETA */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem', textAlign: 'center' }}>🚧 Phaser Support (Beta)</h2>
          <p style={{ color: '#e5e7eb', marginBottom: '1.5rem', textAlign: 'center' }}>
            zImporter now supports Phaser 3! This feature is currently in beta - please report any issues you encounter.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://github.com/yonnyzohar/zImporter_Phaser" 
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
              📦 zImporter Phaser Package
            </a>
            <a 
              href="https://github.com/yonnyzohar/zImporter_Phaser_Example" 
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
              🚀 Example Project
            </a>
            <a 
              href="/docs/phaser/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                backgroundColor: '#6366f1', 
                color: '#ffffff', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: '600', 
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              📚 Documentation
            </a>
          </div>
        </div>
      </section>

      {/* PHASER INSTALLATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Phaser Installation</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Add to package.json</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"dependencies": {
  "zimporter-phaser": "latest"
}`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Peer Dependencies</h3>
            <p style={{ color: '#e5e7eb', marginBottom: '1rem', fontSize: '0.9em' }}>
              Required Phaser 3 installation:
            </p>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"dependencies": {
  "phaser": "^3.60.0"
}`}
              </code>
            </pre>
            <p style={{ color: '#e5e7eb', marginTop: '1rem', fontSize: '0.9em' }}>
              For Spine animation support:
            </p>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"dependencies": {
  "@esotericsoftware/spine-phaser": "^4.0.0"
}`}
              </code>
            </pre>
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', marginTop: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Install Dependencies</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-bash">npm install</code>
          </pre>
        </div>
      </section>

      {/* PHASER INTEGRATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Phaser zImporter Integration</h2>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
          <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Import the Classes</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-typescript">
{`import Phaser from 'phaser';
import { ZButton, ZContainer, ZScene, ZState, ZSceneStack } from 'zimporter-phaser';`}
            </code>
          </pre>
        </div>
      </section>

      {/* PHASER EXAMPLES */}
      <section>
        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Phaser Code Examples</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Game Scene Setup</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import Phaser from 'phaser';
import { ZScene, ZSceneStack, ZUpdatables, ZTimeline } from 'zimporter-phaser';

export class GameScene extends Phaser.Scene {
    preload() {
        // Load your zStudio exported assets here
        this.load.setPath('./assets/testScene/');
        this.load.json('placements', 'placements.json');
        this.load.atlas('ta', 'ta.png', 'ta.json');
    }

    create() {
        // Initialize zImporter update system (24 FPS)
        ZUpdatables.init(24);
        
        // FPS counter (optional)
        this._frameCount = 0;
        this._lastTime = performance.now();
        this._fpsText = this.add.text(10, 10, 'FPS: --', {
            fontSize: '16px',
            fill: '#ffffff'
        }).setDepth(9999);

        const scene = new ZScene("testScene");
        scene.loadFromPhaser(this, () => {
            ZSceneStack.push(scene);
            scene.loadStage(this);
            
            // Auto-play any timelines in the scene
            let stage = scene.sceneStage;
            for (const child of stage.list) {
                if (child instanceof ZTimeline) {
                    child.play();
                }
            }
        });
    }

    update(time: number, delta: number) {
        // FPS counter
        this._frameCount++;
        const now = performance.now();
        const elapsed = now - this._lastTime;
        if (elapsed >= 1000) {
            const fps = (this._frameCount / elapsed) * 1000;
            this._fpsText.setText(\`FPS: \${fps.toFixed(1)}\`);
            this._fpsText.setDepth(9999);
            this._frameCount = 0;
            this._lastTime = now;
        }

        // Update zImporter systems
        ZUpdatables.update();
        
        // Your game logic here
    }
}`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.3)', boxShadow: '0 4px 20px rgba(245, 158, 11, 0.2)' }}>
            <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Game Configuration</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import Phaser from 'phaser';
import { GameScene } from './GameScene';
import { ZSceneStack } from 'zimporter-phaser';
//@ts-ignore
import * as spine from '@esotericsoftware/spine-phaser';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [GameScene],
    backgroundColor: '#222',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    plugins: {
        scene: [{
            key: 'SpinePlugin',
            plugin: spine.SpinePlugin,
            mapping: 'spine'
        }]
    }
};

const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
    ZSceneStack.resize(window.innerWidth, window.innerHeight);
});`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* HTML SECTION */}
      <section id="html-section" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '2rem', textAlign: 'center', color: '#a855f7', borderBottom: '2px solid rgba(168, 85, 247, 0.3)', paddingBottom: '1rem' }}>
          🌐 HTML Integration
        </h1>
      </section>

      {/* HTML BETA */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
          <h2 style={{ color: '#a855f7', marginBottom: '1rem', textAlign: 'center' }}>🚧 HTML Support (Beta)</h2>
          <p style={{ color: '#e5e7eb', marginBottom: '1.5rem', textAlign: 'center' }}>
            zImporter now supports plain HTML using standard divs! No canvas framework required. This feature is currently in beta - please report any issues you encounter.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://github.com/yonnyzohar/zImporter_html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#a855f7',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9333ea'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a855f7'}
            >
              📦 zImporter HTML Package
            </a>
            <a
              href="/docs/html/index.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              📚 Documentation
            </a>
          </div>
        </div>
      </section>

      {/* HTML INSTALLATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem' }}>HTML Installation</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Add to package.json</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-json">
{`"dependencies": {
  "zimporter-html": "latest"
}`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '300px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>No Canvas Framework Required</h3>
            <p style={{ color: '#e5e7eb', fontSize: '0.9em' }}>
              zImporter HTML works with standard browser divs and CSS — no Pixi.js or Phaser needed. Perfect for HTML banners, interactive web ads, and lightweight UI projects.
            </p>
          </div>
        </div>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', marginTop: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
          <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Install Dependencies</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-bash">npm install</code>
          </pre>
        </div>
      </section>

      {/* HTML INTEGRATION */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem' }}>HTML zImporter Integration</h2>
        <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
          <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Import the Classes</h3>
          <pre style={{ backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <code className="language-typescript">
{`import { ZButton, ZContainer, ZScene, ZState, ZSceneStack } from 'zimporter-html';`}
            </code>
          </pre>
        </div>
      </section>

      {/* HTML EXAMPLES */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem' }}>HTML Code Examples</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Loading a Scene</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import { ZScene, ZSceneStack } from 'zimporter-html';

const loadPath = './assets/testScene/';
const scene = new ZScene('testScene');

scene.load(loadPath, () => {
    ZSceneStack.push(scene);
    // Mount the scene into a DOM element
    scene.loadStage(document.getElementById('app')!);
});`}
              </code>
            </pre>
          </div>
          <div style={{ flex: '1', minWidth: '400px', backgroundColor: '#1e293b', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)' }}>
            <h3 style={{ color: '#a855f7', marginBottom: '1rem' }}>Interacting with Elements</h3>
            <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', overflow: 'auto', margin: '0', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <code className="language-typescript">
{`import { ZScene, ZSceneStack, ZButton, ZContainer } from 'zimporter-html';

const scene = new ZScene('myScene');
scene.load('./assets/myScene/', () => {
    ZSceneStack.push(scene);
    scene.loadStage(document.getElementById('app')!);

    const stage: ZContainer = scene.sceneStage;
    const myBtn: ZButton = stage.get('myBtn') as ZButton;

    myBtn.setLabel('Click Me');
    myBtn.setCallback(() => {
        console.log('Button clicked!');
    });
});`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>

    {/* MOBILE SIDEBAR TOGGLE */}
    {isMobile && (
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#14b8a6',
          color: '#0f172a',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1001,
          boxShadow: '0 4px 20px rgba(20, 184, 166, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f766e'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#14b8a6'}
        aria-label="Toggle navigation menu"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>
    )}

    {/* MOBILE OVERLAY */}
    {isMobile && isSidebarOpen && (
      <div
        onClick={() => setIsSidebarOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          transition: 'opacity 0.3s ease'
        }}
      />
    )}

    {/* SIDEBAR */}
    <div style={{
      position: 'fixed',
      top: '50%',
      right: isMobile ? (isSidebarOpen ? '2rem' : '-220px') : '2rem',
      transform: 'translateY(-50%)',
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(20, 184, 166, 0.3)',
      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)',
      zIndex: 1000,
      minWidth: '180px',
      transition: 'right 0.3s ease',
      opacity: isMobile && !isSidebarOpen ? 0 : 1,
      pointerEvents: isMobile && !isSidebarOpen ? 'none' : 'auto'
    }}>
      <h3 style={{ color: '#14b8a6', marginBottom: '1rem', textAlign: 'center', fontSize: '1.1em' }}>Quick Navigation</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a
          href="#pixi-section"
          style={{
            color: '#14b8a6',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            display: 'block',
            textAlign: 'center',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(20, 184, 166, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          🖼️ Pixi.js
        </a>
        <a
          href="#phaser-section"
          style={{
            color: '#f59e0b',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            display: 'block',
            textAlign: 'center',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ⚡ Phaser
        </a>
        <a
          href="#html-section"
          style={{
            color: '#a855f7',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            transition: 'all 0.3s ease',
            display: 'block',
            textAlign: 'center',
            fontWeight: '500'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          🌐 HTML
        </a>
      </div>
    </div>
    </>
  );
};

export default ZImporter;