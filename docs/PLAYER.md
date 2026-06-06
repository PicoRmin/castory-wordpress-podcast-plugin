# Castory Media Player — Technical Spec

> Phase 9.2–9.3 · Last updated: 2026-06-06

---

## Overview

Castory uses a **single shared HTML5 engine** (`Castory.Player`) for audio and video. UI controls are bound per page (episode detail, global mini-player). Playback progress is stored in **localStorage** for all users and synced to **WordPress user meta** when logged in.

| Component | File |
|-----------|------|
| Engine | `prototypes/shared/js/components/player.js` |
| Global mini-player | `prototypes/shared/js/components/global-player.js` |
| Quick play from grids | `prototypes/shared/js/components/quick-play.js` |
| Episode detail binding | `prototypes/shared/js/episode-detail.js` |
| Progress storage | `prototypes/shared/js/storage.js` |
| WP REST sync | `plugin/castory/public/js/castory-wp-progress.js` |
| Styles | `prototypes/shared/css/components/player.css` |

Plugin copies: run `.\scripts\sync-assets.ps1` after editing prototypes.

---

## Architecture

```
Episode card / detail UI
        │
        ▼
Castory.QuickPlay ──► Castory.Player.load(episode)
        │                      │
        │                      ├──► <audio> or <video> (one instance)
        │                      │
        ▼                      ▼
Castory.GlobalPlayer     Castory.Storage (localStorage)
        │                      │
        └──── castory:player ──┴──► castory-wp-progress.js (logged-in)
                                          │
                                          ▼
                                   POST /castory/v1/progress
```

---

## Castory.Player API

| Method | Description |
|--------|-------------|
| `load(episode, options)` | Set source, optional video container, resume from storage |
| `play()` | Returns Promise (user gesture may be required) |
| `pause()` | Pause playback |
| `toggle()` | Play/pause |
| `seek(seconds)` | Seek to position |
| `setSpeed(rate)` | Playback rate (0.5–2) |
| `attachUI(bindings)` | Wire play, progress, time labels to DOM |
| `getState()` | `{ episodeId, currentTime, duration, playing, mediaType }` |

**Events:** `castory:player` on `window` with `{ type, state }`.

**Fallback media** when `episode.mediaUrl` is empty:

- Audio: SoundHelix sample MP3
- Video: Big Buck Bunny sample MP4

---

## Progress & Resume

### localStorage keys

| Key | Purpose |
|-----|---------|
| `castory:playback` | Map `{ [episodeId]: { currentTime, duration, updatedAt } }` |
| `castory:nowPlaying` | Last active episode + position |

### WordPress (logged-in users)

| Endpoint | Method | Auth |
|----------|--------|------|
| `/wp-json/castory/v1/progress` | GET | Required — returns `{ items: { [id]: { currentTime, duration, updatedAt } } }` |
| `/wp-json/castory/v1/progress` | POST | Required — body: `{ episode_id, current_time, duration }` |

Storage: user meta `_castory_playback_progress` via `Castory\User_Progress`.

On page load, `castory-wp-progress.js` merges server progress (newer wins). On `castory:player` time updates, POST is debounced (800ms).

---

## Quick Play (Phase 9.3)

`Castory.QuickPlay.init()` — delegated click on `.castory-quick-play`.

Episode cards must expose `data-episode-id` on the link (or `?id=` in href). Grids wired on: Home, Explore, Trending Video/Audio, New Episodes.

```html
<a href="..." class="episode-card-link" data-episode-id="14">
  <article class="episode-card">
    <div class="thumb">
      <img src="..." alt="">
      <button type="button" class="castory-quick-play" aria-label="Play episode">…</button>
    </div>
  </article>
</a>
```

---

## Bookmarks & Watch Later (Phase 9.3)

| Component | File |
|-----------|------|
| UI actions | `components/library-actions.js` — `.castory-bookmark-btn`, `.castory-watch-later-btn`, `.save-later` |
| Data resolver | `library-data.js` — episodes from storage lists, continue items from playback |
| WP sync | `castory-wp-library.js` |

### localStorage keys

| Key | Purpose |
|-----|---------|
| `castory:bookmarks` | Array of episode IDs (Profile → Saved Episodes) |
| `castory:watchLater` | Array of episode IDs (Library → Saved For Later) |

### WordPress REST (logged-in)

| Endpoint | Method |
|----------|--------|
| `/castory/v1/library` | GET / PUT |
| `/castory/v1/library/bookmark` | POST (toggle) |
| `/castory/v1/library/watch-later` | POST (toggle) |

User meta: `_castory_bookmarks`, `_castory_watch_later` via `Castory\User_Library`.

---

## Load Order (prototypes)

```
utils.js → storage.js → library-data.js → mock-data.js → player.js → quick-play.js → library-actions.js → global-player.js → castory.js
```

WordPress adds: `castory-wp-bridge.js`, `castory-wp-data.js`, `castory-wp-progress.js` before page scripts.

---

## Testing

```powershell
npx --yes serve prototypes -p 5500
```

| Scenario | URL |
|----------|-----|
| Audio detail | `/episode-detail/audio/index.html?id=14` |
| Video detail | `/episode-detail/video/index.html?id=2` |
| Quick play grid | `/home/index.html` — click play overlay on card |
| WP sync | Activate plugin, log in, play episode, reload — position should resume |

---

## Out of Scope (v1)

- YouTube/Vimeo embeds
- HLS/DASH adaptive streaming
- Offline downloads
- Cross-device sync beyond WP user account

See [DECISIONS.md](./DECISIONS.md) ADR-008.
