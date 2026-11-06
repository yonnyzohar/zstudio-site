export type Engine = 'pixi7' | 'pixi8' | 'phaser' | 'html';

export const ENGINES: { id: Engine; label: string; pkg: string; docs: string }[] = [
  { id: 'pixi7', label: 'Pixi.js 7', pkg: 'zimporter-pixi', docs: '/docs/pixi/index.html' },
  { id: 'pixi8', label: 'Pixi.js 8', pkg: 'zimporter-pixi8', docs: '/docs/pixi/index.html' },
  { id: 'phaser', label: 'Phaser', pkg: 'zimporter-phaser', docs: '/docs/phaser/index.html' },
  { id: 'html', label: 'HTML', pkg: 'zimporter-html', docs: '/docs/html/index.html' },
];

/** A code sample. `pixi` covers both Pixi versions, `all` covers every engine. */
export type CodeMap = Partial<Record<Engine | 'pixi' | 'all', string>>;

type Only = { only?: Engine[] };

export type Block =
  | ({ t: 'h'; text: string } & Only)
  | ({ t: 'p'; text: string } & Only)
  | ({ t: 'code'; code: CodeMap; lang?: string } & Only)
  | ({ t: 'tree'; text: string } & Only)
  | ({ t: 'note'; kind: 'tip' | 'warn'; text: string } & Only)
  | ({ t: 'ul'; items: string[] } & Only)
  | ({ t: 'table'; head: string[]; rows: string[][] } & Only);

export interface Chapter {
  slug: string;
  title: string;
  summary: string;
  blocks: Block[];
}

const PIXI: Engine[] = ['pixi7', 'pixi8'];

