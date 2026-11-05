import React from 'react';
import type { ReleaseData } from './site';

interface DownloadButtonsProps {
  releaseData: ReleaseData | null;
  className?: string;
}

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ releaseData, className = '' }) => {
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
    </div>
  );
};

export default DownloadButtons;
