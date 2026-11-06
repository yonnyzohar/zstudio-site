import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import DownloadButtons from './DownloadButtons';
import AICosts from './AICosts';
import { useReleaseData } from './site';
import { FiCpu, FiImage, FiBookOpen, FiMessageSquare, FiEye } from 'react-icons/fi';

const DOCS = './zStudioDocumentation/index.html';

const AI_CAN = [
  'Create and arrange containers and hierarchies',
  'Import images, Spine animations and particles',
  'Position and anchor elements for portrait and landscape',
  'Edit text and build buttons, toggles, sliders and other components',
  'Animate on the timeline',
  'Generate and reskin images with your local models',
  'Save and export the scene',
];

const EXAMPLE_PROMPTS = [
  'Build a level-complete popup with three stars, a score counter and Next / Retry buttons. Portrait and landscape.',
  'Reskin this main menu for Halloween. Keep the layout, regenerate the buttons and the background.',
  'Make six size variants of this playable ad end card for the main ad networks.',
  'Study the scenes in my project folder and write a skill library describing how we build menus.',
];

const SKILL_SAMPLE = `---
name: popup-structure
description: The container hierarchy we use for popups.
  Load before building any popup or dialog.
---
# Popup structure
...`;

const AI: React.FC = () => {
  const releaseData = useReleaseData();

  return (
    <div className="container ai-page">
      <SEO
        title="AI Game Scene Automation – MCP Server, Skills & Local Image Models"
        description="Let your AI build Pixi.js and Phaser game scenes in zStudio. Built-in MCP server, custom skills and local AI image models, free on every plan."
        canonical="/ai"
      />

      {/* HERO */}
      <section className="ai-page-hero">
        <h1><span className="title-gradient">Automate Your Game Scenes with AI</span></h1>
        <p className="ai-page-intro">
          Connect the AI tool you already use to zStudio. It builds full scenes, generates the art and follows your studio's conventions, while you keep a visual editor to review and fine-tune the result.
        </p>
        <DownloadButtons releaseData={releaseData} className="ai-page-downloads" />
        <p className="ai-page-free">
          zStudio is free to download, and so are the MCP server, skills and local image models. The AI itself is not included: bring an AI tool you already pay for, or use the built-in AI Chat on a paid plan.
        </p>
      </section>

      {/* SETUP */}
      <section className="ai-ready-section">
        <h2 className="ai-ready-heading">Up and Running in Three Steps</h2>
        <div className="ai-flow">
          <div className="ai-flow-step">
            <span className="ai-flow-number">1</span>
            <h3>Download zStudio</h3>
            <p>Free for macOS, Windows and Linux. No account needed for the MCP server or local models.</p>
          </div>
          <div className="ai-flow-step">
            <span className="ai-flow-number">2</span>
            <h3>Connect your AI</h3>
            <p>Open <strong>Help → Connect AI (MCP)</strong> and paste the ready-made snippet into your AI tool. You need an MCP-capable AI tool with its own subscription.</p>
          </div>
          <div className="ai-flow-step">
            <span className="ai-flow-number">3</span>
            <h3>Ask for a scene</h3>
            <p>Describe what you need. Your AI builds it in the open editor while you watch.</p>
          </div>
        </div>
        <p className="ai-ready-note">
          <a href={`${DOCS}#h.mcp-server`} target="_blank" rel="noopener noreferrer">Read the full setup guide</a>
        </p>
      </section>

      {/* MCP */}
      <section className="ai-page-split">
        <div>
          <FiCpu className="ai-ready-icon" />
          <h2>A Built-in MCP Server</h2>
          <p>
            MCP (Model Context Protocol) is the open standard that lets AI assistants operate apps. zStudio runs an MCP server on your machine, so any MCP client can drive the editor. The AI runs on your AI tool's own subscription, not on zStudio credits, and zStudio doesn't sell or include one.
          </p>
        </div>
        <div className="ai-page-panel">
          <h3>Through MCP your AI can</h3>
          <ul>
            {AI_CAN.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* EXAMPLE PROMPTS */}
      <section className="ai-page-prompts">
        <h2>What to Ask For</h2>
        <div className="ai-ready-grid">
          {EXAMPLE_PROMPTS.map(p => (
            <div key={p} className="ai-prompt">
              <span className="ai-prompt-label">Example prompt</span>
              <p>"{p}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="ai-page-split">
        <div>
          <FiBookOpen className="ai-ready-icon" />
          <h2>Skills: Teach It Your Studio's Way</h2>
          <p>
            Skills are short Markdown files that describe your conventions: the container hierarchy for a shop screen, how you name templates, how your popups are built. zStudio already ships skills for its own features. Add a folder of your own and the AI loads only the ones it needs for the task.
          </p>
          <p>
            Don't want to write them? Your existing scenes already show your conventions. zStudio gives you a prompt that lets an AI tool that can read your files study those scenes and write the skill library for you.
          </p>
          <p>
            Every zImporter package also includes ready-made skills, so your AI writes correct code against your scenes in Pixi.js, Phaser or HTML. <Link to="/z-importer/guide/ai-skills">How to use them</Link>
          </p>
          <p>
            <a href={`${DOCS}#h.skill-libraries`} target="_blank" rel="noopener noreferrer">How to write skills</a>
          </p>
        </div>
        <div className="ai-page-panel">
          <h3>A skill file starts like this</h3>
          <pre><code>{SKILL_SAMPLE}</code></pre>
        </div>
      </section>

      {/* IMAGES + CHAT */}
      <section className="ai-ready-grid ai-page-cards">
        <div className="ai-ready-card">
          <FiImage className="ai-ready-icon" />
          <h3>Local AI Image Models</h3>
          <p>Add Stable Diffusion, SDXL, FLUX, Z-Image or Qwen-Image models from Hugging Face or Civitai. Generate from text, from other images, or reskin an image in place. No account, no credits, no internet connection, and nothing leaves your computer. Your MCP-connected AI can use them too.</p>
        </div>
        <div className="ai-ready-card">
          <FiImage className="ai-ready-icon" />
          <h3>Cloud Image Models</h3>
          <p>On paid plans, use cloud models for transparent-background game assets, paid for with AI credits.</p>
        </div>
        <div className="ai-ready-card">
          <FiMessageSquare className="ai-ready-icon" />
          <h3>Built-in AI Chat</h3>
          <p>On paid plans, chat with an AI right inside zStudio to build and edit your scene, choosing a faster or a more powerful model. No external setup, paid for with AI credits.</p>
        </div>
      </section>

      {/* WHY VISUAL */}
      <section className="ai-page-why">
        <div>
          <FiEye className="ai-ready-icon" />
          <h2>Why Not Just Let the AI Write Code?</h2>
          <p>
            AI-written layout code is hard to review. You can't see it, and fixing one button means another round with the AI. A zStudio scene is something your whole team can open, check on every screen size and fix by hand in seconds.
          </p>
          <p>
            The AI does the bulk of the work. A person signs off. The developer gets a clean scene that loads into Pixi.js, Phaser or HTML in a few lines.
          </p>
        </div>
      </section>

      {/* COSTS */}
      <section className="ai-page-costs" id="costs">
        <h2>What It Costs, and What You Need</h2>
        <p>Check this before you install, so nothing comes as a surprise.</p>
        <AICosts />
      </section>
    </div>
  );
};

export default AI;
