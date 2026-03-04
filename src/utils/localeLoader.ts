export const LOCALES_CACHE = 'locales-v1';

export async function isLocaleCached(lang: string): Promise<boolean> {
  if (typeof caches === 'undefined') return false;
  const cache = await caches.open(LOCALES_CACHE);
  const match = await cache.match(`/locales/${lang}.json`);
  return !!match;
}

export async function fetchAndCacheLocale(lang: string, onProgress?: (loaded: number, total?: number) => void): Promise<Record<string, string>> {
  const url = `/locales/${lang}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  // Try to stream and report progress if available
  const contentLength = res.headers.get('content-length');
  if (!res.body || !contentLength) {
    const text = await res.text();
    const cache = await caches.open(LOCALES_CACHE);
    await cache.put(url, new Response(text, { headers: { 'Content-Type': 'application/json' } }));
    return JSON.parse(text);
  }

  const total = parseInt(contentLength, 10);
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.length;
      onProgress?.(loaded, total);
    }
  }
  const blob = new Blob(chunks, { type: 'application/json' });
  const text = await blob.text();
  const cache = await caches.open(LOCALES_CACHE);
  await cache.put(url, new Response(text, { headers: { 'Content-Type': 'application/json' } }));
  return JSON.parse(text);
}

export async function getLocale(lang: string): Promise<Record<string, string>> {
  const url = `/locales/${lang}.json`;
  if (typeof caches !== 'undefined') {
    const cache = await caches.open(LOCALES_CACHE);
    const match = await cache.match(url);
    if (match) return match.json();
  }
  return fetchAndCacheLocale(lang);
}
