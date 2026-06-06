# Castory — Implementation Audit (Updated)

> **Last updated:** 2026-06-06 — Phase 8 prerequisites  
> **Previous audit:** June 2026 (pre–Phase 2) — archived sections below replaced  
> **Sources:** 10 prompts, 11 prototype pages, `plugin/castory/` WordPress scaffold

---

## Executive Summary

| Topic | Status |
|-------|--------|
| Brand | **Castory** (canonical) — PodStream only in `_archive/` |
| UI Prototypes | ✅ **11 pages** + hub + design preview |
| Design System | ✅ `prototypes/shared/` — synced to plugin |
| SPA-lite shell | ✅ Phase 7 — nav, player, search, notifications, storage |
| WordPress Plugin | 🔄 Phase 8 — scaffold, CPT, REST, shortcodes (foundation) |
| MockUp PNGs | ❌ Missing from repo — see `mockups/MANIFEST.md` |

---

## Implementation Matrix (Current)

| Page | Prompt | Prototype | Plugin Shortcode | Match |
|------|--------|-----------|------------------|-------|
| Home | ✅ | ✅ | `[castory_home]` | ~85% |
| Trending Video | ✅ | ✅ | `[castory_trending type="video"]` | ~90% |
| Trending Audio | ✅ | ✅ | `[castory_trending type="audio"]` | ~90% |
| New Episodes | ✅ | ✅ | `[castory_new_episodes]` | ~85% |
| Explore | ✅ | ✅ | `[castory_explore]` | ~80% |
| Library | ✅ | ✅ | `[castory_library]` | ~80% |
| Profile | ✅ | ✅ | `[castory_profile]` | ~75% |
| Episode Detail | ✅ (3) | ✅ audio/video/mobile | `[castory_episode id=""]` | ~80% |

---

## Prompt Files (10)

| File | Target |
|------|--------|
| `HomePage-Prompt.txt` | Home |
| `NewEpisodesPage-Prompt.txt` | New Episodes |
| `TrendingAudioEpisodes-prompt.txt` | Trending Audio |
| `TrendingVideoEpisodes-ViewAll-Prompt.txt` | Trending Video |
| `ExplorePage-Prompt.txt` | Explore |
| `LibraryPage-Prompt.txt` | Library |
| `ProfilePage-Prompt.txt` | Profile |
| `AudioEpisodeDetail-Prompt.txt` | Episode audio |
| `VideoEpisodeDetail-Prompt.txt` | Episode video |
| `EpisodeDetail-Mobile-Prompt.txt` | Episode mobile |

---

## Resolved Issues (from original audit)

| # | Issue | Resolution |
|---|--------|------------|
| 1 | No WordPress code | ✅ Phase 8 scaffold in `plugin/castory/` |
| 2 | PodStream vs Castory | ✅ ADR-001 — Castory canonical |
| 3 | 3× Trending Video copies | ✅ `_archive/` + single canonical path |
| 4 | Duplicate CSS without shared DS | ✅ `castory.css` bundle |
| 5 | trending-audio `app.js` bug | ✅ Fixed Phase 2 |
| 6 | `new-episoes` typo / missing assets | ✅ `new-episodes/` + CDN placeholders |
| 7 | Explore/Library/Profile not built | ✅ Phases 3–5 |
| 8 | Episode Detail no prompt | ✅ Phase 6 prompts + pages |
| 9 | Orphan `styles.css` files | ✅ Removed Phase 8 prep |
| 10 | `home.css` naming drift | ✅ Renamed to `page.css` |

---

## Open Items

| # | Item | Phase |
|---|------|-------|
| 1 | MockUp PNG restore | QA |
| 2 | Bookmark UI → `Castory.Storage` | 9 |
| 3 | Full WP template port (library, profile, trending…) | 8.4 |
| 4 | Replace `CASTORY_MOCK` with REST in frontend JS | 8.5 |
| 5 | a11y / SEO / cross-browser QA | 7.3 / 8 |
| 6 | Gutenberg blocks | 8.4 optional |

---

## Design System Consistency

Unified tokens in `prototypes/shared/css/tokens.css`. Legacy per-page CSS removed or bypassed. Plugin copies assets via `scripts/sync-assets.ps1`.

---

## Navigation (IA)

Canonical structure in `docs/IA.md`. Sidebar varies by page (Explore has extended nav per prompt). `CASTORY_MOCK.nav` includes Home, Explore, Trending, New Episodes, Library, Profile.

---

## Next Steps

1. Complete template port to `plugin/castory/templates/`
2. Wire frontend JS to `/wp-json/castory/v1/episodes`
3. Sample episode importer from mock data
4. Phase 9 — user features, real player, premium

---

*Historical pre–Phase 2 audit content superseded by this document. See `docs/phases/` for per-phase reports.*
