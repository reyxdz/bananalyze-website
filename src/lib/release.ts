import { useEffect, useState } from 'react';

/* Written by scripts/publish-apk.mjs next to the APK it describes. */
const MANIFEST_URL = '/downloads/latest.json';

export const RELEASES_URL = 'https://github.com/reyxdz/bananaCheck/releases';

export interface ApkRelease {
  version: string;
  file: string;
  bytes: number;
  sha256: string;
  minAndroid: string;
}

export type ReleaseState =
  | { status: 'loading' }
  | { status: 'ready'; apk: ApkRelease; url: string }
  | { status: 'unavailable' };

function isRelease(value: unknown): value is ApkRelease {
  const v = value as Partial<ApkRelease> | null;
  return (
    !!v &&
    typeof v.version === 'string' &&
    typeof v.file === 'string' &&
    typeof v.bytes === 'number' &&
    typeof v.sha256 === 'string' &&
    /^[0-9a-f]{64}$/.test(v.sha256) &&
    typeof v.minAndroid === 'string'
  );
}

let pending: Promise<ReleaseState> | null = null;

function loadRelease(): Promise<ReleaseState> {
  pending ??= fetch(MANIFEST_URL, { cache: 'no-cache' })
    .then(async (res) => {
      if (!res.ok || !res.headers.get('content-type')?.includes('json')) return { status: 'unavailable' } as const;
      const data: unknown = await res.json();
      if (!isRelease(data)) return { status: 'unavailable' } as const;
      const url = new URL(`/downloads/${data.file}`, window.location.origin).href;
      return { status: 'ready', apk: data, url } as const;
    })
    .catch(() => ({ status: 'unavailable' }) as const);
  return pending;
}

export function useRelease(): ReleaseState {
  const [state, setState] = useState<ReleaseState>({ status: 'loading' });
  useEffect(() => {
    let live = true;
    loadRelease().then((next) => live && setState(next));
    return () => {
      live = false;
    };
  }, []);
  return state;
}

export const formatMegabytes = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;
