# Castory — WordPress Podcast Plugin

Premium dark-mode podcast & video streaming platform for WordPress.

**Status:** Phase 0 complete — UI prototypes + project foundation  
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

Or open individual pages:

| Page | Path |
|------|------|
| Home | `prototypes/home/index.html` |
| Trending Video | `prototypes/trending-video/index.html` |
| Trending Audio | `prototypes/trending-audio/index.html` |
| New Episodes | `prototypes/new-episodes/index.html` |

> **Note:** Opening HTML via `file://` may block CDN fonts/images. Use Live Server.

---

## Project Structure

```
castory-wordpress-podcast-plugin/
├── docs/
│   ├── DECISIONS.md      # Product & tech decisions (ADR)
│   ├── IA.md             # Navigation & routing
│   ├── review.md         # Prompt & code audit
│   └── roadmap.md        # Development phases
├── mockups/              # Design PNG references (see MANIFEST.md)
├── prompts/              # AI design prompts (*.txt)
├── prototypes/
│   ├── shared/           # Design system (Phase 1)
│   ├── home/
│   ├── trending-video/
│   ├── trending-audio/
│   ├── new-episodes/
│   ├── explore/          # v1.1
│   ├── library/          # v1.1
│   ├── profile/          # v1.1
│   ├── episode-detail/   # v1.1
│   └── _archive/         # Deprecated implementations
└── plugin/
    └── castory/          # WordPress plugin (Phase 8)
```

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/phases/](docs/phases/) | **Phase completion reports** (PHASE-0, PHASE-1, …) |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Brand, MVP scope, asset strategy |
| [docs/IA.md](docs/IA.md) | Sidebar, breadcrumbs, mobile nav |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Shared CSS/JS components |
| [docs/review.md](docs/review.md) | Audit of prompts vs implementation |
| [docs/roadmap.md](docs/roadmap.md) | Full development roadmap |

---

## Design System (Preview)

| Token | Value |
|-------|-------|
| Background | `#050816` |
| Primary | `#7C3AED` |
| Success | `#22C55E` |
| Font | Inter |

Full tokens: `prototypes/shared/css/castory.css`  
Preview: `prototypes/shared/preview.html`

---

## MVP (v1.0)

- Home
- Trending Video / Audio (View All)
- New Episodes (View All)
- WordPress plugin shell + shortcodes

See [docs/DECISIONS.md](docs/DECISIONS.md) for full scope.

---

## Requirements (Future Plugin)

- WordPress 6.0+
- PHP 8.0+

---

## License

Proprietary — all rights reserved. See [LICENSE](LICENSE) if present.
