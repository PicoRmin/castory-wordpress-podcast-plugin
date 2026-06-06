# Castory — WordPress Podcast Plugin

Premium dark-mode podcast & video streaming platform for WordPress.

**Status:** Phase 8 in progress — WordPress plugin scaffold + prototypes complete through Phase 7  
**Brand:** Castory  
**Stack:** HTML/CSS/JS prototypes → PHP WordPress plugin

---

## Quick Start (Prototypes)

1. Clone this repository
2. Open with [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (VS Code/Cursor) or any static file server
3. Start from the prototype hub:

```
prototypes/index.html
```

| Page | Path |
|------|------|
| Home | `prototypes/home/index.html` |
| Explore | `prototypes/explore/index.html` |
| Trending Video | `prototypes/trending-video/index.html` |
| Trending Audio | `prototypes/trending-audio/index.html` |
| New Episodes | `prototypes/new-episodes/index.html` |
| Library | `prototypes/library/index.html` |
| Profile | `prototypes/profile/index.html` |
| Episode Detail (audio) | `prototypes/episode-detail/audio/index.html?id=14` |
| Episode Detail (video) | `prototypes/episode-detail/video/index.html?id=2` |

> **Note:** Opening HTML via `file://` may block CDN fonts/images. Use Live Server.

---

## Quick Start (WordPress Plugin)

1. Copy or symlink `plugin/castory/` into `wp-content/plugins/castory/`
2. Activate **Castory Podcast** in WP Admin → Plugins
3. On activation, default pages with shortcodes are created (see [docs/IA.md](docs/IA.md))
4. Visit `/castory-home/` (or the slug created on your site)

**Requirements:** WordPress 6.0+, PHP 8.0+

---

## Project Structure

```
castory-wordpress-podcast-plugin/
├── docs/
│   ├── phases/           # PHASE-0 … PHASE-8 completion reports
│   ├── DECISIONS.md
│   ├── IA.md
│   ├── DESIGN-SYSTEM.md
│   ├── review.md
│   └── roadmap.md
├── mockups/              # Design PNG references (see MANIFEST.md)
├── prompts/              # AI design prompts (*.txt)
├── prototypes/
│   ├── shared/           # Design system — source of truth for plugin assets
│   ├── home/ … episode-detail/
│   └── _archive/
└── plugin/
    └── castory/          # WordPress plugin (Phase 8)
        ├── castory.php
        ├── includes/
        ├── admin/
        ├── public/css|js/  # synced from prototypes/shared/
        └── templates/
```

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/phases/](docs/phases/) | Phase completion reports (PHASE-0 … PHASE-8) |
| [docs/roadmap.md](docs/roadmap.md) | Full development roadmap |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Brand, MVP scope, ADRs |
| [docs/IA.md](docs/IA.md) | Navigation, routing, WP slugs |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Shared CSS/JS components |
| [docs/review.md](docs/review.md) | Prompt vs implementation audit (updated Phase 8) |

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#050816` |
| Primary | `#7C3AED` |
| Success | `#22C55E` |
| Font | Inter |

Bundle: `prototypes/shared/css/castory.css`  
Preview: `prototypes/shared/preview.html`  
Plugin copy: `plugin/castory/public/css/castory.css`

---

## Phase Status

| Phase | Status |
|-------|--------|
| 0–7 | ✅ Prototypes + SPA-lite shell |
| 8 | 🔄 Plugin scaffold, CPT, assets, shortcodes |
| 9+ | 🔲 User features, real player, premium |

See [docs/phases/PHASE-8.md](docs/phases/PHASE-8.md) for current plugin work.

---

## License

Proprietary — all rights reserved. See [LICENSE](LICENSE).
