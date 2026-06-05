# Castory — Information Architecture

> ساختار navigation، routing و breadcrumb برای همه صفحات  
> Phase 0 — مرجع واحد برای prototype و WordPress plugin

---

## Sidebar Navigation (Desktop)

| Order | Label | Route | Prototype File | WP Page Slug | Status |
|-------|-------|-------|----------------|--------------|--------|
| 1 | Home | `/` | `prototypes/home/index.html` | `castory-home` | ✅ Built |
| 2 | Explore | `/explore` | `prototypes/explore/index.html` | `castory-explore` | 🔲 v1.1 |
| 3 | Podcasts | `/podcasts` | — | `castory-podcasts` | 🔲 v2 |
| 4 | Trending | `/trending` | — (hub) | `castory-trending` | ⚠️ Subpages |
| 5 | Library | `/library` | `prototypes/library/index.html` | `castory-library` | 🔲 v1.1 |
| 6 | Watch Later | `/watch-later` | — | `castory-watch-later` | 🔲 v2 |
| 7 | Creators | `/creators` | — | `castory-creators` | 🔲 v2 |
| 8 | Profile | `/profile` | `prototypes/profile/index.html` | `castory-profile` | 🔲 v1.1 |

### Trending Subpages

| Label | Route | Prototype | Active Nav |
|-------|-------|-----------|------------|
| Video Episodes | `/trending/video` | `prototypes/trending-video/index.html` | Trending |
| Audio Episodes | `/trending/audio` | `prototypes/trending-audio/index.html` | Trending |
| New Episodes | `/new-episodes` | `prototypes/new-episodes/index.html` | Trending* |

*در MockUp، New Episodes از Home لینک می‌شود؛ در nav مستقل نیست. Home section → View All.

---

## Breadcrumb Pattern

**Format:** `Home › {Section} › {Page}`

**Separator:** `›` (U+203A) — نه `>` HTML entity

| Page | Breadcrumb |
|------|------------|
| Home | — |
| Trending Video | Home › Trending › Video Episodes |
| Trending Audio | Home › Trending › Audio Episodes |
| New Episodes | Home › New Episodes |
| Explore | Home › Explore |
| Library | Home › Library |
| Profile | Home › Profile |
| Episode Detail | Home › {Podcast Name} › {Episode Title} |

---

## Mobile Bottom Navigation

**۵ آیتم ثابت** (≤768px):

| # | Icon | Label | Route | Active On |
|---|------|-------|-------|-----------|
| 1 | Home | Home | `/` | Home |
| 2 | Fire | Trending | `/trending/video` | Trending subpages |
| 3 | Bookmark | Library | `/library` | Library |
| 4 | Bell | Notifications | `/notifications` | 🔲 v2 |
| 5 | User | Profile | `/profile` | Profile |

**Floating Action Button (Home only):** Create (+) — bottom-right above nav bar.

---

## Header Actions (Global)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Search | Full width input | Icon → expand overlay |
| Notifications | Bell + badge count | Bottom nav |
| Create | Purple button + dropdown | FAB |

---

## URL Map (Prototype Phase)

در فاز prototype، فایل‌ها static هستند. مسیر نسبی:

```
prototypes/home/index.html
prototypes/trending-video/index.html
prototypes/trending-audio/index.html
prototypes/new-episodes/index.html
prototypes/explore/index.html          (v1.1)
prototypes/library/index.html          (v1.1)
prototypes/profile/index.html          (v1.1)
prototypes/episode-detail/audio/index.html   (v1.1)
prototypes/episode-detail/video/index.html   (v1.1)
```

**Hub page:** `prototypes/index.html` — فهرست همه صفحات برای dev.

---

## WordPress Routing (Phase 8 Preview)

```
/register_post_type: castory_episode, castory_podcast
/register_taxonomy: castory_category, castory_topic

Pages created on activation:
  castory-home, castory-explore, castory-library, castory-profile
  castory-trending-video, castory-trending-audio, castory-new-episodes

Rewrite:
  /episode/{slug}/  → single episode template
  /podcast/{slug}/  → podcast archive
```

---

## Active State Rules

1. **یک nav item** در هر صفحه active است.
2. Trending subpages → nav item «Trending» active.
3. Episode detail → no sidebar active (or parent podcast).
4. Mobile bottom nav sync با sidebar active state.
