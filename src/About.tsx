import React, { useEffect, useState } from 'react';

interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
}

const About: React.FC = () => {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);

  useEffect(() => {
    // Fetch latest release data
    fetch('/latest-release.json')
      .then(res => res.json())
      .then(data => setReleaseData(data))
      .catch(err => console.error('Failed to load release info:', err));
  }, []);
  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: '0' }}>About zStudio</h1>
        
        <div style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '12px', 
          padding: '1rem', 
          border: '1px solid rgba(20, 184, 166, 0.3)', 
          boxShadow: '0 4px 20px rgba(20, 184, 166, 0.2)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <a 
            className="button primary cta-main" 
            href={releaseData?.mac || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '0.9em', padding: '0.5rem 1rem' }}
          >
            macOS
          </a>
          <a 
            className="button primary cta-main" 
            href={releaseData?.windows || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '0.9em', padding: '0.5rem 1rem' }}
          >
            Windows
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem' }}>
        <img 
          src="/assets/Lightning Fast Scene Creation.png" 
          alt="Lightning Fast Scene Creation" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>What is zStudio?</h2>
          <p>
            zStudio is the ultimate visual authoring tool for 2D web game development and interactive ad creation. Designed to revolutionize your
            workflow, zStudio empowers developers, technical artists, UI/UX teams, and ad creators to create stunning game
            interfaces, responsive layouts, dynamic scenes, and engaging playable ads — all in one intuitive platform. Whether you're building with
            Pixi.js, Phaser, or a custom engine, zStudio makes production faster, cleaner, and more efficient.
          </p>
          <p>
            Built by a game development veteran with over 15 years of industry experience, zStudio was crafted to solve
            real-world bottlenecks. Today, it's a production-proven tool actively used in commercial studios to power
            games deployed worldwide.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem', flexDirection: 'row-reverse' }}>
        <img 
          src="/assets/6_template_system.png" 
          alt="Template System" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Why Choose zStudio?</h2>
          <p>
            Modern web games and interactive ads demand responsive layouts, reusable components, and streamlined pipelines. Yet, many teams
            still rely on manual processes that slow iteration, create inconsistencies, and add unnecessary engineering
            overhead. zStudio changes the game by bridging the gap between design and implementation.
          </p>
          <p>
            With zStudio, you can:
          </p>
          <ul style={{ marginLeft: '2rem' }}>
            <li><strong>Design visually:</strong> Build layouts, scenes, and templates without writing boilerplate code.</li>
            <li><strong>Iterate faster:</strong> Test responsiveness, animations, and hierarchies instantly.</li>
            <li><strong>Export efficiently:</strong> Generate clean, structured data ready for runtime.</li>
          </ul>
          <p>
            zStudio isn't just a tool — it's your partner in creating polished, professional web games and interactive ads.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem' }}>
        <img 
          src="/assets/7_animation.png" 
          alt="Animation System" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>What Makes zStudio Special?</h2>
          <ul style={{ marginLeft: '2rem' }}>
            <li><strong>Visual Scene Building:</strong> Drag, drop, and organize assets with ease. Say goodbye to manual coding.</li>
            <li><strong>Multi-Resolution Support:</strong> Optimize layouts for portrait, landscape, and custom aspect ratios.</li>
            <li><strong>Photoshop / Spine Integration:</strong> Import scenes directly from Photoshop & Spine for seamless iteration.</li>
            <li><strong>Reusable Templates:</strong> Create components once and update all instances instantly.</li>
            <li><strong>Non-Destructive Editing:</strong> Undo/redo functionality ensures safe experimentation.</li>
            <li><strong>Cross-Platform:</strong> Available as a desktop app for macOS and Windows.</li>
            <li><strong>Animations:</strong> Old School timeline animations with keyframes and easing options.</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem', flexDirection: 'row-reverse' }}>
        <img 
          src="/assets/4_transform_controls.png" 
          alt="Transform Controls" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Who is zStudio For?</h2>
          <p>
            zStudio is perfect for:
          </p>
          <ul style={{ marginLeft: '2rem' }}>
            <li>Web Game Developers: Building with Pixi.js, Phaser, or custom 2D engines.</li>
            <li>Technical Artists: Needing precise control without the hassle of boilerplate code.</li>
            <li>UI/UX Teams: Crafting dynamic, responsive interfaces.</li>
            <li>Ad Creators: Designing engaging playable ads for mobile and web platforms.</li>
            <li>Studios: Looking to streamline workflows and reduce integration time.</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem' }}>
        <img 
          src="/assets/3_Hierarchical_Composition.png" 
          alt="Hierarchical Composition" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Proven in Production</h2>
          <p>
            zStudio isn't just a concept — it's a battle-tested tool actively used in commercial game studios. It has
            already powered multiple shipped titles, and continues to evolve through real-world feedback from
            professional developers and creatives.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '2rem', flexDirection: 'row-reverse' }}>
        <img 
          src="/assets/Screenshot 2026-01-16 at 23.17.42.png" 
          alt="zStudio Interface" 
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
        <div>
          <h2 style={{ color: '#fbbb1a', marginTop: '0', marginBottom: '1rem' }}>Our Vision</h2>
          <p>
            We believe zStudio is the future of web game development and interactive advertising. Our mission is to make zStudio the standard for
            visual layout and scene-building — a fast, accessible, and scalable solution that integrates seamlessly into
            modern pipelines.
          </p>
          <p>
            Join the growing community of developers and ad creators who trust zStudio to bring their games and ads to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;