export const CHAPTERS: Chapter[] = [
  {
    slug: 'getting-started',
    title: 'Install and set up',
    summary: 'Install the importer for your engine and get your first zStudio scene on screen.',
    blocks: [
      { t: 'p', text: "zImporter is the small runtime library that loads scenes exported from zStudio. Your designer (or your AI) builds the scene, you export it, and these few lines put it in your game. Pick your engine above: every code sample in this guide follows your choice." },
      { t: 'h', text: 'Install' },
      {
        t: 'code', lang: 'bash', code: {
          pixi7: 'npm i zimporter-pixi',
          pixi8: 'npm i zimporter-pixi8',
          phaser: 'npm i zimporter-phaser',
          html: 'npm i zimporter-html',
        },
      },
      { t: 'p', only: ['pixi7', 'pixi8', 'phaser'], text: 'Your `tsconfig.json` needs `"module": "ESNext"` and `"moduleResolution": "bundler"`.' },
      { t: 'h', text: 'Add your exported scene' },
      { t: 'p', text: 'Export from zStudio and copy the exported folder somewhere your game can serve it, such as `public/assets/mainMenu/`. The folder holds a `placements.json` file and your images.' },
      { t: 'h', text: 'Minimal project' },
      {
        t: 'code', code: {
          pixi7: `import * as PIXI from 'pixi.js';
import { ZScene, ZSceneStack, ZUpdatables } from 'zimporter-pixi';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x222222,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});
document.body.appendChild(app.view as HTMLCanvasElement);

// Drives timelines. Without this, animations stay frozen.
ZUpdatables.init(24);
app.ticker.add(() => ZUpdatables.update());

// Keeps the layout responsive.
window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  ZSceneStack.resize(window.innerWidth, window.innerHeight);
});

const scene = new ZScene('mainMenu');
scene.load('./assets/mainMenu/', () => {
  ZSceneStack.push(scene);
  scene.loadStage(app.stage);
  // The scene is on screen. Wire it up here.
});`,
          pixi8: `import { Application } from 'pixi.js';
import { ZScene, ZSceneStack, ZUpdatables } from 'zimporter-pixi8';

const app = new Application();
await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x222222,
  resizeTo: window,
});
document.body.appendChild(app.canvas);

// Drives timelines. Without this, animations stay frozen.
ZUpdatables.init(24);
app.ticker.add(() => ZUpdatables.update());

// Keeps the layout responsive.
window.addEventListener('resize', () => {
  ZSceneStack.resize(window.innerWidth, window.innerHeight);
});

const scene = new ZScene('mainMenu');
scene.load('./assets/mainMenu/', () => {
  ZSceneStack.push(scene);
  scene.loadStage(app.stage);
  // The scene is on screen. Wire it up here.
});`,
          phaser: `import Phaser from 'phaser';
import { ZScene, ZSceneStack, ZUpdatables } from 'zimporter-phaser';

class GameScene extends Phaser.Scene {
  create() {
    ZUpdatables.init(24);

    // Keeps the layout responsive.
    this.scale.on('resize', (size: Phaser.Structs.Size) => {
      ZSceneStack.resize(size.width, size.height);
    });

    const scene = new ZScene('mainMenu', this);
    scene.load('./assets/mainMenu/', () => {
      ZSceneStack.push(scene);
      scene.loadStage(this);
      // The scene is on screen. Wire it up here.
    });
  }

  update() {
    // Drives timelines. Without this, animations stay frozen.
    ZUpdatables.update();
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  scene: [GameScene],
  scale: { mode: Phaser.Scale.RESIZE },
});`,
          html: `import { ZScene, ZSceneStack, ZUpdatables } from 'zimporter-html';

// Starts its own animation loop for timelines. There's nothing else to call.
ZUpdatables.init(24);

// Keeps the layout responsive.
window.addEventListener('resize', () => {
  ZSceneStack.resize(window.innerWidth, window.innerHeight);
});

const scene = new ZScene('mainMenu');
scene.load('./assets/mainMenu/', () => {
  ZSceneStack.push(scene);
  scene.loadStage(document.getElementById('app')!);
  // The scene is on screen. Wire it up here.
});`,
        },
      },
      { t: 'p', only: ['phaser'], text: 'If your scenes use Spine, also register the plugin in your game config: `plugins: { scene: [{ key: \'SpinePlugin\', plugin: SpinePlugin, mapping: \'spine\' }] }`. `SpinePlugin` is exported by `zimporter-phaser`.' },
      { t: 'p', only: ['html'], text: 'The HTML importer builds the scene from regular `<div>` elements with no canvas and no game engine. Spine and particles are not supported here. Give your host element a size in CSS (for example `width: 100%; height: 100%`).' },
      { t: 'p', text: 'The number passed to `ZUpdatables.init()` is the frame rate timelines play at. Set it to the frame rate your animations were made for.' },
    ],
  },
  {
    slug: 'load-a-scene',
    title: 'Load a scene and find things',
    summary: 'Show loading progress, then get a reference to any element by its instance name.',
    blocks: [
      { t: 'h', text: 'Loading' },
      { t: 'p', text: '`scene.load()` fetches the JSON and images and calls you back when they are ready. `scene.loadStage()` then builds everything and adds it to the screen. Keep the trailing slash on the path.' },
      {
        t: 'code', code: {
          pixi: `const scene = new ZScene('mainMenu');

scene.load(
  './assets/mainMenu/',
  () => {
    ZSceneStack.push(scene);
    scene.loadStage(app.stage);
  },
  (progress) => {
    loadingBar.width = progress * 400; // progress goes from 0 to 1
  },
);`,
          phaser: `const scene = new ZScene('mainMenu', this);

scene.load(
  './assets/mainMenu/',
  () => {
    ZSceneStack.push(scene);
    scene.loadStage(this);
  },
  (progress: number) => {
    loadingBar.width = progress * 400; // progress goes from 0 to 1
  },
);`,
          html: `const scene = new ZScene('mainMenu');

scene.load('./assets/mainMenu/', () => {
  ZSceneStack.push(scene);
  scene.loadStage(document.getElementById('app')!);
});`,
        },
      },
      { t: 'h', text: 'Finding elements' },
      { t: 'p', text: 'Everything you named in zStudio can be found by its **instance name** through `scene.sceneStage`. `get()` searches every level below the container and returns the first match, or `null`.' },
      {
        t: 'code', code: {
          pixi7: `import { ZButton, ZContainer } from 'zimporter-pixi';

const stage = scene.sceneStage;

const playBtn = stage.get('playBtn') as ZButton;

// Search inside one container. Useful when names repeat.
const popup = stage.get('settingsPopup') as ZContainer;
const closeBtn = popup.get('closeBtn') as ZButton;

// Every element with this name
const coins = stage.getAll('coin');

// Every element of a type
const buttons = stage.getAllOfType('ZButton') as ZButton[];`,
          pixi8: `import { ZButton, ZContainer } from 'zimporter-pixi8';

const stage = scene.sceneStage;

const playBtn = stage.get('playBtn') as ZButton;

// Search inside one container. Useful when names repeat.
const popup = stage.get('settingsPopup') as ZContainer;
const closeBtn = popup.get('closeBtn') as ZButton;

// Every element with this name
const coins = stage.getAll('coin');

// Every element of a type
const buttons = stage.getAllOfType('ZButton') as ZButton[];`,
          phaser: `import { ZButton, ZContainer } from 'zimporter-phaser';

const stage = scene.sceneStage;

const playBtn = stage.get('playBtn') as ZButton;

// Search inside one container. Useful when names repeat.
const popup = stage.get('settingsPopup') as ZContainer;
const closeBtn = popup.get('closeBtn') as ZButton;

// Every element with this name. Note: getAllByName, because
// Phaser containers already have a different getAll().
const coins = stage.getAllByName('coin');

// Every element of a type
const buttons = stage.getAllOfType('ZButton') as ZButton[];`,
          html: `import { ZButton, ZContainer } from 'zimporter-html';

const stage = scene.sceneStage;

const playBtn = stage.get('playBtn') as ZButton;

// Search inside one container. Useful when names repeat.
const popup = stage.get('settingsPopup') as ZContainer;
const closeBtn = popup.get('closeBtn') as ZButton;

// Every element with this name
const coins = stage.getAll('coin');

// Every element of a type
const buttons = stage.getAllOfType('ZButton') as ZButton[];`,
        },
      },
      { t: 'p', text: "The element's class comes from the type you gave its container in zStudio: Button becomes `ZButton`, Toggle becomes `ZToggle`, Slider becomes `ZSlider`, Scroll Bar becomes `ZScroll`, State becomes `ZState`." },
      { t: 'p', text: 'Elements are also available as properties on their direct parent, so `stage.playBtn` works too.' },
    ],
  },
  {
    slug: 'buttons',
    title: 'Buttons',
    summary: 'Respond to clicks and long presses, change labels, and enable or disable buttons.',
    blocks: [
      { t: 'h', text: 'What zStudio needs' },
      { t: 'p', text: 'Set the container type to **Button**. Hover, press and disabled visuals then work on their own, with no code.' },
      {
        t: 'tree', text: `playBtn (Button)
├─ upState          the normal look
├─ overState        on hover
├─ downState        while pressed
├─ disabledState    when disabled
└─ labelContainer   holds the text (optional)`,
      },
      { t: 'h', text: 'Handle a click' },
      {
        t: 'code', code: {
          pixi: `const playBtn = stage.get('playBtn') as ZButton;

playBtn.setCallback(() => {
  startGame();
});

// Fires after holding for half a second
playBtn.setLongPressCallback(() => {
  showTooltip();
});

// Remove them when you no longer need them
playBtn.removeCallback();
playBtn.removeLongPressCallback();`,
          phaser: `const playBtn = stage.get('playBtn') as ZButton;

playBtn.setCallback(() => {
  this.startGame();
});

// Fires after holding for half a second
playBtn.setLongPressCallback(() => {
  this.showTooltip();
});

// Remove them when you no longer need them
playBtn.removeCallback();
playBtn.removeLongPressCallback();`,
          html: `const playBtn = stage.get('playBtn') as ZButton;

playBtn.pressCallback = () => {
  startGame();
};

// Fires after holding for half a second
playBtn.longPressCallback = () => {
  showTooltip();
};

// Remove them when you no longer need them
playBtn.pressCallback = undefined;
playBtn.longPressCallback = undefined;`,
        },
      },
      { t: 'note', kind: 'tip', only: ['html'], text: 'The HTML importer sets callbacks through these properties. It has no `setCallback()` method.' },
      { t: 'p', text: 'A press that moves more than 20 pixels counts as a drag, not a click. That is what lets people scroll a list without triggering the buttons inside it.' },
      { t: 'h', text: 'Change the label' },
      {
        t: 'code', code: {
          all: `playBtn.setLabel('Continue');

// Shrink long text to fit the original label box
playBtn.setFixedTextSize(true);
playBtn.setLabel('A much longer translated label');

// Buttons with two text lines use labelContainer2
playBtn.setLabel2('Level 3');`,
        },
      },
      { t: 'h', text: 'Enable and disable' },
      {
        t: 'code', code: {
          all: `playBtn.disable(); // shows disabledState and ignores input
playBtn.enable();  // back to normal. Your callbacks are kept.`,
        },
      },
    ],
  },
  {
    slug: 'toggles',
    title: 'Toggles',
    summary: 'On/off switches for settings like sound and music.',
    blocks: [
      { t: 'h', text: 'What zStudio needs' },
      { t: 'p', text: 'Set the container type to **Toggle** and give it exactly these two children. A toggle always starts off.' },
      {
        t: 'tree', text: `soundToggle (Toggle)
├─ onState
└─ offState`,
      },
      { t: 'h', text: 'Use it' },
      {
        t: 'code', code: {
          all: `const sound = stage.get('soundToggle') as ZToggle;

// Runs when the player clicks, with the new value
sound.setCallback((isOn) => {
  setMuted(!isOn);
});

// Read the current value
if (sound.isOn()) playMusic();

// Set it from code. This also runs your callback...
sound.toggle(true);

// ...so pass false when restoring a saved setting
sound.toggle(savedSettings.sound, false);

sound.disable();
sound.enable();

// Set the same text on both states
sound.setLabelOnAllStates('labelContainer', 'Sound');`,
        },
      },
    ],
  },
  {
    slug: 'sliders',
    title: 'Sliders',
    summary: 'Drag a handle along a track to get a value from 0 to 1.',
    blocks: [
      { t: 'h', text: 'What zStudio needs' },
      { t: 'p', text: 'Set the container type to **Slider** and give it these two children. The width of `track` sets how far the handle can travel. Sliders are horizontal.' },
      {
        t: 'tree', text: `volumeSlider (Slider)
├─ track     the background bar
└─ handle    the part you drag`,
      },
      { t: 'h', text: 'Use it' },
      {
        t: 'code', code: {
          pixi: `const volume = stage.get('volumeSlider') as ZSlider;

// value goes from 0 (left) to 1 (right)
volume.setCallback((value) => {
  audio.volume = value;
});

// Move the handle from code. This also runs your callback.
volume.setHandlePosition(0.75);`,
          phaser: `const volume = stage.get('volumeSlider') as ZSlider;

// value goes from 0 (left) to 1 (right)
volume.setCallback((value) => {
  this.sound.volume = value;
});

// Move the handle from code. This also runs your callback.
volume.setHandlePosition(0.75);`,
          html: `const volume = stage.get('volumeSlider') as ZSlider;

// value goes from 0 (left) to 1 (right)
volume.setCallback((value) => {
  audio.volume = value;
});

// Move the handle from code. This also runs your callback.
volume.setHandlePosition(0.75);`,
        },
      },
      { t: 'h', text: 'Restore a saved value without side effects' },
      { t: 'p', text: "There's no silent way to set the position, and no method to read the value back. Set the position before you attach your callback, and keep the current value yourself." },
      {
        t: 'code', code: {
          pixi: `let currentVolume = savedSettings.volume;

volume.setHandlePosition(currentVolume); // no callback attached yet
volume.setCallback((value) => {
  currentVolume = value;
  audio.volume = value;
});`,
          phaser: `let currentVolume = savedSettings.volume;

volume.setHandlePosition(currentVolume); // no callback attached yet
volume.setCallback((value) => {
  currentVolume = value;
  this.sound.volume = value;
});`,
          html: `let currentVolume = savedSettings.volume;

volume.setHandlePosition(currentVolume); // no callback attached yet
volume.setCallback((value) => {
  currentVolume = value;
  audio.volume = value;
});`,
        },
      },
    ],
  },
  {
    slug: 'scrollbars',
    title: 'Scrollbars',
    summary: 'Scrolling lists with drag, mouse wheel and a draggable thumb, plus adding rows from code.',
    blocks: [
      { t: 'h', text: 'What zStudio needs' },
      { t: 'p', text: 'Set the container type to **Scroll Bar** and give it these three children. Scrolling, clipping and the thumb all work with no code.' },
      {
        t: 'tree', text: `shopList (Scroll Bar)
├─ scrollContent   everything that scrolls. Can be taller than the list.
├─ scrollBar       the bar. Its height is the visible height of the list.
└─ beed            the thumb you drag along the bar`,
      },
      { t: 'p', text: 'The visible width runs from `scrollContent` to `scrollBar`, so place the bar on the right edge of the content. If the content fits, the scrollbar hides itself.' },
      { t: 'p', text: 'Buttons and toggles inside `scrollContent` work normally. Get them with `get()` as usual.' },
      {
        t: 'code', code: {
          all: `const shop = stage.get('shopList') as ZScroll;

const buyBtn = shop.get('buySword') as ZButton;`,
        },
      },
      { t: 'h', text: 'Add rows from code' },
      { t: 'p', text: 'Spawn a row template, place it inside `scrollContent`, and call `applyTransform()` when you finish. That re-measures the list.' },
      {
        t: 'code', code: {
          pixi: `const rowHeight = 80;

items.forEach((item, i) => {
  const row = ZSceneStack.spawn('ShopRow') as ZContainer;
  row.y = i * rowHeight;
  row.get('nameText')?.setText(item.name);

  shop.scrollContent.addChild(row);
});

shop.applyTransform();`,
          phaser: `const rowHeight = 80;

items.forEach((item, i) => {
  const row = ZSceneStack.spawn('ShopRow') as ZContainer;
  row.y = i * rowHeight;
  row.get('nameText')?.setText(item.name);

  shop.scrollContent.add(row);
});

shop.applyTransform();`,
          html: `const rowHeight = 80;

items.forEach((item, i) => {
  const row = ZSceneStack.spawn('ShopRow') as ZContainer;
  row.y = i * rowHeight;
  row.get('nameText')?.setText(item.name);

  shop.scrollContent.addChild(row);
});

shop.applyTransform();`,
        },
      },
      { t: 'h', text: 'Good to know' },
      { t: 'ul', only: ['pixi7', 'pixi8', 'phaser'], items: [
        'The mouse wheel listens everywhere, not just over the list, and it moves every list in the scene. Turn it off for lists that are hidden or inactive with `shop.scrollingEnabled = false`.',
        'Resizing or rotating the screen scrolls the list back to the top.',
        'Call `shop.removeListeners()` before you remove a list from the screen.',
      ] },
      { t: 'ul', only: ['html'], items: [
        'The mouse wheel only scrolls the list under the pointer. To turn it off, set `shop.scrollingEnabled = false`.',
        'Resizing or rotating the screen scrolls the list back to the top.',
      ] },
    ],
  },
  {
    slug: 'states',
    title: 'States',
    summary: 'Show one child at a time, for things like idle, win and lose screens.',
    blocks: [
      { t: 'h', text: 'What zStudio needs' },
      { t: 'p', text: 'Set the container type to **State**. Only one child shows at a time, and it starts on the child named `idle`, or the first child if there is none.' },
      {
        t: 'tree', text: `character (State)
├─ idle
├─ run
└─ jump`,
      },
      { t: 'h', text: 'Use it' },
      {
        t: 'code', code: {
          pixi: `const character = stage.get('character') as ZState;

character.setState('run');

character.getCurrentState()?.name; // 'run'
character.hasState('jump');        // true
character.getAllStateNames();      // all child names`,
          phaser: `const character = stage.get('character') as ZState;

character.setState('run');

character.getCurrentState()?.name; // 'run'
character.hasState('jump');        // true
character.getAllStateNames();      // all child names

// setState() returns the ZState, as Phaser expects.
// setViewState() does the same job and returns the new state.
const run = character.setViewState('run');`,
          html: `const character = stage.get('character') as ZState;

character.setState('run');

character.getCurrentState()?.name; // 'run'
character.hasState('jump');        // true
character.getAllStateNames();      // all child names`,
        },
      },
      { t: 'p', text: "A name that doesn't exist falls back to `idle` with no error, so check your spelling if the wrong state appears. Timelines inside a state stop when it hides and restart when it shows, unless you turned off play on start." },
    ],
  },
  {
    slug: 'text',
    title: 'Text and text inputs',
    summary: 'Change text, shrink it to fit, restyle it, and read what the player typed.',
    blocks: [
      { t: 'h', text: 'Set text' },
      { t: 'p', text: 'In zStudio, a text field always sits inside a container. Call `setText()` on that container.' },
      {
        t: 'code', code: {
          pixi7: `const score = stage.get('scoreText') as ZContainer;
score.setText('1,250');

// Shrink the font when text is too wide for its original box
score.setFixedBoxSize(true);
score.setText('A much longer translated line');

// The underlying PIXI.Text, for anything else
const field = score.getTextField();`,
          pixi8: `const score = stage.get('scoreText') as ZContainer;
score.setText('1,250');

// Shrink the font when text is too wide for its original box
score.setFixedBoxSize(true);
score.setText('A much longer translated line');

// The underlying Text object, for anything else
const field = score.getTextField();`,
          phaser: `const score = stage.get('scoreText') as ZContainer;
score.setText('1,250');

// Shrink the font when text is too wide for its original box
score.setFixedBoxSize(true);
score.setText('A much longer translated line');

// The underlying Phaser text object, for anything else
const field = score.getTextField();`,
          html: `const score = stage.get('scoreText') as ZContainer;
score.setText('1,250');

// Shrink the font when text is too wide for its original box
score.setFixedBoxSize(true);
score.setText('A much longer translated line');

// The underlying HTML element, for anything else
const field = score.getTextField();`,
        },
      },
      { t: 'h', text: 'Change the style' },
      {
        t: 'code', code: {
          pixi: `score.setTextStyle({ fill: '#ffcc00', fontSize: 40 });`,
          phaser: `score.setTextStyle({ color: '#ffcc00', fontSize: '40px' });`,
          html: `score.setTextStyle({ color: '#ffcc00', fontSize: '40px' });`,
        },
      },
      { t: 'p', only: PIXI, text: "`setTextStyle()` has no effect on bitmap fonts, which get their look from the font's image." },
      { t: 'h', text: 'Text inputs' },
      {
        t: 'code', code: {
          pixi: `const form = stage.get('loginForm') as ZContainer;
const nameInput = form.get('nameInput') as ZContainer;

// The input itself lives on getTextField()
const field = nameInput.getTextField() as any;

field.on('input', (text: string) => console.log(text));
field.text = 'Player 1';
field.focus();
field.blur();
field.disabled = true;`,
          phaser: `const nameInput = stage.get('nameInput') as ZTextInput;

const value = nameInput.getText();
nameInput.setValue('Player 1');
nameInput.focus();
nameInput.blur();
nameInput.setDisabled(true);`,
          html: `const nameInput = stage.get('nameInput') as ZTextInput;

const value = nameInput.getText();
nameInput.setValue('Player 1');
nameInput.focus();
nameInput.blur();
nameInput.setDisabled(true);`,
        },
      },
    ],
  },
  {
    slug: 'animation',
    title: 'Animation and Spine',
    summary: 'Play timelines, react when they finish, trigger code at exact frames, and control Spine.',
    blocks: [
      { t: 'h', text: 'Timelines' },
      { t: 'p', text: 'Any container animated on the zStudio timeline becomes a `ZTimeline`. By default it plays once by itself as soon as it loads. Untick play on start and turn on looping in zStudio to change that, or set them from code.' },
      {
        t: 'code', code: {
          all: `const intro = stage.get('intro') as ZTimeline;

intro.stop();
intro.play();
intro.gotoAndPlay(0);   // jump to a frame and play
intro.gotoAndStop(12);  // jump to a frame and stay there

intro.looping = true;

intro.currentFrame;     // where it is now
intro.totalFrames;      // how long it is`,
        },
      },
      { t: 'note', kind: 'warn', only: ['pixi7', 'pixi8', 'phaser'], text: 'If timelines never move, check that you call `ZUpdatables.update()` every frame. See [Install and set up](/z-importer/guide/getting-started).' },
      { t: 'p', text: "To check whether something is a timeline, use `instanceof ZTimeline`." },
      { t: 'h', text: 'React when it ends' },
      {
        t: 'code', code: {
          all: `intro.addStateEndEventListener(() => {
  showMenu();
});

intro.removeStateEndEventListener();`,
        },
      },
      { t: 'p', text: 'On a looping timeline this runs at the end of every loop.' },
      { t: 'h', text: 'Run code at an exact frame' },
      { t: 'p', text: 'Add a cue point in zStudio, then listen for its name. This is the way to sync a sound or an effect to a frame.' },
      {
        t: 'code', code: {
          all: `const onHit = (timeline: ZTimeline) => {
  playSound('hit');
};

ZCuePointsManager.addCuePointListener('hit', onHit);

// Pass the same function to remove it
ZCuePointsManager.removeCuePointListener('hit', onHit);`,
        },
      },
      { t: 'p', text: 'Cue points are global: a listener runs for that name on every timeline.' },
      { t: 'h', only: ['pixi7', 'pixi8', 'phaser'], text: 'Spine' },
      { t: 'p', only: ['pixi7', 'pixi8', 'phaser'], text: 'A Spine asset sits inside a container. `getSpine()` returns the normal Spine object, so everything in the Spine runtime works from there.' },
      {
        t: 'code', only: ['pixi7', 'pixi8', 'phaser'], code: {
          pixi: `const hero = stage.get('hero') as ZContainer;
const spine = hero.getSpine();

if (spine) {
  spine.state.setAnimation(0, 'idle', true);
  spine.state.addAnimation(0, 'walk', true, 0);
}`,
          phaser: `const hero = stage.get('hero') as ZContainer;
const spine = hero.getSpine();

if (spine) {
  spine.animationState.setAnimation(0, 'idle', true);
  spine.animationState.addAnimation(0, 'walk', true, 0);
}`,
        },
      },
      { t: 'p', only: ['html'], text: 'The HTML importer does not support Spine or particles.' },
    ],
  },
  {
    slug: 'spawning',
    title: 'Spawn objects at runtime',
    summary: 'Create enemies, coins and list rows from templates while the game runs.',
    blocks: [
      { t: 'p', text: "Every template in the zStudio Templates panel can be created from code. A spawned object is not added to the screen until you add it." },
      {
        t: 'code', code: {
          pixi: `const coin = ZSceneStack.spawn('Coin') as ZContainer;

coin.x = 300;
coin.y = 150;
scene.sceneStage.addChild(coin);

// Remove it when finished
coin.removeFromParent();
coin.destroy({ children: true });`,
          phaser: `const coin = ZSceneStack.spawn('Coin') as ZContainer;

coin.x = 300;
coin.y = 150;
scene.sceneStage.add(coin);

// Remove it when finished
coin.destroy();`,
          html: `const coin = ZSceneStack.spawn('Coin') as ZContainer;

coin.x = 300;
coin.y = 150;
scene.sceneStage.addChild(coin);

// Remove it when finished
scene.sceneStage.removeChild(coin);`,
        },
      },
      { t: 'p', text: '`ZSceneStack.spawn()` looks through every scene on the stack, newest first. To use one specific scene, call `scene.spawn()`.' },
      { t: 'p', text: 'Positions are in scene units, the same coordinates you see in zStudio, so `scene.sceneWidth` and `scene.sceneHeight` give you the size of the stage for the current orientation.' },
      { t: 'h', text: 'Spawned objects and resizing' },
      { t: 'p', text: "A spawned object has no stored layout, so resizing never moves it. You own its position. The scene's scaling still applies, because it sits inside the stage." },
      { t: 'p', text: 'If you need to place it differently in each orientation, do it in your own resize code.' },
    ],
  },
  {
    slug: 'responsive',
    title: 'Move assets without breaking the layout',
    summary: 'Why a position sometimes jumps back after a resize, and the right way to move, animate and hide anything.',
    blocks: [
      { t: 'h', text: 'How the responsive system works' },
      { t: 'p', text: 'Every element from zStudio stores **two sets of transforms**: one for portrait and one for landscape. On every resize, zImporter does three things:' },
      { t: 'ul', items: [
        'Scales and centres the whole stage to fit the window.',
        'Re-applies the stored transform for the current orientation to every element.',
        'Moves anchored elements to their percentage of the window.',
      ] },
      { t: 'p', text: "So the rule is simple: **anything you change that isn't in the stored transform gets undone at the next resize.** On a phone, that includes the address bar sliding away." },
      { t: 'h', text: 'What survives a resize' },
      { t: 'table', only: PIXI, head: ['You write', 'What happens', 'Use instead'], rows: [
        ['`mc.x = 100`', 'Kept, but only for the current orientation', 'Fine if that is what you want'],
        ['`mc.scaleX = 2`', 'Kept, but only for the current orientation', 'Fine if that is what you want'],
        ['`mc.scale.x = 2`', '**Undone**', '`mc.scaleX = 2`'],
        ['`mc.alpha = 0.5`', '**Undone**', '`mc.setAlpha(0.5)`'],
        ['`mc.visible = false`', '**Undone**', '`mc.setVisible(false)`'],
        ['`mc.rotation = 1`', 'Kept for both orientations', 'Fine'],
        ['`mc.x = 100` on an anchored element', '**Snaps back** to its anchor', 'See recipe 4'],
      ] },
      { t: 'table', only: ['phaser'], head: ['You write', 'What happens', 'Use instead'], rows: [
        ['`mc.x = 100`', '**Undone**', '`mc.setX(100)`, kept for the current orientation'],
        ['`mc.setScaleX(2)`', '**Undone**', 'Write the stored transform (recipe 1)'],
        ['`mc.rotation = 1`', '**Undone**', 'Write the stored transform (recipe 1)'],
        ['`mc.alpha = 0.5`', '**Undone**', '`mc.setAlpha(0.5)`'],
        ['`mc.visible = false`', 'Kept', '`mc.setVisible(false)` is still the safe habit'],
        ['`mc.setX(100)` on an anchored element', '**Snaps back** to its anchor', 'See recipe 4'],
      ] },
      { t: 'table', only: ['html'], head: ['You write', 'What happens', 'Use instead'], rows: [
        ['`mc.x = 100`', 'Kept, but only for the current orientation', 'Fine if that is what you want'],
        ['`mc.scaleX = 2`', 'Kept, but only for the current orientation', 'Fine if that is what you want'],
        ['`mc.alpha = 0.5`', '**Undone**', '`mc.setAlpha(0.5)`'],
        ['`mc.visible = false`', '**Undone**', '`mc.setVisible(false)`'],
        ['`mc.rotation = 1`', 'Kept for both orientations', 'Fine'],
        ['`mc.x = 100` on an anchored element', '**Snaps back** to its anchor', 'See recipe 4'],
      ] },
      { t: 'h', text: 'Recipe 1: Move it for good' },
      { t: 'p', text: 'Write to both stored transforms, then re-apply. They can hold different values. This works for any stored value: `x`, `y`, `scaleX`, `scaleY`, `rotation`.' },
      {
        t: 'code', code: {
          all: `const coinIcon = stage.get('coinIcon') as ZContainer;

coinIcon.portrait.x = 120;
coinIcon.portrait.y = 900;

coinIcon.landscape.x = 40;
coinIcon.landscape.y = 300;

coinIcon.applyTransform();`,
        },
      },
      { t: 'h', text: 'Recipe 2: Move it in this orientation only' },
      {
        t: 'code', code: {
          pixi: `coinIcon.x = 120; // the other orientation keeps its own position`,
          phaser: `coinIcon.setX(120); // the other orientation keeps its own position

// Read it back with getX(), not .x
const x = coinIcon.getX();`,
          html: `coinIcon.x = 120; // the other orientation keeps its own position`,
        },
      },
      { t: 'h', text: 'Recipe 3: Animate it and come back' },
      { t: 'p', text: "For a bounce, shake or pulse, the safest setup is a wrapper. In zStudio, put the artwork inside an inner container named `content`. The outer container keeps the layout, and you only ever animate the inner one." },
      {
        t: 'tree', text: `coinIcon        keeps its layout. Leave this one alone.
└─ content      animate this one
   └─ artwork`,
      },
      {
        t: 'code', code: {
          pixi: `import { gsap } from 'gsap';

const content = coinIcon.get('content') as ZContainer;
const startY = content.y;

gsap.to(content, {
  y: startY - 30,
  duration: 0.15,
  yoyo: true,
  repeat: 1,
});`,
          phaser: `const content = coinIcon.get('content') as ZContainer;

this.tweens.add({
  targets: content,
  y: content.y - 30,
  duration: 150,
  yoyo: true,
});`,
          html: `import { gsap } from 'gsap'; // or any tween library

const content = coinIcon.get('content') as ZContainer;
const startY = content.y;

gsap.to(content, {
  y: startY - 30,
  duration: 0.15,
  yoyo: true,
  repeat: 1,
});`,
        },
      },
      { t: 'note', kind: 'tip', only: ['pixi7', 'pixi8', 'html'], text: "Why not tween `coinIcon` directly? Setting `x` or `y` writes into the stored transform for the current orientation. If the screen rotates mid-tween, the tween's values land in the wrong orientation and stay there." },
      { t: 'note', kind: 'tip', only: ['phaser'], text: 'In Phaser, a tween writes to `x` and `y` directly, so it never touches the stored transform. A resize mid-tween can make the element jump, and the wrapper avoids that.' },
      { t: 'h', text: 'Recipe 4: Anchored elements' },
      { t: 'p', text: 'An anchored element is positioned as a percentage of the window, so setting its position has no lasting effect. To move it, change the anchor (values from 0 to 1). To animate it, use the wrapper from recipe 3.' },
      {
        t: 'code', code: {
          all: `const pauseBtn = stage.get('pauseBtn') as ZButton;

pauseBtn.portrait.anchorPercentage = { x: 0.9, y: 0.05 };
pauseBtn.landscape.anchorPercentage = { x: 0.95, y: 0.1 };

pauseBtn.applyTransform();`,
        },
      },
      { t: 'h', text: 'Recipe 5: Your code owns the position' },
      { t: 'p', text: 'For a player character, a projectile, or anything your game logic moves every frame, opt out of the layout system. The element stays where you put it through any resize. It still scales with the stage.' },
      {
        t: 'code', code: {
          pixi: `const player = stage.get('player') as ZContainer;
player.resizeable = false;

// In your game loop
player.x += speed * delta;`,
          phaser: `const player = stage.get('player') as ZContainer;
player.resizeable = false;

// In your game loop. Plain .x is right here: there's no layout to protect.
player.x += speed * delta;`,
          html: `const player = stage.get('player') as ZContainer;
player.resizeable = false;

// In your game loop
player.x += speed * delta;`,
        },
      },
      { t: 'h', text: 'Recipe 6: Show, hide and fade' },
      {
        t: 'code', code: {
          all: `popup.setVisible(false);   // both orientations, survives resizes
popup.setAlpha(0.5);       // both orientations, survives resizes`,
        },
      },
      { t: 'h', text: 'One more trap' },
      { t: 'p', text: "**Timelines control their children.** A child animated on a timeline gets its position from the timeline's frames, so your changes are overwritten. Move the timeline itself, or a container around it." },
    ],
  },
  {
    slug: 'managing-scenes',
    title: 'Switch and remove scenes',
    summary: 'Move between scenes, layer them, and free their memory.',
    blocks: [
      { t: 'p', text: '`ZSceneStack` keeps track of your loaded scenes. It is what passes window resizes to them and finds templates when you spawn.' },
      { t: 'h', text: 'Switch to another scene' },
      { t: 'p', text: 'Take the old scene off the stack, destroy it, then load the next one. If several scenes are loaded, `ZSceneStack.clear()` removes them all from the stack.' },
      {
        t: 'code', code: {
          pixi: `async function goToScene(oldScene: ZScene, nextPath: string) {
  ZSceneStack.pop();
  await oldScene.destroy();

  const next = new ZScene('next');
  next.load(nextPath, () => {
    ZSceneStack.push(next);
    next.loadStage(app.stage);
  });
}`,
          phaser: `async function goToScene(oldScene: ZScene, nextPath: string, phaserScene: Phaser.Scene) {
  ZSceneStack.pop();
  await oldScene.destroy();

  const next = new ZScene('next', phaserScene);
  next.load(nextPath, () => {
    ZSceneStack.push(next);
    next.loadStage(phaserScene);
  });
}`,
          html: `function goToScene(oldScene: ZScene, nextPath: string) {
  ZSceneStack.pop();
  oldScene.destroy();

  const next = new ZScene('next');
  next.load(nextPath, () => {
    ZSceneStack.push(next);
    next.loadStage(document.getElementById('app')!);
  });
}`,
        },
      },
      { t: 'h', text: 'Layer scenes' },
      { t: 'p', text: 'To keep a scene underneath, such as a popup over the game, push and load the second one too. Both get resized, and spawning checks the newest scene first.' },
      {
        t: 'code', code: {
          pixi: `const popup = new ZScene('popup');
popup.load('./assets/popup/', () => {
  ZSceneStack.push(popup);
  popup.loadStage(app.stage);
});

ZSceneStack.peek();          // the newest scene
ZSceneStack.getStackSize();  // how many scenes are loaded
ZScene.getSceneById('popup');`,
          phaser: `const popup = new ZScene('popup', this);
popup.load('./assets/popup/', () => {
  ZSceneStack.push(popup);
  popup.loadStage(this);
});

ZSceneStack.peek();          // the newest scene
ZSceneStack.getStackSize();  // how many scenes are loaded
ZScene.getSceneById('popup');`,
          html: `const popup = new ZScene('popup');
popup.load('./assets/popup/', () => {
  ZSceneStack.push(popup);
  popup.loadStage(document.getElementById('app')!);
});

ZSceneStack.peek();          // the newest scene
ZSceneStack.getStackSize();  // how many scenes are loaded
ZScene.getSceneById('popup');`,
        },
      },
    ],
  },
  {
    slug: 'ai-skills',
    title: 'Use the skills with your AI tool',
    summary: 'Every importer package includes skills that teach your AI tool to write correct zImporter code.',
    blocks: [
      { t: 'p', text: 'Skills are short Markdown guides written for AI tools. Every zImporter package now includes a set made for that engine, so your AI uses the right methods and follows the responsive layout rules without you explaining them.' },
      { t: 'h', text: "What's included" },
      { t: 'table', head: ['Skill', 'What it teaches'], rows: [
        ['`zimporter-setup`', 'Installing, loading scenes, finding elements, switching scenes'],
        ['`zimporter-components`', 'Buttons, toggles, sliders, scrollbars, states, text and text inputs'],
        ['`zimporter-responsive-layout`', 'Moving, scaling, hiding and animating elements without breaking the layout'],
        ['`zimporter-animation-and-spawning`', 'Timelines, cue points and spawning templates at runtime'],
      ] },
      { t: 'h', text: 'Get them' },
      { t: 'p', text: 'Skills are included from version 1.0.98 of `zimporter-pixi`, 1.1.2 of `zimporter-pixi8`, 1.0.73 of `zimporter-phaser` and 1.1.2 of `zimporter-html`. Update to the latest version:' },
      {
        t: 'code', lang: 'bash', code: {
          pixi7: 'npm i zimporter-pixi@latest',
          pixi8: 'npm i zimporter-pixi8@latest',
          phaser: 'npm i zimporter-phaser@latest',
          html: 'npm i zimporter-html@latest',
        },
      },
      { t: 'p', text: 'The skills are now in your project, in this folder:' },
      {
        t: 'code', lang: 'bash', code: {
          pixi7: 'node_modules/zimporter-pixi/skills/',
          pixi8: 'node_modules/zimporter-pixi8/skills/',
          phaser: 'node_modules/zimporter-phaser/skills/',
          html: 'node_modules/zimporter-html/skills/',
        },
      },
      { t: 'h', text: 'Option 1: Add them in zStudio' },
      { t: 'p', text: 'Use this if your AI tool is connected to zStudio over MCP, or if you use the built-in AI Chat.' },
      { t: 'ul', items: [
        'Open **Help → AI Skill Libraries…**',
        'Choose **Add Library Folder…** and pick the `skills` folder above.',
      ] },
      { t: 'p', text: 'The AI then loads only the skills it needs for each task, alongside your own libraries.' },
      { t: 'h', text: 'Option 2: Point your AI tool at the folder' },
      { t: 'p', text: 'Use this for any AI tool that can read files in your project. Tell it where the skills are:' },
      {
        t: 'code', lang: 'none', code: {
          pixi7: 'Before writing code that uses zimporter-pixi, read the skills in\nnode_modules/zimporter-pixi/skills/ and follow them.',
          pixi8: 'Before writing code that uses zimporter-pixi8, read the skills in\nnode_modules/zimporter-pixi8/skills/ and follow them.',
          phaser: 'Before writing code that uses zimporter-phaser, read the skills in\nnode_modules/zimporter-phaser/skills/ and follow them.',
          html: 'Before writing code that uses zimporter-html, read the skills in\nnode_modules/zimporter-html/skills/ and follow them.',
        },
      },
      { t: 'note', kind: 'tip', text: "Add that instruction to your AI tool's project instructions file, so it applies to every session and you don't have to repeat it." },
      { t: 'p', text: 'The skills update whenever you update the package, so they always match the version you have installed.' },
    ],
  },
  {
    slug: 'troubleshooting',
    title: 'Common problems',
    summary: 'Quick fixes for the problems people hit most often.',
    blocks: [
      { t: 'table', head: ['What you see', 'Likely cause', 'Fix'], rows: [
        ['Nothing appears and there is no error', "`placements.json` wasn't found. A failed load can stay silent.", "Check your browser's Network tab. Keep the trailing slash on the path."],
        ['`get()` returns `null`', 'The name is different from the instance name in zStudio, or you called it before `loadStage()`.', 'Copy the instance name exactly, and call `get()` after `loadStage()`.'],
        ['An element jumps back after a resize', 'The change was not stored.', 'See [Move assets without breaking the layout](/z-importer/guide/responsive).'],
        ['Something I hid comes back after a resize', '`visible` or `alpha` was set directly.', 'Use `setVisible()` and `setAlpha()`.'],
        ['Animations do not play', '`ZUpdatables` is not running.', 'Call `ZUpdatables.init()`, and on Pixi and Phaser call `ZUpdatables.update()` every frame.'],
        ['A button has no hover or pressed look', 'The state children are missing or misnamed.', 'Name them `upState`, `overState`, `downState`, `disabledState`.'],
        ['A new row in a list cannot be reached', 'The list has not measured the new content.', 'Call `applyTransform()` on the `ZScroll` after adding rows.'],
        ['`setState()` shows the wrong state', "The name doesn't exist, so it fell back to `idle`.", 'Check the spelling with `getAllStateNames()`.'],
      ] },
      { t: 'p', text: 'Still stuck? Email [jonzohar@zstudiosltd.com](mailto:jonzohar@zstudiosltd.com).' },
    ],
  },
];
