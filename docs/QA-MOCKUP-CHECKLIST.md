# Castory — MockUp Pixel QA Checklist

> **Status:** PNGs restored (15/15 in `mockups/`) — QA **ready to run**  
> **Last verified:** 2026-06-06  
> **Manifest:** [mockups/MANIFEST.md](../mockups/MANIFEST.md)

---

## قبل از شروع

### 1. محیط تست

```powershell
# از ریشه repo — سرور استاتیک برای prototypes
npx --yes serve prototypes -p 5500
```

| هدف | URL |
|-----|-----|
| Hub | http://localhost:5500/index.html |
| هر صفحه | مسیرهای جدول زیر |

**WordPress (فاز ۸):** پلاگین فعال + صفحات activation. اسلاگ‌ها معمولاً `castory-*` هستند.

### 2. Viewport استاندارد

از `prototypes/shared/css/tokens.css`:

| Breakpoint | عرض DevTools | کاربرد |
|------------|--------------|--------|
| Desktop XL | **1440×900** | مرجع اصلی mockup دسکتاپ |
| Desktop | **1280×800** | تست میانی (اختیاری) |
| Tablet | **1024×768** | sidebar collapse |
| Mobile | **390×844** | mockup موبایل (iPhone 14 class) |
| Mobile alt | **375×812** | تست ثانویه |

در Chrome/Edge: DevTools → Toggle device toolbar → عرض دستی یا preset.

### 3. روش مقایسه (side-by-side)

1. PNG mockup را در viewer باز کن (`mockups/Castory-….png`)
2. همان صفحه prototype/WP را در مرورگر باز کن
3. viewport را تنظیم کن
4. هر بخش جدول **Sections** را با وضعیت علامت بزن:
   - ✅ Match — اختلاف غیرقابل‌توجه
   - 🟡 Minor — ≤۸px فاصله، رنگ نزدیک، فونت یک سایز متفاوت
   - ❌ Mismatch — layout شکسته، بخش غایب، رنگ/ساختار اشتباه
5. اسکرین‌شات اختلاف ❌/🟡 را در issue یا یادداشت QA نگه دار

### 4. داده تست

- **Prototype:** `CASTORY_MOCK` — بدون REST
- **WordPress:** بعد از sample import — hero/creators از REST؛ episodes واقعی
- **Episode detail:** از لینک کارت‌ها یا `?id=14` (audio) / `?id=2` (video)

---

## چک‌لیست صفحه‌به‌صفحه

### Legend

| ستون | معنی |
|------|------|
| Proto D/M | Prototype Desktop / Mobile |
| WP D/M | WordPress shortcode Desktop / Mobile |

---

### 1. Home

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-homePage-Desktop.png`, `Castory-homePage-Mobile.png` |
| **Prototype** | `prototypes/home/index.html` |
| **WordPress** | `/castory-home/` · `[castory_home]` |
| **Prompt** | `prompts/HomePage-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390**

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Sidebar + logo + nav active (Home) | ☐ | ☐ | ☐ | ☐ | |
| Top bar: search, notifications, profile | ☐ | ☐ | ☐ | ☐ | |
| Hero carousel: image, title, category, dots | ☐ | ☐ | ☐ | ☐ | pause on hover |
| Category chips (All / Technology / …) | ☐ | ☐ | ☐ | ☐ | |
| Trending Video grid (6 cards) | ☐ | ☐ | ☐ | ☐ | thumb + duration badge |
| Trending Audio grid | ☐ | ☐ | ☐ | ☐ | |
| New Episodes feed row | ☐ | ☐ | ☐ | ☐ | |
| Right widgets: creators, topics, stats | ☐ | ☐ | ☐ | ☐ | |
| View All links → correct pages | ☐ | ☐ | ☐ | ☐ | |
| Global mini-player (bottom) | ☐ | ☐ | ☐ | ☐ | |
| Mobile: hamburger / layout stack | ☐ | ☐ | ☐ | ☐ | |

---

### 2. New Episodes

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-NewEpisodes-viewAll.png` |
| **Prototype** | `prototypes/new-episodes/index.html` |
| **WordPress** | `/castory-new-episodes/` · `[castory_new_episodes]` |
| **Prompt** | `prompts/NewEpisodesPage-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390** (mockup فقط دسکتاپ — موبایل با layout.css)

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Sidebar + New Episodes active | ☐ | ☐ | ☐ | ☐ | |
| Page title + filter pills | ☐ | ☐ | ☐ | ☐ | All / Video / Audio / Category |
| Episode card grid (12+ items) | ☐ | ☐ | ☐ | ☐ | |
| Pagination controls | ☐ | ☐ | ☐ | ☐ | |
| Right sidebar: radio filters | ☐ | ☐ | ☐ | ☐ | type, duration, published |
| Right sidebar: creators widget | ☐ | ☐ | ☐ | ☐ | |
| Mobile drawer + bottom nav | ☐ | — | ☐ | ☐ | |

