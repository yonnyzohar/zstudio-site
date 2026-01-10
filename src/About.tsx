import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container">
      <h1>About zStudio</h1>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>What is zStudio?</h2>
      <p>
        zStudio is the ultimate visual authoring tool for 2D web game development. Designed to revolutionize your
        workflow, zStudio empowers developers, technical artists, and UI/UX teams to create stunning game
        interfaces,
        responsive layouts, and dynamic scenes — all in one intuitive platform. Whether you're building with
        Pixi.js, Phaser, or a custom engine, zStudio makes production faster, cleaner, and more efficient.
      </p>
      <p>
        Built by a game development veteran with over 15 years of industry experience, zStudio was crafted to solve
        real-world bottlenecks. Today, it's a production-proven tool actively used in commercial studios to power
        games deployed worldwide.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Why Choose zStudio?</h2>
      <p>
        Modern web games demand responsive layouts, reusable components, and streamlined pipelines. Yet, many teams
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
        zStudio isn't just a tool — it's your partner in creating polished, professional web games.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>What Makes zStudio Special?</h2>
      <ul style={{ marginLeft: '2rem' }}>
        <li><strong>Visual Scene Building:</strong> Drag, drop, and organize assets with ease. Say goodbye to manual coding.</li>
        <li><strong>Multi-Resolution Support:</strong> Optimize layouts for portrait, landscape, and custom aspect ratios.</li>
        <li><strong>Photoshop / Spine Integration:</strong> Import scenes directly from Photoshop & Spine for seamless iteration.</li>
        <li><strong>Reusable Templates:</strong> Create components once and update all instances instantly.</li>
        <li><strong>Non-Destructive Editing:</strong> Undo/redo functionality ensures safe experimentation.</li>
        <li><strong>Cross-Platform:</strong> Available as a desktop app for macOS and Windows.</li>
        <li><strong>Animations:</strong> Old School timeline animations with keyframes and easing options.</li>
      </ul>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Who is zStudio For?</h2>
      <p>
        zStudio is perfect for:
      </p>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Web Game Developers: Building with Pixi.js, Phaser, or custom 2D engines.</li>
        <li>Technical Artists: Needing precise control without the hassle of boilerplate code.</li>
        <li>UI/UX Teams: Crafting dynamic, responsive interfaces.</li>
        <li>Studios: Looking to streamline workflows and reduce integration time.</li>
      </ul>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Proven in Production</h2>
      <p>
        zStudio isn't just a concept — it's a battle-tested tool actively used in commercial game studios. It has
        already powered multiple shipped titles and continues to evolve through real-world feedback from
        professional developers.
      </p>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Our Vision</h2>
      <p>
        We believe zStudio is the future of web game development. Our mission is to make zStudio the standard for
        visual layout and scene-building — a fast, accessible, and scalable solution that integrates seamlessly into
        modern pipelines.
      </p>
      <p>
        Join the growing community of developers who trust zStudio to bring their games to life.
      </p>
    </div>
  );
};

export default About;