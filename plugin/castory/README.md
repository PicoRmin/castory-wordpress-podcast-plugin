# Castory WordPress Plugin

**Status:** Phase 8 ✅ · Phase 9 🔄 (player, library, playlists, profile → WP user meta)

Install by copying this folder to `wp-content/plugins/castory/` and activating in WP Admin.

## Structure

```
castory.php              # Bootstrap
uninstall.php            # Option cleanup
includes/                # Core, CPT, REST, User_Progress, User_Library, User_Playlists, User_Profile
admin/                   # Settings + episode meta box
public/css|js/           # Synced from prototypes/shared (run scripts/sync-assets.ps1)
templates/               # Shortcode views + single-episode.php
languages/               # i18n
```

## Shortcodes

| Shortcode | Page slug (on activation) |
|-----------|---------------------------|
| `[castory_home]` | `castory-home` |
| `[castory_explore]` | `castory-explore` |
| `[castory_library]` | `castory-library` |
| `[castory_profile]` | `castory-profile` |
| `[castory_trending type="video"]` | `castory-trending-video` |
| `[castory_trending type="audio"]` | `castory-trending-audio` |
| `[castory_new_episodes]` | `castory-new-episodes` |
| `[castory_episode id="123"]` | `castory-episode` |

Episode permalinks: `/episode/{slug}/` (CPT `castory_episode`).

## REST API

| Endpoint | Description |
|----------|-------------|
| `GET /wp-json/castory/v1/episodes` | List, filter, paginate |
| `GET /wp-json/castory/v1/episodes/{id}` | Single episode |
| `GET /wp-json/castory/v1/widgets` | Hero, creators, topics |
| `GET /wp-json/castory/v1/creators` | Creator list |
| `GET /wp-json/castory/v1/trending` | Trending episodes |
| `GET /wp-json/castory/v1/progress` | User playback map (auth) |
| `POST /wp-json/castory/v1/progress` | Save playback position (auth) |
| `GET /wp-json/castory/v1/library` | Bookmarks + watch later (auth) |
| `PUT /wp-json/castory/v1/library` | Replace lists (auth) |
| `POST /wp-json/castory/v1/library/bookmark` | Toggle bookmark (auth) |
| `POST /wp-json/castory/v1/library/watch-later` | Toggle watch later (auth) |
| `GET /wp-json/castory/v1/playlists` | User playlists (auth) |
| `PUT /wp-json/castory/v1/playlists` | Bulk sync playlists (auth) |
| `POST /wp-json/castory/v1/playlists` | Create playlist (auth) |
| `PUT /wp-json/castory/v1/playlists/{id}` | Update playlist (auth) |
| `DELETE /wp-json/castory/v1/playlists/{id}` | Delete playlist (auth) |
| `GET /wp-json/castory/v1/profile` | User profile + computed stats (auth) |
| `PUT /wp-json/castory/v1/profile` | Update bio, location, website, cover (auth) |

## Admin

**Castory → Settings** — brand name, episodes per page  
**Episodes** CPT — media type, duration, views, media URL meta box  
**Import sample data** — demo episodes on activation or via admin

## Asset Sync

After editing `prototypes/shared/` or page scripts:

```powershell
.\scripts\sync-assets.ps1
```

WP-only scripts (not overwritten): `castory-wp-bridge.js`, `castory-wp-data.js`, `castory-wp-progress.js`, `castory-wp-library.js`, `castory-wp-playlists.js`, `castory-wp-profile.js`.

## Docs

- [PHASE-8.md](../../docs/phases/PHASE-8.md)
- [PHASE-9.md](../../docs/phases/PHASE-9.md)
- [PLAYLISTS.md](../../docs/PLAYLISTS.md)
- [PROFILE.md](../../docs/PROFILE.md)
- [PLAYER.md](../../docs/PLAYER.md)
- [roadmap.md](../../docs/roadmap.md)
