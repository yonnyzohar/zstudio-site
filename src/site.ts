import { useEffect, useState } from 'react';

export const CONTACT_EMAIL = 'jonzohar@zstudiosltd.com';
export const DISCORD_URL = 'https://discord.com/channels/1570547074414547094/1570777241846030446';

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
