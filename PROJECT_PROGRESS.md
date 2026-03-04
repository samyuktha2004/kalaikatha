Project Progress — Cleanup & Localization

## Summary

This document records the cleanup and localization work completed for the Kalaikatha project, what changed, where to find it, and next steps (roadmap items).

## Completed

- Environment and docs:
  - Added `.env.example` listing all `VITE_` environment variables used by the app
  - Updated `ROADMAP.md` and added `PROJECT_PROGRESS.md`

- Localization (on-demand languages):
  - Added `src/utils/localeLoader.ts` — fetch + stream + cache `/locales/<lang>.json` in Cache API
  - Added `src/i18n.ts` — `i18next` initialization and `loadLanguage(lang)` dynamic loader
  - Added `src/components/LanguageInstaller.tsx` — UI to download/remove/use languages on demand
  - Updated `package.json` to include `i18next` and `react-i18next` dependencies

## Files changed / added (high-level)

- Added / Updated:
  - `/.env.example` — environment variable template
  - `/PROJECT_PROGRESS.md` (this file)
  - `/ROADMAP.md` — updated with implemented i18n work and TTS plan
  - `src/utils/localeLoader.ts` — Cache API loader
  - `src/i18n.ts` — i18next init and dynamic loader
  - `src/components/LanguageInstaller.tsx` — language installer UI
  - `package.json` — removed `firebase`, added `i18next` dependencies
  - `src/components/AzureTestPage.tsx` and `src/utils/verifyAzure.ts` — removed Firebase checks
  - `src/contexts/AuthContext.tsx` — replaced Firebase-backed implementation with fallback

## How to use the new localization flow

1. Add language files under `public/locales/<lang>.json` (server-hosted). The `LanguageInstaller` will fetch `/locales/<lang>.json`.
2. In the app entry (e.g., `src/main.tsx`), import `src/i18n.ts` to initialize i18n at startup.
3. Add `LanguageInstaller` to a settings page so users can download languages on demand.
4. Downloaded locales are cached using the Cache API under `locales-v1`.

## Roadmap / Next steps

- TTS proxy & audio caching (planned):
  - Implement a serverless `/api/tts` endpoint (Vercel Function) that proxies Azure Speech to synthesize audio
  - Add `localforage` client-side caching for audio blobs and voice packs
  - Add a small UI to download voice packs with size estimates and progress

Project Progress — Full Project Technical Summary

## Summary

This document provides a technical, chronological summary of the Kalaikatha project from creation through the recent cleanup and i18n work. It records major milestones, what was implemented, why decisions were made, how the key flows work at a technical level, and next steps.

## Project timeline & major milestones

- Project created: initial scaffold with Vite + React + TypeScript and Radix UI.
- Early integrations: Azure AI (Vision, OpenAI, Translator, Speech), Firebase (Auth/Analytics), Azure Blob Storage for artifacts.
- Feature development: AI Photo Studio, Smart Pricing (GPT-4), Bargain Bot (autonomous negotiation), Vault (trade-secret protection), Voice-first flows (Vani), Multi-language UI.
- Performance focus: low-end device optimizations, 2G support, caching strategies, offline-first work.
- Recent cleanup: removed unused hosting CI (Netlify), removed Firebase hosting workflows, removed optional config files, and added on-demand locale downloads.

## Completed work (detailed)

- Environment & docs
  - Added `.env.example` enumerating `VITE_` variables for Azure services and other runtime settings.
  - Documented progress in `ROADMAP.md` and `PROJECT_PROGRESS.md`.

- Localization (on-demand)
  - Implemented `src/utils/localeLoader.ts` to fetch, stream, and cache `/locales/<lang>.json` files using the Cache API with progress reporting.
  - Added `src/i18n.ts` to initialize `i18next` and expose `loadLanguage(lang)` for dynamic loading.
  - Added `src/components/LanguageInstaller.tsx` UI so users can download or remove language packs on demand.
  - Updated `package.json` to include `i18next` and `react-i18next`.

## Files added/changed (reference)

- Added or updated:
  - `/.env.example` — environment variable template
  - `PROJECT_PROGRESS.md`, `ROADMAP.md` — documentation
  - `src/utils/localeLoader.ts` — Cache API locale loader
  - `src/i18n.ts` — i18next init + dynamic loader
  - `src/components/LanguageInstaller.tsx` — download-on-demand UI

- Removed:
  - `netlify.toml`, `public/_redirects`, `vercel.json`, `firebase.json`
  - `.github/workflows/firebase-hosting-merge.yml`, `.github/workflows/firebase-hosting-pull-request.yml`
  - `src/services/FirebaseService.ts`

## How it works — technical flows

1. App initialization

- Entry: `src/main.tsx` (or `src/main.ts`) imports UI, providers, and `src/i18n.ts` to initialize i18next.
- `AuthProvider` wraps the app. Current implementation uses a localStorage fallback; in production you can re-enable Firebase by restoring `src/services/FirebaseService.ts` and updating `.env`.

2. Authentication (current fallback)

