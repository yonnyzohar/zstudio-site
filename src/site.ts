import { useEffect, useState } from 'react';

export const CONTACT_EMAIL = 'jonzohar@zstudiosltd.com';

export const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('zStudio demo request')}&body=${encodeURIComponent(
  'Hi,\n\nI\'d like a demo of zStudio.\n\nStudio / team size:\nEngine (Pixi.js, Phaser, HTML, other):\nWhat we want to build:\nTimezone and a few times that work:\n'
)}`;

export interface ReleaseData {
  version: string;
  mac: string;
  windows: string;
  windowsVersion?: string;
  linux: string;
}

export function useReleaseData(): ReleaseData | null {
  const [releaseData, setReleaseData] = useState<ReleaseData | null>(null);

  useEffect(() => {
    fetch(`/latest-release.json?cacheBust=${Date.now()}`)
      .then(res => res.json())
      .then(data => setReleaseData(data))
      .catch(err => console.error('Failed to load release info:', err));
  }, []);

  return releaseData;
}
