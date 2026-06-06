# Castory Profile — Technical Spec

> Phase 9.1 · Last updated: 2026-06-06

---

## Overview

The profile page shows **WordPress user identity** (name, avatar, join date) plus **computed stats** from bookmarks, playlists, and playback progress. Editable fields sync to user meta via REST.

| Layer | File |
|-------|------|
| Data service | `prototypes/shared/js/profile-data.js` → `Castory.ProfileData` |
| Page UI | `prototypes/profile/script.js` |
| WP sync | `plugin/castory/public/js/castory-wp-profile.js` |
| PHP storage | `includes/class-user-profile.php` |
| REST | `includes/class-rest-api.php` → `/profile` |

---

## User meta keys

| Key | Purpose |
|-----|---------|
| `description` (WP core) | Bio |
| `_castory_location` | Location string |
| `_castory_website` | Website URL |
| `_castory_cover_url` | Cover banner image URL |

Computed on read (not stored separately):

- Saved episodes → `User_Library::get_bookmarks()`
- Playlists count → `User_Playlists::get_all()`
- Episodes started / listening hours → `User_Progress::get_map()`

---

## REST API (auth required)

| Method | Endpoint | Body / response |
|--------|----------|-----------------|
| GET | `/wp-json/castory/v1/profile` | `{ user, stats, watchHistory, recentlyCompleted, accountStatus }` |
| PUT | `/wp-json/castory/v1/profile` | `{ bio?, location?, website?, cover_url? }` → full profile payload |

Guests see prototype mock data in static previews; WordPress shows mock until login, then hydrates from REST.

---

## JavaScript API

| Method | Description |
|--------|-------------|
| `Castory.ProfileData.getStats()` | Live stats from storage (prototype) or REST payload (WP) |
| `Castory.ProfileData.getWatchHistory(limit?)` | Progress rows sorted by `updatedAt` |
| `Castory.ProfileData.getRecentlyCompleted(limit?)` | Episodes at ≥95% progress |
| `Castory.ProfileData.getAccountStatus()` | Plan / member since |
| `Castory.ProfileData.applyPayload(data)` | Merge REST response into `CASTORY_MOCK` |
| `Castory.ProfileData.saveFields({ bio, location, website, cover_url })` | PUT profile (WP logged-in) |

Events: `castory:profile-ready`, `castory:playback`, `castory:library`, `castory:playlists`.

---

## User flows

1. **View profile** — hero shows WP user; stats/widgets refresh on `castory:profile-ready`
2. **Edit profile** — Edit Profile → form → Save → PUT `/profile`
3. **Watch history** — auto from playback progress (localStorage + WP meta)
4. **Saved / playlists** — wired from Phase 9.3 library features

---

## Premium detection

User is treated as **Premium** when role `castory_premium` is assigned or user can `manage_options`. Extend with WooCommerce Memberships in a future phase.

---

## Preview

```powershell
npx --yes serve prototypes -p 5500
# Profile → bookmark episodes, play halfway → stats/history update
# WP: log in → profile shows your WP account + server stats
```