- API: `useAuth()` provides `login`, `signup`, `logout`, `updateName`, and `isAuthenticated`.
- Behavior: fallback `login/signup` constructs a minimal `User` object, stores it in localStorage, and sets context state so the rest of the app behaves the same without Firebase.
- Swap-in: when Firebase is desired, restore `FirebaseService.ts` and wire the `AuthProvider` to call Firebase auth flows. The `useAuth` API calls remain the same.

3. Localization (on-demand download)

- Files expected under `public/locales/<lang>.json` (production) or served by hosting.
- `LanguageInstaller` checks cache presence via `isLocaleCached(lang)`.
- On download: `fetchAndCacheLocale(lang)` streams the language file, reports progress, stores the file in Cache API under `locales-v1`, then `loadLanguage(lang)` loads strings into `i18next` and switches the UI language.
  Project Technical Reference — How the System Works

## Purpose

This document explains, at a technical level, how Kalaikatha's core subsystems work and interact. It focuses on concrete flows: app initialization, authentication, localization (download-on-demand), image upload & enhancement, AI calls (vision, OpenAI, translator, speech), TTS strategy, negotiation (Bargain Bot), caching and offline behavior, storage and data models, and deployment considerations.

1. App initialization

---

- Entry point: `src/main.tsx` initializes providers, styling, and the i18n system (via `src/i18n.ts`).
- Provider tree:
  - `AuthProvider` (wraps app for authentication state)
  - Theme and UI providers (Tailwind + theme context)
  - Routing & feature providers (if any)
- i18n initialization:
  - `src/i18n.ts` calls `i18next.init()` with `en` as fallback and no preloaded resources.
  - `loadLanguage(lang)` is exposed to dynamically add resource bundles from cached locale JSONs and switch language.

2. Authentication (current implementation & swap-in)

---

- Public API: `useAuth()` exposes `user`, `login(email,password,type)`, `signup(email,password,type,name?)`, `logout()`, `updateName()`, and `isAuthenticated`.
- Current (fallback) behavior:
  - `login`/`signup` create a minimal `User` object and persist it to `localStorage` under `kalaikatha_user`.
  - `AuthProvider` reads localStorage on startup and populates context, so UI components using `useAuth()` behave identically whether Firebase is enabled or not.
- Swap-in with Firebase:
  - Restore `src/services/FirebaseService.ts` and import `auth`, `app`, and Firestore helpers.
  - Replace fallback implementations with Firebase calls (signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut).
  - Keep the `useAuth()` shape unchanged so components require no modifications.

3. Localization: download-on-demand flow

---

Goal: download only languages that users choose to minimize network usage and storage.

Storage & runtime:

- Language files are plain JSON under `public/locales/<lang>.json` in production (or served by host).
- Client caches locale files in the Cache API under namespace `locales-v1`.
- `LanguageInstaller` UI checks cache presence using `isLocaleCached(lang)`.

Download process (sequence):

1. User taps "Download Hindi" in `LanguageInstaller`.
2. `fetchAndCacheLocale('hi')` fetches `/locales/hi.json`.
   - If response supports streaming (ReadableStream + content-length), the function reads chunks, reports progress, and accumulates bytes.
   - After download completes, the file is stored in Cache API via `cache.put('/locales/hi.json', response)`.
3. Call `loadLanguage('hi')` which `addResourceBundle` to `i18next` and switches `i18next`'s `lng`.
4. The UI updates; subsequent loads read from Cache API (zero network).

Removal:

- `LanguageInstaller` deletes the cached entry from Cache API (freeing storage).

Notes:

- Consider adding `lang_manifest.json` per language with size/version/hash for resumable downloads and integrity checks.
- Use a Service Worker to serve cached locales while offline and to schedule background downloads.

4. Image upload & AI Photo Studio

---

Client-side flow:

1. User selects/takes a photo in AI Studio.
2. Client applies pre-processing: orientation correction, optional client-side crop, and adaptive compression depending on network (2G -> heavier compression).
3. Upload: PUT/POST to Azure Blob Storage directly (SAS token or storage key must be provided via `VITE_AZURE_STORAGE_*` or proxied by a serverless function). Example:
   - `POST /api/upload` (serverless) returns a signed URL.
   - Client `PUT` file to signed URL with progress events to show UI.
4. Once uploaded, client calls enhancement endpoint `AzureAIService.enhanceImage(url)`.
   - Implementation can be direct client call to Azure Computer Vision or a serverless proxy that calls Azure and returns processed results.
5. The enhanced image (result URL) is stored in Blob Storage and the returned URL is cached locally.

Server-side / cost control:

- Heavy processing should be performed server-side whenever possible to keep client lightweight and protect keys.
- Cache enhancement results for 24 hours keyed by image hash to avoid repeated compute on identical uploads.

5. Azure AI (OpenAI, Vision, Translator, Speech) flows

---

AzureAIService responsibilities:

