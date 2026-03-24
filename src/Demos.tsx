import React, { useState, useRef } from 'react';

interface DemoVersion {
  label: string;
  url: string;
}

interface Demo {
  title: string;
  description: string;
  icon: string;
  versions: DemoVersion[];
}

const demos: Demo[] = [
  {
    title: 'A New Mother',
    description: 'An interactive storybook experience built with zStudio. Follow the touching story of a new mother through beautifully animated scenes.',
    icon: '📖',
    versions: [
      { label: 'Pixi.js', url: '/gameDemos/pixi/aNewMother/index.html' },
      { label: 'Phaser', url: '/gameDemos/phaser/aNewMother/index.html' },
    ],
  },
  {
    title: 'Slot Machine',
    description: 'A fully-featured slot machine demo built with zStudio. Play a classic Wild West themed slot machine with multiple reels, animations, and win logic.',
    icon: '🎰',
    versions: [
      { label: 'Pixi.js', url: '/gameDemos/pixi/slotMachine/index.html' },
      { label: 'Phaser', url: '/gameDemos/phaser/slotMachine/index.html' },
    ],
  },
  {
    title: 'Space Shooter',
    description: 'An action-packed space shooter demo built with zStudio. Pilot your ship, dodge enemies, and blast your way through waves of alien invaders.',
    icon: '🚀',
    versions: [
      { label: 'Pixi.js', url: '/gameDemos/pixi/spaceShooter/index.html' },
    ],
  },
];

const Demos: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoVersion | null>(null);
  // Track whether a mousedown started inside the modal so releasing outside
  // (e.g. after a resize drag) doesn't accidentally close the popup.
  const mouseDownInsideModal = useRef(false);

  const openDemo = (version: DemoVersion) => {
    setActiveDemo(version);
  };

  const closeDemo = () => {
    setActiveDemo(null);
  };

  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only flag a real backdrop click if mousedown originated on the backdrop itself
    mouseDownInsideModal.current = e.target !== e.currentTarget;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !mouseDownInsideModal.current) {
      closeDemo();
    }
    mouseDownInsideModal.current = false;
  };

  return (
    <div className="demos-page">
      <div className="container">
        <div className="demos-header">
          <h1>Game Demos</h1>
          <p className="demos-subtitle">
            Explore interactive demos built with zStudio. See how zStudio-designed scenes come to life across different rendering engines.
          </p>
        </div>

        <div className="demos-section">
          <div className="demos-grid">
            {demos.map((demo) => (
              <div key={demo.title} className="demo-card">
                <div className="demo-card-icon">{demo.icon}</div>
                <div className="demo-card-content">
                  <h3 className="demo-card-title">{demo.title}</h3>
                  <p className="demo-card-description">{demo.description}</p>
                  <div className="demo-card-versions">
                    <span className="demo-versions-label">Choose version:</span>
                    <div className="demo-version-buttons">
                      {demo.versions.map((version) => (
                        <button
                          key={version.label}
                          className="demo-version-btn"
                          onClick={() => openDemo(version)}
                        >
                          {version.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeDemo && (
        <div className="demo-modal-backdrop" onMouseDown={handleBackdropMouseDown} onClick={handleBackdropClick}>
          <div className="demo-modal">
            <div className="demo-modal-header">
              <span className="demo-modal-title">{activeDemo.label} — {demos.find(d => d.versions.some(v => v.url === activeDemo.url))?.title ?? ''}</span>
              <button className="demo-modal-close" onClick={closeDemo}>✕</button>
            </div>
            <div className="demo-modal-body">
              <iframe
                src={activeDemo.url}
                title={`Slot Machine - ${activeDemo.label}`}
                className="demo-iframe"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demos;
