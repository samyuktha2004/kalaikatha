Localization & TTS Roadmap

Progress:

- ✅ On-demand locale downloads implemented
  - `src/utils/localeLoader.ts` — fetches, streams, and caches `/locales/<lang>.json` via Cache API
  - `src/i18n.ts` — initializes `i18next` and exposes `loadLanguage(lang)` for dynamic loading
  - `src/components/LanguageInstaller.tsx` — UI to download, remove, and switch installed languages
  - Added `.env.example` and updated docs

Planned: TTS proxy + caching

- Serverless `/api/tts` endpoint that calls Azure Speech and returns audio blobs (planned)
- Cache synthesized audio in IndexedDB (via `localforage`) for offline playback
- Small UI for downloading voice/phrase packs and playing samples
- Security: serverless endpoint keeps Azure keys out of the client

Implementation notes / next steps:

- Add a Vercel serverless function at `/api/tts` to proxy Azure Speech synthesis and return audio
- Add `localforage` and client-side caching for binary audio data
- Expose download-on-demand voice packs (show size estimates, progress)
- Add automated tests for locale loading and cache behavior

Priority: implement TTS proxy after verifying Azure Speech credentials and cost constraints.