- Central place to build requests for Azure endpoints (OpenAI, Vision, Translator, Speech) using `import.meta.env` variables.
- Provides functions: `analyzeImage()`, `enhanceImage()`, `generateMarketing()`, `smartPricing()`, `translateText()` and `synthesizeSpeech()` (if client-side allowed).

OpenAI (smart pricing & marketing):

- Input: product metadata + image features + optional user prompts.
- Request: `Azure OpenAI` completion/chat request (GPT-4) with a carefully designed system prompt and safety checks.
- Output: structured JSON (price suggestions, marketing texts for platform A/B/C).
- Cache: store outputs 7–30 days depending on the volatility of the content.

Translator (bidirectional):

- Used for dynamic conversational translations (buyer/artisan chat) and for pre-translating UI content if human translations are not available.
- Translate calls can be made from the client or proxied server-side.

Speech (TTS / STT):

- STT: client captures audio and uses Azure Speech recognition (or browser Web Speech API as fallback) to convert voice to text.
- TTS: preferred server-side synthesis via `/api/tts` to keep keys secret; client receives audio blob and caches it.

6. TTS design (recommended architecture)

---

- Serverless proxy `/api/tts` (Vercel function):
  - Request: client posts `{ lang, voice, text }` to `/api/tts`.
  - Server: calls Azure Speech REST/SDK to synthesize audio and returns an audio/mp3 or audio/wav stream to client.
  - Benefits: Azure keys stay on server; responses can be cached and rate-limited.

- Client caching: store synthesized audio blobs in IndexedDB (use `localforage`) keyed by `sha256(lang|voice|text)`.

7. Bargain Bot (autonomous negotiation)

---

Architecture:

- Orchestrator module (client-side background worker or serverless) runs negotiation steps.
- Each negotiation turn:
  1. Receive newest buyer/artisan message.
  2. Pass conversation context + constraints + pricing model to OpenAI with guarded prompts.
  3. OpenAI returns a proposed counter-offer or negotiation action.
  4. Action executed or suggested; state is persisted.

Persistence and reliability:

- Short term: store negotiation state in client (IndexedDB) for offline continuity.
- Long term: optional server-side persistence to resume across devices.

8. Data models (simplified)

---

- `User`:
  - `id`, `name`, `email`, `type` (`artisan|buyer`), `avatarUrl`, `createdAt`
- `Product`:
  - `id`, `ownerId`, `title`, `description`, `images[]`, `price`, `metadata` (craft, state), `createdAt`
- `Order`:
  - `id`, `productId`, `buyerId`, `status`, `price`, `shipping`, `createdAt`
- `Negotiation`:
  - `id`, `productId`, `participants[]`, `turns[]` (messages/actions), `status`, `lastUpdated`
- `VaultSecret`:
  - `id`, `ownerId`, `title`, `encryptedBlob`, `createdAt`

9. Caching & offline strategy

---

- Locales: Cache API `locales-v1` for JSON locale files.
- Images: Cache meta + thumbnails in Cache API; large full-resolution images in IndexedDB or rely on Blob Storage URLs.
- Generated AI outputs: pricing (24h), marketing (7d), translation caches (30d) — stored in IndexedDB or in-memory caches depending on size.
- Service Worker: recommended to serve cached locales and static assets and to allow background downloads.

10. Security & secrets

---

- Never put secrets in client code. Use `VITE_` env variables for endpoint URLs but proxy calls that require keys through serverless functions.
- Recommended serverless endpoints:
  - `/api/tts` — proxy to Azure Speech
  - `/api/upload` — issue SAS tokens for direct Blob uploads
  - `/api/openai` — optional proxy for OpenAI requests to hide keys and enforce rate limits
- Data protection: encrypt `VaultSecret.encryptedBlob` client-side before upload; keep keys in user device or guarded server KMS.

11. Deployment & dev notes

---

- Local dev: `npm install && npm run dev`.
- Build: `npm run build` → `dist`.
- Deploy: Vercel; configure `VITE_` env variables in project settings.
- CI: simple checks (build/test) — heavy processing and keys should remain off CI logs and use secrets.

## Appendix — typical request sequences

A) Language download & switch

- UI -> `LanguageInstaller.download('hi')` -> `fetchAndCacheLocale('hi')` -> `cache.put('/locales/hi.json')` -> `loadLanguage('hi')` -> `i18n.changeLanguage('hi')`

B) Upload + enhance image

- UI -> client compress -> `POST /api/upload` -> signed URL -> `PUT` image -> `AzureAIService.enhanceImage(signedUrl)` -> enhancement result stored -> show in UI

C) Generate marketing copy

- UI -> `AzureAIService.generateMarketing(product)` -> proxy/openai call -> returns {title, instagram, amazon, etsy} -> cache -> show and allow copy

D) Synthesize voice for phrase

- UI -> check IndexedDB cache for `sha(text|lang)` -> if miss -> POST `/api/tts` -> store blob in IndexedDB -> play via Audio API

If you want, I can:

- generate sequence diagrams (Mermaid) for the flows above,
- implement the `/api/tts` serverless function and client caching scaffolding, or
- add unit tests for `localeLoader` and `AuthProvider`.