---

### 3. Trending Video

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-TrendingVideoEpisodes-viewAll.png` |
| **Prototype** | `prototypes/trending-video/index.html` |
| **WordPress** | `/castory-trending-video/` · `[castory_trending type="video"]` |
| **Prompt** | `prompts/TrendingVideoEpisodes-ViewAll-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390** (موبایل: `Casory-TrendingEpisodes-ViewAll-Mobile.png`)

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Layout بدون sidebar (full-width main) | ☐ | ☐ | ☐ | ☐ | |
| Filter bar + sort dropdown | ☐ | ☐ | ☐ | ☐ | |
| Video episode grid | ☐ | ☐ | ☐ | ☐ | |
| Pagination | ☐ | ☐ | ☐ | ☐ | |
| Search filters grid live | ☐ | ☐ | ☐ | ☐ | |
| Mobile grid columns | ☐ | ☐ | ☐ | ☐ | |

---

### 4. Trending Audio

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-TrendingAudioEpisodes-viewAll.png` |
| **Prototype** | `prototypes/trending-audio/index.html` |
| **WordPress** | `/castory-trending-audio/` · `[castory_trending type="audio"]` |
| **Prompt** | `prompts/TrendingAudioEpisodes-prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390**

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Sidebar + Trending Audio nav | ☐ | ☐ | ☐ | ☐ | |
| Table headers: #, Episode, Podcast, … | ☐ | ☐ | ☐ | ☐ | |
| Table rows + play buttons | ☐ | ☐ | ☐ | ☐ | |
| Filter pills + pagination | ☐ | ☐ | ☐ | ☐ | |
| Mobile table → card/stack | ☐ | ☐ | ☐ | ☐ | |

---

### 5. Explore

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-explorePage-Desctop.png`, `Castory-explorePage-Mobile.png` |
| **Prototype** | `prototypes/explore/index.html` |
| **WordPress** | `/castory-explore/` · `[castory_explore]` |
| **Prompt** | `prompts/ExplorePage-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390**

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Explore hero slider + creator avatars | ☐ | ☐ | ☐ | ☐ | |
| Topic cards grid (gradients) | ☐ | ☐ | ☐ | ☐ | |
| Category pill bar | ☐ | ☐ | ☐ | ☐ | |
| Popular creators horizontal scroll | ☐ | ☐ | ☐ | ☐ | |
| Discovery stats row | ☐ | ☐ | ☐ | ☐ | |
| Tag cloud | ☐ | ☐ | ☐ | ☐ | |
| Episode sections (video/audio lists) | ☐ | ☐ | ☐ | ☐ | |
| Search `?q=` pre-filter | ☐ | — | ☐ | — | `explore/index.html?q=podcast` |

---

### 6. Library

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-libraryPage-Desktop.png`, `Castory-libraryPage-Mobile.png` |
| **Prototype** | `prototypes/library/index.html` |
| **WordPress** | `/castory-library/` · `[castory_library]` |
| **Prompt** | `prompts/LibraryPage-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390**

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Sidebar + Library active | ☐ | ☐ | ☐ | ☐ | |
| Stats cards row | ☐ | ☐ | ☐ | ☐ | |
| Continue listening | ☐ | ☐ | ☐ | ☐ | |
| Playlists grid | ☐ | ☐ | ☐ | ☐ | |
| Recently completed | ☐ | ☐ | ☐ | ☐ | |
| Insights chart | ☐ | ☐ | ☐ | ☐ | |
| Category breakdown | ☐ | ☐ | ☐ | ☐ | |

---

