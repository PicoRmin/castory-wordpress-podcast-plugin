# Castory — Design MockUps Manifest

> PNG design references for pixel-perfect implementation.  
> Directory: `mockups/`

## Status

| Item | Status |
|------|--------|
| Required PNG files | **15 / 15 present** ✅ |
| Restore from backup | **Done** (2026-06-06) |
| Pixel QA | **Ready** — run [docs/QA-MOCKUP-CHECKLIST.md](../docs/QA-MOCKUP-CHECKLIST.md) |

---

## Required Files

| File | Page | Breakpoint | Size (approx) |
|------|------|------------|---------------|
| `Castory-homePage-Desktop.png` | Home | Desktop | ~1.7 MB |
| `Castory-homePage-Mobile.png` | Home | Mobile | ~1.6 MB |
| `Castory-NewEpisodes-viewAll.png` | New Episodes | Desktop | ~1.5 MB |
| `Castory-TrendingAudioEpisodes-viewAll.png` | Trending Audio | Desktop | ~1.5 MB |
| `Castory-TrendingVideoEpisodes-viewAll.png` | Trending Video | Desktop | ~1.6 MB |
| `Casory-TrendingEpisodes-ViewAll-Mobile.png` | Trending (typo in original name) | Mobile | ~1.7 MB |
| `Castory-explorePage-Desctop.png` | Explore | Desktop | ~1.8 MB |
| `Castory-explorePage-Mobile.png` | Explore | Mobile | ~1.6 MB |
| `Castory-libraryPage-Desktop.png` | Library | Desktop | ~1.8 MB |
| `Castory-libraryPage-Mobile.png` | Library | Mobile | ~1.6 MB |
| `Castory-profilePage-Desktop.png` | Profile | Desktop | ~1.8 MB |
| `Castory-profilePage-Mobile.png` | Profile | Mobile | ~1.7 MB |
| `Castory-AudioEpisodeDetile-Desktop.png` | Audio Episode Detail | Desktop | ~1.5 MB |
| `Castory-VideoEpisodeDetai-Desktopl.png` | Video Episode Detail | Desktop | ~1.5 MB |
| `Castory-EpisodeDetail-Mobile.png` | Episode Detail | Mobile | ~1.6 MB |

> **Note:** Original filenames keep historical typos (`Desctop`, `Detile`, `Casory`) — do not rename without updating all doc references.

---

## Prototype ↔ MockUp map

| MockUp | Open prototype |
|--------|----------------|
| `Castory-homePage-*` | `prototypes/home/index.html` |
| `Castory-NewEpisodes-viewAll.png` | `prototypes/new-episodes/index.html` |
| `Castory-TrendingVideoEpisodes-viewAll.png` | `prototypes/trending-video/index.html` |
| `Castory-TrendingAudioEpisodes-viewAll.png` | `prototypes/trending-audio/index.html` |
| `Casory-TrendingEpisodes-ViewAll-Mobile.png` | trending video/audio @ 390px |
| `Castory-explorePage-*` | `prototypes/explore/index.html` |
| `Castory-libraryPage-*` | `prototypes/library/index.html` |
| `Castory-profilePage-*` | `prototypes/profile/index.html` |
| `Castory-AudioEpisodeDetile-Desktop.png` | `prototypes/episode-detail/audio/index.html?id=14` |
| `Castory-VideoEpisodeDetai-Desktopl.png` | `prototypes/episode-detail/video/index.html?id=2` |
| `Castory-EpisodeDetail-Mobile.png` | `prototypes/episode-detail/mobile/index.html?id=14` |

---

## Restore Instructions (if files go missing again)

1. Export from design tool (Figma, etc.) or recover from backup / git history
2. Copy PNG files into this folder using the **exact names** in the table above
3. Verify count: `Get-ChildItem mockups\*.png | Measure-Object` → expect **15**
4. Re-run QA: [docs/QA-MOCKUP-CHECKLIST.md](../docs/QA-MOCKUP-CHECKLIST.md)

**History:** During Phase 0 restructure, mockup PNGs were briefly lost due to a Windows case-insensitive path conflict (`MockUps` vs `mockups`). Files were restored to `mockups/` before Phase 8.
