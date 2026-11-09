import { useEffect, useState } from 'react';

export const CONTACT_EMAIL = 'jonzohar@zstudiosltd.com';

/** Public source repository for the zStudio editor. Update if the repo moves. */
export const EDITOR_REPO_URL = 'https://github.com/zStudiosLTD/zStudio';
export const EDITOR_LICENSE_URL = `${EDITOR_REPO_URL}/blob/main/LICENSE`;
export const COMMERCIAL_LICENSE_URL = `${EDITOR_REPO_URL}/blob/main/COMMERCIAL-LICENSE.md`;

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
