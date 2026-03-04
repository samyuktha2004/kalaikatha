import React, { useEffect, useState } from 'react';
import { loadLanguage } from '../i18n';
import { isLocaleCached, fetchAndCacheLocale } from '../utils/localeLoader';

const AVAILABLE_LANGS = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
];

export default function LanguageInstaller() {
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const map: Record<string, boolean> = {};
      for (const l of AVAILABLE_LANGS) {
        map[l.code] = await isLocaleCached(l.code);
      }
      setInstalled(map);
    })();
  }, []);

  const handleDownload = async (code: string) => {
    setLoading(prev => ({ ...prev, [code]: true }));
    setProgress(prev => ({ ...prev, [code]: 0 }));
    try {
      await fetchAndCacheLocale(code, (loaded, total) => {
        setProgress(prev => ({ ...prev, [code]: Math.round((loaded / (total || 1)) * 100) }));
      });
      await loadLanguage(code);
      setInstalled(prev => ({ ...prev, [code]: true }));
    } catch (err) {
      console.error('Download failed', err);
      alert('Failed to download language');
    } finally {
      setLoading(prev => ({ ...prev, [code]: false }));
    }
  };

  const handleRemove = async (code: string) => {
    if (typeof caches === 'undefined') return;
    const cache = await caches.open('locales-v1');
    await cache.delete(`/locales/${code}.json`);
    setInstalled(prev => ({ ...prev, [code]: false }));
  };

  return (
    <div className="space-y-4">
      {AVAILABLE_LANGS.map(l => (
        <div key={l.code} className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <div className="font-medium">{l.name}</div>
            <div className="text-sm text-muted-foreground">{l.code}</div>
          </div>
          <div className="flex items-center gap-2">
            {installed[l.code] ? (
              <>
                <button className="btn" onClick={() => loadLanguage(l.code)}>Use</button>
                <button className="btn-outline" onClick={() => handleRemove(l.code)}>Remove</button>
              </>
            ) : (
              <>
                <button className="btn-primary" disabled={!!loading[l.code]} onClick={() => handleDownload(l.code)}>
                  {loading[l.code] ? `Downloading ${progress[l.code] || 0}%` : 'Download'}
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
