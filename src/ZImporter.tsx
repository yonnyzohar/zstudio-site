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
      <h1>Loading zStudio scene in your game:</h1>

      <p>Once you export your scene in zStudio, you should have a minimum of 3 files:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-bash">
{`./scene/
    placements.json --> The file that contain all positioning and hierarchy structure of your game scene
    ta.json --> The file that contain all textures positions in the Texture Atlas
    ta.png --> the atlas itself`}
        </code>
      </pre>

      <p>You can also alternatively load in a scene with many individual images, depending on which export type you selected in zStudio...</p>

      <p>Now we can go about loading in this scene:</p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>pixi.js</h2>

      <p>Once you have exported your project, add <code style={{ backgroundColor: '#2d2d2d', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>zImporter</code> into your Pixi project's <code style={{ backgroundColor: '#2d2d2d', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>package.json</code>:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-json">
{`"dependencies": {
  "zimporter-pixi": "latest"
}`}
        </code>
      </pre>

      <p>If you intend to use Pixi Particles or Spine, be sure to add those packages as well:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-json">
{`"peerDependencies": {
  "@pixi-spine/all-4.0": "^4.0.4",
  "@pixi-spine/base": "^4.0.5",
  "@pixi-spine/loader-base": "^4.0.5",
  "@pixi-spine/loader-uni": "^4.0.5",
  "@pixi-spine/runtime-3.7": "^4.0.5",
  "@pixi-spine/runtime-3.8": "^4.0.5",
  "@pixi-spine/runtime-4.1": "^4.0.5",
  "@pixi/filter-drop-shadow": "^5.2.0",
  "@pixi/particle-emitter": "^5.0.8",
  "pixi.js": "^7.4.2"
}`}
        </code>
      </pre>

      <p>Install all dependencies:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-bash">npm i</code>
      </pre>

      <p>You can now begin to import the zImporter classes:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { ZButton, ZContainer, ZScene, ZState, ZSceneStack } from 'zimporter-pixi';`}
        </code>
      </pre>

      <p>Load up your scene like so (app.ts):</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { Game } from "./Game";
import { ZSceneStack, ZUpdatables } from 'zimporter-pixi';

// create a new pixi application
const app = new PIXI.Application({
  backgroundColor: 0x000000,
  resolution: window.devicePixelRatio || 1, // Handle high-DPI screens
  autoDensity: true, // Improve sharpness on high-DPI screens
  antialias: true // Smooth rendering
});
// Append the app's view to the DOM
document.body.appendChild(app.view as any);

//listen to resize to to let zImporter scale and reposition assets for you
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  ZSceneStack.resize(window.innerWidth, window.innerHeight);
}

//instantiate your game
const game = new Game(app.stage);

//start the update loop
ZUpdatables.init(24);

app.ticker.add(() => {
  //update you game on every tick
  const ticker = PIXI.Ticker.shared;
  const deltaMS = ticker.deltaMS / 1000;
  game.update(deltaMS);
  ZUpdatables.update();
});`}
        </code>
      </pre>

      <p>And your Game.ts, where we actually load the scene:</p>
      <pre style={{ backgroundColor: '#2d2d2d', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
        <code className="language-typescript">
{`import * as PIXI from 'pixi.js';
import { ZButton, ZContainer, ZScene, ZState, ZSceneStack } from 'zimporter-pixi';
export class Game {

    stage: PIXI.Container;
    constructor(stage: PIXI.Container) {
        this.stage = stage;
        let loadPath = "./assets/testScene/";
        console.log("Game constructor " + loadPath);
        let scene: ZScene = new ZScene("testScene");
        scene.load(loadPath, () => {
            ZSceneStack.push(scene);
            scene.loadStage(this.stage);
        });
    }

    update(deltaMS: number) {
        //game logic
    }

}`}
        </code>
      </pre>

      <p>Calling <code style={{ backgroundColor: '#2d2d2d', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>scene.loadStage(this.stage);</code> will display on stage whatever is placed on the stage in zStudio.</p>

      <p>Now package your app with something like rollup or webpack and you are good to go!</p>
      <p>See the <a href="https://github.com/yonnyzohar/zImporter_PIXI_Example" style={{ color: '#fbbb1a' }}>pixi example project</a> to get started.</p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Phaser</h2>
      <p>Coming soon...</p>
    </div>
  );
};

export default ZImporter;