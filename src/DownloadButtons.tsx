import React from 'react';
import type { ReleaseData } from './site';

interface DownloadButtonsProps {
  releaseData: ReleaseData | null;
  className?: string;
}

// macOS and Linux get the latest release. Windows is pinned to an older
// build on purpose, so it is offered as a small secondary link.
const DownloadButtons: React.FC<DownloadButtonsProps> = ({ releaseData, className = '' }) => {
  const windowsVersion = releaseData?.windowsVersion;

  return (
    <div className={`download-group ${className}`}>
      <div className="downloads-buttons">
        <a className="button primary cta-main compact mac" href={releaseData?.mac || '#'} target="_blank" rel="noopener noreferrer">
          macOS
        </a>
        <a className="button primary cta-main compact linux" href={releaseData?.linux || '#'} target="_blank" rel="noopener noreferrer">
          Linux
        </a>
      </div>
      <a
        className="windows-download"
        href={releaseData?.windows || '#'}
        target="_blank"
        rel="noopener noreferrer"
        title={windowsVersion ? `The Windows build is pinned to v${windowsVersion}. macOS and Linux get the latest release.` : undefined}
      >
        Windows{windowsVersion ? ` (v${windowsVersion})` : ''}
      </a>
    </div>
  );
};

export default DownloadButtons;
