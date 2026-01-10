import React from 'react';

interface Video {
  title: string;
  description: string;
  url: string;
}

const Tutorials: React.FC = () => {
  const videos: Video[] = [
    {
      title: "Navigation, Basic controls & Transforms",
      description: "This video covers navigating the workspace, adjusting stage size and orientation, importing assets, and using core transform tools like move, scale, rotate, and pivot. Learn how to set different layouts for portrait and landscape scenes.",
      url: "https://youtu.be/6Onv-P2Fjyo"
    },
    {
      title: "Panels Overview",
      description: "This video explores zStudio's key panels—Templates, Hierarchy, and Attributes—showing how templates work, how instances are managed, and how the Attributes panel adapts to different asset types. It covers core options like naming, Z-index, portrait/landscape imprinting, transforms, rotation, scaling, width/height editing, alpha, pivot controls, alignment tools, and basic filter effects like drop shadows",
      url: "https://youtu.be/qsiRDy4g-MU"
    },
    {
      title: "Containers & Hierarchies",
      description: "This video explains how zStudio handles hierarchies and templates—how to wrap assets into containers, create nested templates, and edit any instance to update all others automatically. It also shows how to move items within hierarchies, re-parent assets, and break instances back into standalone elements, demonstrating the flexibility and power of Zed Studio's template-based workflow.",
      url: "https://youtu.be/IPQCnAhPSzA"
    },
    {
      title: "Instantiation, Copying or Duplicating Assets",
      description: "In this video, we will learn how to group multiple elements under a parent using a wrapThis video covers how to instantiate, copy, and duplicate assets in zStudio. It explains the difference between creating new instances of a template, copying an existing instance with its transformations, and duplicating an asset into a brand-new template to edit independently. It also demonstrates copying/pasting properties between assets and transferring assets seamlessly between scenes while preserving their layout. container, allowing for easier hierarchy management and reusable instances. We'll also explore creating empty containers to build flexible hierarchies without images, and how to work within their local context to organize and position elements relative to their parent.",
      url: "https://youtu.be/sNgDMoHZpj0"
    },
    {
      title: "Images & Nine slice",
      description: "In this video, we will explore how to add and This video shows how to replace images in zStudio, either by selecting a new file or dragging one directly into the asset field. It also introduces nine-slice support—how to switch an image to a nine-slice, adjust its borders, and scale it cleanly. The video also highlights that images and nine-slices can have different sizes in portrait vs. landscape layouts. text elements within a scene. We'll cover renaming, customizing text appearance through the attributes panel, and turning text components into reusable templates that can be instantiated multiple times, including at runtime.",
      url: "https://youtu.be/EusxLV6eV1M"
    },
    {
      title: "Testing your Scene",
      description: "This video demonstrates testing a full zStudio scene—showing a slot machine layout built with images, nine-slices, buttons, and a portrait/landscape setup. It explains how the built-in test window loads the exported scene through the zStudio importer (currently supporting Pixi), allowing artists to preview exactly how their UI will look and behave on a real device without needing a developer.",
      url: "https://youtu.be/BHWw6DEsxyA"
    },
    {
      title: "Working with Text",
      description: "This video covers how to create and edit text in zStudio. It shows how to add text fields, adjust font size, weight, color, spacing, alignment, and apply strokes and shadows. It also demonstrates using the external text editor workflow, switching between text fields and input fields, naming text containers for code access, and setting a default font so new text fields automatically use your preferred style.",
      url: "https://youtu.be/K6N_sOl6qck"
    },
    {
      title: "Pivots & Anchors",
      description: "This video explains how to use pivots and anchors in zStudio to create dynamic, responsive layouts. It covers adjusting pivot points for rotation and scaling, using anchor presets to position elements relative to the stage or parent containers, and setting custom anchor values for precise control. The video also demonstrates how pivots and anchors work together to ensure assets maintain their intended positions across different screen sizes and orientations.",
      url: "https://youtu.be/zi-UmLR_bmY"
    },
    {
      title: "Adding Spine assets",
      description: "This video shows how zStudio supports Spine animations. It explains how to import Spine files (JSON, PNG, and Atlas), set them up as containers, adjust positions, templates, and instance names, and configure animations and skins. You can preview the Spine assets in your scene just like any other zStudio element.",
      url: "https://youtu.be/qSuXF1vQe_M"
    },
    {
      title: "Adding Particles",
      description: "This video demonstrates zStudio's support for particles using Pixie Particles v5. It shows how to create particle containers, adjust parameters like movement, acceleration, rotation, spawn, and burst, and assign images to emitters. You can fully configure and preview particles within zStudio, leveraging the same options available in Pixie Particles.",
      url: "https://youtu.be/t2zMi8RMG5Y"
    },
    {
      title: "Saving and Loading",
      description: "This video explains how to save and load scenes in zStudio. It covers three options: standard save (JSON file referencing assets on disk), save with exported images (copies all images for safer project portability), and export as a texture atlas (creates a single atlas with JSON references for runtime). It also highlights how the scene hierarchy and templates are saved, ensuring assets and layouts can be reliably loaded and tested across devices.",
      url: "https://youtu.be/AZob2lf7Aw8"
    },
    {
      title: "Designing for Portrait and Landscape",
      description: "This video This video demonstrates designing a responsive slot machine scene from scratch in zStudio. It covers importing and organizing assets, creating templates for backgrounds, buttons, reels, and text fields, and setting up portrait and landscape layouts. The video also shows how to use full-screen backgrounds, pivot points, anchoring, and guides to create dynamic, pixel-perfect layouts that adapt to different screen sizes and orientations. through the export options in zStudio. It covers exporting as individual images (with JSON placement data), exporting as a texture atlas (single PNG with JSON references), and exporting for different rendering libraries like Pixi.js. The video also highlights settings for optimizing exports, such as trimming images, adjusting scale, and choosing file formats to ensure efficient loading in your game projects.",
      url: "https://youtu.be/EypJ2ZRc4DI"
    },
    {
      title: "Components - buttons, toggles, sliders, scrollbars...",
      description: "This video explains Z Studio's asset types and components, showing how to make interactive UI elements",
      url: "https://youtu.be/_GE3LhaHCno"
    },
    {
      title: "zStudio: Rigging, Animating, Setting Cue Points",
      description: "In this video, we explore Z Studio's animation capabilities. We see how to create animations for assets like robots by setting keyframes on their body parts, and we learn how to apply different easing functions to the transitions between keyframes. The animation is based on transformations like rotation and movement, and we can manipulate these assets directly in the timeline. The video also demonstrates how to adjust the scale and rotation of animated instances while preserving their local animations.",
      url: "https://youtu.be/6kYR-U61-nI"
    },
    {
      title: "zImporter - Importing zStudio scenes",
      description: "This video explains how to import zStudio scenes into your game using the zImporter.",
      url: "https://youtu.be/ZINRf2fgfQs"
    },
    {
      title: "zImporter - Spawning assets at runtime & slider control",
      description: "In this video we create a scene with assets we intend to spawn with code at runtime. we also look into controlling assets with the slider component.",
      url: "https://youtu.be/ZF16NtK-kLI"
    }
  ];

  const getVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|v=)([\w\-]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="container">
      <h1>Help Videos</h1>

      <style>
        {`
          .video-item {
            display: flex;
            margin-bottom: 20px;
            background-color: #333;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            overflow: hidden;
          }

          .video-description {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .video-description h3 {
            margin-top: 0;
            color: #fbbb1a;
          }

          .video-description p {
            font-size: 14px;
            line-height: 1.5;
            color: #bbb;
          }

          .video-embed {
            width: 560px;
            height: 315px;
            border: 0;
            background-color: #1f1f1f;
          }

          .video-item img {
            max-width: 100%;
            border-radius: 8px;
          }

          @media (max-width: 768px) {
            .video-item {
              flex-direction: column;
            }
            .video-embed {
              width: 100%;
              height: 250px;
            }
          }
        `}
      </style>

      {videos.map((video, index) => {
        const videoId = getVideoId(video.url);
        if (!videoId) return null;

        return (
          <div key={index} className="video-item">
            <div className="video-description">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
            <div className="video-embed">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
                title={video.title}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tutorials;