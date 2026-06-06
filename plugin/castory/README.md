# Castory WordPress Plugin

**Status:** Phase 8 — foundation complete (scaffold, CPT, assets, shortcodes, REST)

Install by copying this folder to `wp-content/plugins/castory/` and activating in WP Admin.

## Structure

```
castory.php              # Bootstrap
uninstall.php            # Option cleanup
includes/                # Core, CPT, REST, templates
admin/                   # Settings + episode meta box
public/css|js/           # Synced from prototypes/shared (run scripts/sync-assets.ps1)
templates/               # Shortcode views
blocks/                  # Gutenberg (Phase 8.4)
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

## REST API

- `GET /wp-json/castory/v1/episodes` — list, filter, paginate
- `GET /wp-json/castory/v1/episodes/{id}` — single episode

## Admin

**Castory → Settings** — brand name, episodes per page  
**Episodes** CPT — media type, duration, views, media URL meta box

## Asset Sync

After editing `prototypes/shared/`:

```powershell
.\scripts\sync-assets.ps1
```

## Docs

- [PHASE-8.md](../../docs/phases/PHASE-8.md)
- [roadmap.md](../../docs/roadmap.md) Phase 8
