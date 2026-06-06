# Castory Design System

> Phase 1 — Shared CSS/JS for all prototypes and future WordPress plugin  
> Bundle entry: `prototypes/shared/css/castory.css`

---

## Quick Start

### CSS

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../shared/css/castory.css">
<link rel="stylesheet" href="page-overrides.css"> <!-- optional page-specific -->
```

### JavaScript (load order matters)

```html
<script src="../shared/js/utils.js"></script>
<script src="../shared/js/storage.js"></script>
<script src="../shared/js/mock-data.js"></script>
<script src="../shared/js/components/sidebar.js"></script>
<script src="../shared/js/components/pagination.js"></script>
<script src="../shared/js/components/filters.js"></script>
<script src="../shared/js/components/nav.js"></script>
<script src="../shared/js/components/global-player.js"></script>
<script src="../shared/js/components/notifications.js"></script>
<script src="../shared/js/components/search.js"></script>
<script src="../shared/js/castory.js"></script>
<script src="page.js"></script>
```

Add `data-castory-app` on `<body>` for automatic `Castory.init()` on DOMContentLoaded.

### Preview

Open `prototypes/shared/preview.html` in Live Server to see all components.

---

## File Structure

```
prototypes/shared/
├── css/
│   ├── castory.css          ← import bundle
│   ├── tokens.css
│   ├── reset.css
│   ├── utilities.css
│   ├── layout.css
│   └── components/
│       ├── buttons.css
│       ├── cards.css
│       ├── forms.css
│       ├── navigation.css
│       ├── badges.css
│       ├── player.css
│       ├── pagination.css
│       ├── tables.css
│       ├── charts.css
│       └── global-shell.css
└── js/
    ├── utils.js
    ├── storage.js
    ├── mock-data.js
    ├── castory.js
    └── components/
        ├── sidebar.js
        ├── pagination.js
        ├── filters.js
        ├── nav.js
        ├── global-player.js
        ├── notifications.js
        └── search.js
```

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#050816` | Page background |
| `--color-primary` | `#7C3AED` | CTAs, active states |
| `--color-success` | `#22C55E` | Audio badges, following |
| `--sidebar-width` | `260px` | Left nav |
| `--right-panel-width` | `320px` | Analytics sidebar |
| `--text-page-title` | `48px` | Hero headings |
| `--space-*` | 4–64px | 8px spacing scale |

Legacy aliases (`--bg`, `--primary`, `--purple`) map to new tokens for Phase 2 migration.

---

## Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Mobile | ≤768px | Single column, bottom nav, sidebar drawer |
| Tablet | 769–1024px | Collapsed sidebar, 2-col grid |
| Desktop | 1200–1439px | 3-col grid |
| Desktop XL | ≥1440px | 4-col grid, max-width 1600px |

---

## Layout Classes

| Class | Purpose |
|-------|---------|
| `.app-layout` | Flex shell (sidebar + main) |
| `.app-three-col` | Grid: sidebar + main + right panel |
| `.sidebar` | Sticky left navigation |
| `.main-content` | Primary content area |
| `.right-panel` | Right widgets |
| `.sidebar--drawer` | Mobile off-canvas |
| `.episode-grid` | 4→3→2→1 responsive grid |

---

## Component Classes

### Buttons
`.btn-primary`, `.btn-secondary`, `.pill`, `.icon-btn`, `.play-btn`, `.follow-btn`

### Cards
`.glass-card`, `.episode-card`, `.feed-card`, `.audio-card`, `.widget`

### Forms
`.search-box`, `.filter-pills`, `select`, radio labels

### Navigation
`.nav-item`, `.breadcrumb`, `.bottom-nav`

### Badges
`.badge-video`, `.badge-audio`, `.duration`, `.verified`, `.featured-badge`

---

## JavaScript API

### `Castory.formatRelativeDate(timestamp)`
Converts Unix ms → `"6 hrs ago"`. Use `publishedAt` field for sorting.

### `Castory.filterEpisodes(episodes, { category, mediaType, search })`

### `Castory.sortEpisodes(episodes, 'Most Popular' | 'Newest' | 'Oldest')`

### `Castory.Pagination.render(el, { currentPage, totalPages, onChange })`

### `Castory.Filters.initPills('.pill', { onChange })`

### `Castory.Sidebar.init({ menuBtn, sidebar })`

### `Castory.init({ sidebar, nav, globalPlayer, search, notifications, lazyImages, hydrateDates })`
Phase 7 bootstrap — auto-runs when `<body data-castory-app>`.

### `Castory.Storage`
localStorage: `setNowPlaying`, `toggleBookmark`, `toggleWatchLater`, `setTheme`.

### `Castory.Nav.syncActive()` / `Castory.Search.redirect(q)`

### `CASTORY_MOCK`
Global mock data: 20 episodes, creators, nav, hero slides, top podcasts.

---

## Phase 2 Migration

Pages still use local CSS. Migration steps per page:

1. Add `castory.css` link
2. Replace local `:root` tokens with shared (or remove)
3. Map class names to shared equivalents
4. Replace inline mock arrays with `CASTORY_MOCK`
5. Use `Castory.Pagination` / `Castory.Filters` instead of page-specific JS

---

## WordPress (Phase 8)

Enqueue from plugin (`plugin/castory/public/`):

```php
wp_enqueue_style('castory-design-system', CASTORY_PLUGIN_URL . 'public/css/castory.css');
wp_enqueue_script('castory-utils', CASTORY_PLUGIN_URL . 'public/js/utils.js', [], CASTORY_VERSION, true);
```

After editing prototypes, sync assets:

```powershell
.\scripts\sync-assets.ps1
```

Mock data replaced by REST API + `castoryConfig` (Phase 8.5).