### 7. Profile

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-profilePage-Desktop.png`, `Castory-profilePage-Mobile.png` |
| **Prototype** | `prototypes/profile/index.html` |
| **WordPress** | `/castory-profile/` · `[castory_profile]` |
| **Prompt** | `prompts/ProfilePage-Prompt.txt` |

**Viewport:** Desktop **1440** · Mobile **390**

| Section | Proto D | Proto M | WP D | WP M | Notes |
|---------|---------|---------|------|------|-------|
| Cover banner + avatar overlap | ☐ | ☐ | ☐ | ☐ | |
| Stats row (episodes, hours, streak) | ☐ | ☐ | ☐ | ☐ | |
| Achievements badges | ☐ | ☐ | ☐ | ☐ | |
| Listening heatmap | ☐ | ☐ | ☐ | ☐ | |
| Favorite creators carousel | ☐ | ☐ | ☐ | ☐ | |
| Top interests progress bars | ☐ | ☐ | ☐ | ☐ | |
| Account / premium card | ☐ | ☐ | ☐ | ☐ | |

---

### 8. Episode Detail — Audio

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-AudioEpisodeDetile-Desktop.png` |
| **Prototype** | `prototypes/episode-detail/audio/index.html?id=14` |
| **WordPress** | `/episode/{slug}/` (audio CPT) یا `/castory-episode/?id=14` |
| **Prompt** | episode prompts + `prototypes/episode-detail/README.md` |

**Viewport:** Desktop **1440**

| Section | Proto D | WP D | Notes |
|---------|---------|------|-------|
| Three-col layout: sidebar + main + right rail | ☐ | ☐ | |
| Breadcrumb | ☐ | ☐ | |
| Cover art + waveform player | ☐ | ☐ | |
| Title, description, meta tags | ☐ | ☐ | |
| Action buttons (Save, Share, …) | ☐ | ☐ | |
| Chapters list | ☐ | ☐ | |
| Comments thread | ☐ | ☐ | |
| Related episodes | ☐ | ☐ | |
| Creator card (right) | ☐ | ☐ | |

---

### 9. Episode Detail — Video

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-VideoEpisodeDetai-Desktopl.png` |
| **Prototype** | `prototypes/episode-detail/video/index.html?id=2` |
| **WordPress** | `/episode/{slug}/` (video CPT) |

**Viewport:** Desktop **1440**

| Section | Proto D | WP D | Notes |
|---------|---------|------|-------|
| Video player 16:9 + poster | ☐ | ☐ | |
| Breadcrumb + title block | ☐ | ☐ | |
| Meta tags row | ☐ | ☐ | |
| Chapters + transcript tabs | ☐ | ☐ | |
| Related grid | ☐ | ☐ | |
| Comments | ☐ | ☐ | |

---

### 10. Episode Detail — Mobile

| Field | Value |
|-------|--------|
| **MockUp** | `mockups/Castory-EpisodeDetail-Mobile.png` |
| **Prototype** | `prototypes/episode-detail/mobile/index.html?id=14` |
| **WordPress** | همان permalink — viewport **390** (responsive CSS) |

**Viewport:** Mobile **390**

| Section | Proto M | WP M | Notes |
|---------|---------|------|-------|
| Sticky mini-player bar | ☐ | ☐ | |
| Collapsed header / back nav | ☐ | ☐ | |
| Content stack (no sidebar) | ☐ | ☐ | |
| Fullscreen player toggle | ☐ | ☐ | |

---

## چک‌لیست سراسری (همه صفحات)

| Item | ☐ |
|------|---|
| فونت Inter لود شده | |
| رنگ primary `#7C3AED` / tokens درست | |
| Glass cards: blur + border | |
| لینک nav بین صفحات کار می‌کند | |
| `Castory.init` / global player بدون خطای console | |
| تصاویر placeholder لود (Unsplash/CDN) | |
| `prefers-reduced-motion`: carousel متوقف می‌شود | |
| RTL — خارج از scope فعلی | |

---

## ثبت نتیجه QA

پس از اتمام، این فایل‌ها را به‌روز کن:

1. جدول خلاصه زیر را پر کن
2. `docs/review.md` → ستون Match MockUp
3. `docs/roadmap.md` → چک‌باکس‌های ✅ QA هر فاز
4. `docs/phases/PHASE-*.md` → Known Issues مربوط به PNG

### Summary (fill after QA)

| Page | Proto Desktop | Proto Mobile | WP Desktop | WP Mobile | Overall |
|------|---------------|--------------|------------|-------------|---------|
| Home | | | | | |
| New Episodes | | | | | |
| Trending Video | | | | | |
| Trending Audio | | | | | |
| Explore | | | | | |
| Library | | | | | |
| Profile | | | | | |
| Episode Audio | | | — | — | |
| Episode Video | | | — | — | |
| Episode Mobile | | — | | | |

**Overall codes:** ✅ Pass · 🟡 Pass with notes · ❌ Fail

---

## لینک‌های مرتبط

- [MANIFEST.md](../mockups/MANIFEST.md) — فهرست PNG
- [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) — tokens و components
- [review.md](./review.md) — ماتریس پیاده‌سازی
- [roadmap.md](./roadmap.md) — چک‌باکس‌های فاز
