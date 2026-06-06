# Phase 9 — Backend Logic & User Features

| Field | Value |
|-------|--------|
| **Status** | 🔄 In Progress — 9.1–9.3 ✅ · MockUp QA next |
| **Date** | 2026-06-06 |
| **Goal** | Player, library features, playlists CRUD, profile → WP |
| **Prerequisite** | [Phase 8](./PHASE-8.md) |
| **Next** | MockUp QA · Discovery search |

---

## خلاصه

**9.2 Player** — `Castory.Player` با HTML5 `<audio>`/`<video>`، resume از localStorage، global mini-player.

**9.3 Progress + QuickPlay** — REST `/progress`، `User_Progress`، `Castory.QuickPlay` روی grid cards.

**9.3 Library** — Bookmarks + Watch Later + **Playlists CRUD** (REST, modals, Profile sync).

**9.1 Profile** — WP user identity + editable meta + computed stats/history from progress/library.

**Spec:** [PLAYLISTS.md](../PLAYLISTS.md) · [PLAYER.md](../PLAYER.md) · [PROFILE.md](../PROFILE.md)

### Prototypes

| File | Purpose |
|------|---------|
| `shared/js/components/player.js` | HTML5 engine |
| `shared/js/components/quick-play.js` | Play from grid |
| `shared/js/components/library-actions.js` | Bookmark / watch-later clicks |
| `shared/js/library-data.js` | Resolve episodes from storage lists |
| `shared/js/storage.js` | bookmarks, watchLater, playback + sync hooks |
| `library/script.js`, `profile/script.js` | Saved / continue sections from storage |
| `home/script.js` | Hero Save Later → watch later |
| Episode detail scripts | `LibraryActions.bindEpisode()` |

### WordPress Plugin

| File | Purpose |
|------|---------|
| `includes/class-user-progress.php` | Playback positions user meta |
| `includes/class-user-library.php` | Bookmarks + watch later user meta |
| `includes/class-user-playlists.php` | Playlists user meta |
| `includes/class-user-profile.php` | Profile fields + computed payload |
| `includes/class-rest-api.php` | `/progress`, `/library`, `/playlists`, `/profile` |
| `public/js/castory-wp-progress.js` | Progress hydrate + POST |
| `public/js/castory-wp-library.js` | Library hydrate + toggle sync |
| `public/js/castory-wp-playlists.js` | Playlists hydrate + PUT sync |
| `public/js/castory-wp-profile.js` | Profile hydrate + edit PUT |
| `shared/js/playlists.js` | Playlists CRUD + localStorage |
| `shared/js/profile-data.js` | Profile stats + history from storage |
| `shared/js/components/playlists-ui.js` | Library modals + grid |
| `profile/script.js` | Hero, stats, edit profile modal |
| `public/class-public.php` | Enqueue player, library, playlists bridges |

---

## REST

### Progress (auth)

```
GET  /wp-json/castory/v1/progress
POST /wp-json/castory/v1/progress   { episode_id, current_time, duration }
```

### Library (auth)

```
GET  /wp-json/castory/v1/library              → { bookmarks: [1,2], watchLater: [3] }
PUT  /wp-json/castory/v1/library              → { bookmarks: [...], watchLater: [...] }
POST /wp-json/castory/v1/library/bookmark     → { episode_id }  (toggle)
POST /wp-json/castory/v1/library/watch-later  → { episode_id }  (toggle)
```

Guests: localStorage only. Logged-in: merge on load, debounced POST on toggle.

### Playlists (auth)

```
GET    /wp-json/castory/v1/playlists
PUT    /wp-json/castory/v1/playlists              → { playlists: [...] }
POST   /wp-json/castory/v1/playlists              → { name, episodeIds? }
GET    /wp-json/castory/v1/playlists/{id}
PUT    /wp-json/castory/v1/playlists/{id}
DELETE /wp-json/castory/v1/playlists/{id}
POST   /wp-json/castory/v1/playlists/{id}/episodes → { episode_id } (toggle)
```

See [PLAYLISTS.md](../PLAYLISTS.md).

### Profile (auth)

```
GET /wp-json/castory/v1/profile
PUT /wp-json/castory/v1/profile   { bio, location, website, cover_url }
```

See [PROFILE.md](../PROFILE.md).

---

## User Flows

### Quick Play
1. Click `.castory-quick-play` on card → `Castory.Player.load` + play

### Bookmark
1. Click `.castory-bookmark-btn` (or episode detail bookmark)
2. `Castory.Storage.toggleBookmark(id)` → Library page + Profile saved list update

### Watch Later
1. Home hero **Save Later** or future watch-later buttons
2. `Castory.Storage.toggleWatchLater(id)` → Library **Saved For Later** grid

### Continue Listening/Watching
1. Playback progress in `castory:playback` map
2. Library sections render items with 2–95% progress

### Playlists
1. Library → **Create Playlist** → modal (name + episode picker)
2. Card menu → Edit / Delete / Share
3. Click card → detail modal → play episode
4. Profile → My Playlists (top 4 from storage)

### Profile (9.1)
1. Logged-in WP user → hero from account (avatar, name, join date)
2. Stats from bookmarks / playlists / playback progress
3. Edit Profile → bio, location, website, cover → REST PUT
4. Watch History + Recently Completed from progress map

---

## Preview

```powershell
npx --yes serve prototypes -p 5500
```

| Test | Steps |
|------|-------|
| Bookmark | New Episodes → ★ on row → Profile → Saved Episodes |
| Watch Later | Home hero → Save Later → Library → Saved For Later |
| Continue | Play episode halfway → Library → Continue sections |
| Playlists | Library → create/edit/delete → Profile shows top 4 |
| Profile | Edit bio → reload → persisted (WP) · stats follow bookmarks/progress |
| WP sync | Log in → bookmark → reload → still bookmarked |

---

## Known Issues

| Issue | Notes |
|-------|-------|
| Achievements / insights / heatmap | Still mock UI widgets |
| Premium membership | Role `castory_premium` stub; WooCommerce TBD |
| Downloads tracking | Not implemented |
| Add-to-playlist on episode cards | Future enhancement |

---

## Handoff

1. **MockUp QA** — [QA-MOCKUP-CHECKLIST.md](../QA-MOCKUP-CHECKLIST.md)
2. **Discovery search** — WP_Query + REST

**Specs:** [PLAYLISTS.md](../PLAYLISTS.md) · [PLAYER.md](../PLAYER.md) · [PROFILE.md](../PROFILE.md)
