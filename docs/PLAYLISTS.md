# Castory Playlists — Technical Spec

> Phase 9.3 · Last updated: 2026-06-06

---

## Overview

User-created playlists store ordered episode ID lists in **localStorage** (guests) and **WordPress user meta** (logged-in). Library UI supports full CRUD; Profile shows the latest four playlists.

| Layer | File |
|-------|------|
| Data service | `prototypes/shared/js/playlists.js` → `Castory.Playlists` |
| Library UI | `prototypes/shared/js/components/playlists-ui.js` → `Castory.PlaylistsUI` |
| WP sync | `plugin/castory/public/js/castory-wp-playlists.js` |
| PHP storage | `includes/class-user-playlists.php` |
| REST | `includes/class-rest-api.php` → `/playlists` routes |

---

## Data shape

```json
{
  "id": "pl_1717654321_x7k2m9",
  "name": "Morning Focus",
  "episodeIds": [14, 13, 21],
  "createdAt": 1717654321,
  "updatedAt": 1717654321
}
```

- Timestamps are **Unix seconds** (aligned with WP user meta).
- Max **50 playlists** / user, **200 episodes** / playlist, **80 chars** name.
- Default seed (first visit): `CASTORY_MOCK.library.defaultPlaylists`.

---

## REST API (auth required)

| Method | Endpoint | Body / response |
|--------|----------|-----------------|
| GET | `/wp-json/castory/v1/playlists` | `{ items: [...] }` |
| PUT | `/wp-json/castory/v1/playlists` | `{ items: [...] }` bulk sync |
| POST | `/wp-json/castory/v1/playlists` | `{ name, episode_ids? }` → playlist |
| GET | `/wp-json/castory/v1/playlists/{id}` | single playlist |
| PUT | `/wp-json/castory/v1/playlists/{id}` | `{ name?, episode_ids? }` |
| DELETE | `/wp-json/castory/v1/playlists/{id}` | `{ deleted: true }` |
| POST | `/wp-json/castory/v1/playlists/{id}/episodes` | `{ episode_id }` toggle |

User meta key: `_castory_playlists`.

---

## JavaScript API

| Method | Description |
|--------|-------------|
| `Castory.Playlists.getAll()` | Raw playlist array |
| `Castory.Playlists.getEnrichedAll()` | + covers, counts, relative `updated` |
| `Castory.Playlists.create(name, episodeIds?)` | Create |
| `Castory.Playlists.update(id, { name, episodeIds })` | Update |
| `Castory.Playlists.remove(id)` | Delete |
| `Castory.Playlists.toggleEpisode(id, episodeId)` | Add/remove episode |
| `Castory.PlaylistsUI.init()` | Library grid + modals |

Events: `castory:playlists`, `castory:playlists-ready`.

---

## User flows

1. **Create** — Library → + New Playlist → name → Save
2. **Edit** — ⋯ menu → Edit → rename + checkbox episodes (from bookmarks/watch later)
3. **Open** — click card → detail modal → Play / Open / Remove
4. **Delete** — ⋯ menu → Delete → confirm
5. **Share** — copies summary text to clipboard

---

## Testing

```powershell
npx --yes serve prototypes -p 5500
# Library → create/edit/delete playlist
# Profile → verify top 4 playlists mirror Library
# WP → log in, create playlist, reload, data persists
```
