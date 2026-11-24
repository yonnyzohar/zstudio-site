import React from 'react';
import SEO from './SEO';

const Terms: React.FC = () => {
  return (
    <div className="container">
      <SEO
        title="Terms of Use – zStudio"
        description="Read the terms of use for zStudio software. Understand your rights, what you may and may not do with the software, and our warranty disclaimer."
        canonical="/terms"
      />
      <h1>zStudio</h1>

      <h2 style={{ color: '#fbbb1a', marginTop: '2rem', marginBottom: '1rem' }}>Copyright 2025–2026 zStudios Ltd</h2>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>License</h3>
      <p>
        You are granted a non-exclusive, non-transferable, revocable license to use this software, including for
        commercial purposes.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>You MAY:</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Use this software for personal or commercial purposes.</li>
        <li>Share the unmodified software package with others.</li>
        <li>Download and use the software at your own discretion.</li>
      </ul>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>You MAY NOT:</h3>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Modify, reverse engineer, decompile, fork, or redistribute the software.</li>
        <li>Sell or sublicense this software, or bundle it into another product for resale.</li>
        <li>Claim ownership or authorship of this software.</li>
      </ul>

      <h3 id="acceptable-use" style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        Acceptable use of AI features
      </h3>
      <p>
        zStudio includes optional AI features: the built-in AI Chat assistant, cloud image generation through
        zStudio Cloud, and support for AI models you run on your own computer. When using these features you
        must not create, request, or try to create:
      </p>
      <ul style={{ marginLeft: '2rem' }}>
        <li>Any content that sexualises minors, or sexual content involving anyone under 18.</li>
        <li>Sexually explicit or pornographic content.</li>
        <li>Content that is illegal in the United Kingdom or where you live.</li>
        <li>
          Content that infringes the copyright, trademarks, or other rights of others, such as copying a
          protected character, artwork, logo, or brand you do not have the rights to use.
        </li>
        <li>
          Content that harasses, threatens, defames, or impersonates a real person, or shows a real person
          without their consent.
        </li>
        <li>Content that promotes terrorism, violence, hatred, or discrimination.</li>
        <li>Malware, or content designed to deceive, defraud, or mislead others.</li>
      </ul>
      <p>
        You are responsible for the prompts and images you submit and for how you use anything the AI features
        produce. Cloud requests are processed by third-party AI providers (such as Leonardo AI), which apply their
        own content filters and may block requests that break their policies. AI models you run locally are under
        your sole control, and you are fully responsible for their use and output.
      </p>
      <p>
        If you break these rules we may suspend or end your access to zStudio Cloud and your zStudio account. To
        report misuse or harmful AI output, email{' '}
        <a href="mailto:jonzohar@zstudiosltd.com">jonzohar@zstudiosltd.com</a>. If you got zStudio through Steam,
        you can also report content using the Steam overlay.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Pricing</h3>
      <p>
        zStudio is free to download and use. Optional zStudio Cloud features (the built-in AI Chat and cloud image
        generation) are paid for with AI credits, which you can buy from within the app.
      </p>

      <h3 style={{ color: '#fbbb1a', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Disclaimer</h3>
      <p>
        This software is provided "as is", without warranty of any kind, express or implied. In no event shall the
        author be liable for any claim, damages, or other liability arising from the use of this software.
      </p>

      <p>
        By using this software, you agree to these terms. This license is governed by the laws of the United
        Kingdom.
      </p>
    </div>
  );
};

export default Terms;